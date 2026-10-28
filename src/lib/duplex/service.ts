import "server-only";
import { and, desc, eq, lt } from "drizzle-orm";
import { db } from "@/db";
import { duplexMessages, duplexTicks } from "@/db/schema";
import { pool } from "@/lib/db";
import {
  DUPLEX_CONTEXT_LIMIT,
  DUPLEX_HISTORY_LIMIT,
  DUPLEX_INTERVAL_MS,
  DUPLEX_INTERVAL_SECONDS,
  DUPLEX_THREAD,
} from "./constants";
import type {
  DuplexMessage,
  DuplexSnapshot,
  DuplexSpeaker,
  DuplexState,
  DuplexStatus,
} from "./types";

type TimeRow = { now: Date; slot: Date };
type MessageRow = typeof duplexMessages.$inferSelect;
type TickRow = typeof duplexTicks.$inferSelect;

export type PreparedStream =
  | {
      kind: "new";
      slot: Date;
      speaker: DuplexSpeaker;
      turn: number;
      messages: DuplexMessage[];
    }
  | { kind: "existing"; message: MessageRow }
  | { kind: "pending" }
  | { kind: "failed"; error: string; state: DuplexState }
  | { kind: "paused"; state: DuplexState };

async function getDbTime(): Promise<TimeRow> {
  const { rows } = await pool.query<TimeRow>(
    "select now() as now, to_timestamp(floor(extract(epoch from now()) / $1) * $1) as slot",
    [DUPLEX_INTERVAL_SECONDS]
  );
  return rows[0];
}

function toMessage(row: MessageRow): DuplexMessage {
  return {
    id: row.id,
    turn: row.turn,
    speaker: row.speaker as DuplexSpeaker,
    content: row.content,
    slot: row.slot.toISOString(),
  };
}

function nextSpeakerFor(messages: Array<Pick<DuplexMessage, "speaker">>): DuplexSpeaker {
  const last = messages[messages.length - 1];
  if (!last) return "33";
  return last.speaker === "33" ? "00" : "33";
}

function resolveStatus({
  slotMessage,
  tick,
  hasMessages,
}: {
  slotMessage?: MessageRow;
  tick?: TickRow;
  hasMessages: boolean;
}): DuplexStatus {
  if (process.env.DUPLEX_ENABLED === "false") return "paused";
  if (slotMessage) return "live";
  if (tick?.status === "failed") return "failed";
  if (tick?.status === "pending") return "pending";
  if (!hasMessages) return "empty";
  return "waiting";
}

function makeState({
  now,
  slot,
  messages,
  status,
  error,
}: {
  now: Date;
  slot: Date;
  messages: Array<Pick<DuplexMessage, "speaker">>;
  status: DuplexStatus;
  error?: string;
}): DuplexState {
  return {
    serverNow: now.toISOString(),
    nextAt: new Date(slot.getTime() + DUPLEX_INTERVAL_MS).toISOString(),
    nextSpeaker: nextSpeakerFor(messages),
    status,
    error,
  };
}

export async function getDuplexSnapshot({
  limit = DUPLEX_HISTORY_LIMIT,
}: {
  limit?: number;
} = {}): Promise<DuplexSnapshot> {
  const safeLimit = Math.min(
    Math.max(Math.trunc(limit) || DUPLEX_HISTORY_LIMIT, 1),
    80
  );
  const { now, slot } = await getDbTime();

  const [recentRows, slotMessageRows, tickRows] = await Promise.all([
    db
      .select()
      .from(duplexMessages)
      .where(eq(duplexMessages.thread, DUPLEX_THREAD))
      .orderBy(desc(duplexMessages.id))
      .limit(safeLimit),
    db
      .select()
      .from(duplexMessages)
      .where(
        and(
          eq(duplexMessages.thread, DUPLEX_THREAD),
          eq(duplexMessages.slot, slot)
        )
      )
      .limit(1),
    db.select().from(duplexTicks).where(eq(duplexTicks.slot, slot)).limit(1),
  ]);

  const messages = recentRows.slice().reverse().map(toMessage);
  const slotMessage = slotMessageRows[0];
  const tick = tickRows[0];
  const status = resolveStatus({
    slotMessage,
    tick,
    hasMessages: messages.length > 0,
  });

  return {
    ...makeState({
      now,
      slot,
      messages,
      status,
      error: tick?.status === "failed" ? (tick.error ?? undefined) : undefined,
    }),
    messages,
    latestId: messages[messages.length - 1]?.id ?? 0,
    hasMore: messages.length === safeLimit,
  };
}

export async function getDuplexHistory({
  beforeId,
  limit = DUPLEX_HISTORY_LIMIT,
}: {
  beforeId: number;
  limit?: number;
}): Promise<DuplexMessage[]> {
  const safeLimit = Math.min(
    Math.max(Math.trunc(limit) || DUPLEX_HISTORY_LIMIT, 1),
    80
  );
  const safeBefore = Number.isFinite(beforeId) ? Math.trunc(beforeId) : 0;

  const rows = safeBefore
    ? await db
        .select()
        .from(duplexMessages)
        .where(
          and(
            eq(duplexMessages.thread, DUPLEX_THREAD),
            lt(duplexMessages.id, safeBefore)
          )
        )
        .orderBy(desc(duplexMessages.id))
        .limit(safeLimit)
    : await db
        .select()
        .from(duplexMessages)
        .where(eq(duplexMessages.thread, DUPLEX_THREAD))
        .orderBy(desc(duplexMessages.id))
        .limit(safeLimit);

  return rows.slice().reverse().map(toMessage);
}

export async function prepareDuplexStream(): Promise<PreparedStream> {
  const { now, slot } = await getDbTime();

  const [existingRows, recentRows] = await Promise.all([
    db
      .select()
      .from(duplexMessages)
      .where(
        and(
          eq(duplexMessages.thread, DUPLEX_THREAD),
          eq(duplexMessages.slot, slot)
        )
      )
      .limit(1),
    db
      .select()
      .from(duplexMessages)
      .where(eq(duplexMessages.thread, DUPLEX_THREAD))
      .orderBy(desc(duplexMessages.id))
      .limit(DUPLEX_CONTEXT_LIMIT),
  ]);

  const existing = existingRows[0];
  if (existing) {
    return { kind: "existing", message: existing };
  }

  const latestMessages = recentRows.slice().reverse().map(toMessage);

  if (process.env.DUPLEX_ENABLED === "false") {
    return {
      kind: "paused",
      state: makeState({
        now,
        slot,
        messages: latestMessages,
        status: "paused",
      }),
    };
  }

  const [tick] = await db
    .insert(duplexTicks)
    .values({ slot })
    .onConflictDoNothing()
    .returning();

  if (!tick) {
    const [tickRow] = await db
      .select()
      .from(duplexTicks)
      .where(eq(duplexTicks.slot, slot))
      .limit(1);

    if (tickRow?.status === "failed") {
      const error = tickRow.error || "Duplex generation failed";
      return {
        kind: "failed",
        error,
        state: makeState({
          now,
          slot,
          messages: latestMessages,
          status: "failed",
          error,
        }),
      };
    }

    if (tickRow?.status === "done") {
      const [doneMessage] = await db
        .select()
        .from(duplexMessages)
        .where(
          and(
            eq(duplexMessages.thread, DUPLEX_THREAD),
            eq(duplexMessages.slot, slot)
          )
        )
        .limit(1);
      if (doneMessage) {
        return { kind: "existing", message: doneMessage };
      }
    }

    return { kind: "pending" };
  }

  const last = latestMessages[latestMessages.length - 1];
  const speaker: DuplexSpeaker = last
    ? last.speaker === "33"
      ? "00"
      : "33"
    : "33";
  const turn = (last?.turn ?? 0) + 1;

  return {
    kind: "new",
    slot,
    speaker,
    turn,
    messages: latestMessages,
  };
}

export async function persistDuplexMessage({
  slot,
  turn,
  speaker,
  content,
  model,
  promptVersion,
  usage,
}: {
  slot: Date;
  turn: number;
  speaker: DuplexSpeaker;
  content: string;
  model: string;
  promptVersion: string;
  usage: unknown;
}): Promise<MessageRow> {
  const [inserted] = await db
    .insert(duplexMessages)
    .values({
      thread: DUPLEX_THREAD,
      turn,
      speaker,
      content,
      slot,
      model,
      promptVersion,
      usage,
    })
    .onConflictDoNothing()
    .returning();

  let row = inserted;

  if (!row) {
    const [existing] = await db
      .select()
      .from(duplexMessages)
      .where(
        and(
          eq(duplexMessages.thread, DUPLEX_THREAD),
          eq(duplexMessages.slot, slot)
        )
      )
      .limit(1);
    row = existing;
  }

  if (!row) {
    throw new Error("Could not persist duplex message");
  }

  await db
    .update(duplexTicks)
    .set({ status: "done", finishedAt: new Date() })
    .where(eq(duplexTicks.slot, slot));

  return row;
}

export async function failDuplexStream({
  slot,
  error,
}: {
  slot: Date;
  error: string;
}) {
  await db
    .update(duplexTicks)
    .set({ status: "failed", error: error.slice(0, 500), finishedAt: new Date() })
    .where(eq(duplexTicks.slot, slot));
}

export async function getDuplexDoneState(
  message: MessageRow
): Promise<DuplexState> {
  const { now } = await getDbTime();
  return {
    serverNow: now.toISOString(),
    nextAt: new Date(message.slot.getTime() + DUPLEX_INTERVAL_MS).toISOString(),
    nextSpeaker: message.speaker === "33" ? "00" : "33",
    status: "live",
  };
}

export function serializeDuplexMessage(row: MessageRow): DuplexMessage {
  return toMessage(row);
}

export async function getDuplexFailureState({
  slot,
  error,
}: {
  slot: Date;
  error: string;
}): Promise<DuplexState> {
  const { now } = await getDbTime();
  const [latest] = await db
    .select()
    .from(duplexMessages)
    .where(eq(duplexMessages.thread, DUPLEX_THREAD))
    .orderBy(desc(duplexMessages.id))
    .limit(1);

  return {
    serverNow: now.toISOString(),
    nextAt: new Date(slot.getTime() + DUPLEX_INTERVAL_MS).toISOString(),
    nextSpeaker: latest
      ? latest.speaker === "33"
        ? "00"
        : "33"
      : "33",
    status: "failed",
    error,
  };
}
