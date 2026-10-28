import "server-only";
import { asc, desc, eq, gt, lt } from "drizzle-orm";
import { db } from "@/db";
import { poemLines, poemTicks } from "@/db/schema";
import { pool } from "@/lib/db";
import { generatePoemLine } from "./generate";
import type {
  PoemLine,
  PoemSnapshot,
  PoemStatus,
  PoemTickResponse,
} from "./types";

const RECENT_LIMIT = 8;
const MAX_NEW_LINES = 100;
const DEFAULT_HISTORY_LIMIT = 30;

type TimeRow = { now: Date; slot: Date };
type PoemLineRow = typeof poemLines.$inferSelect;
type PoemTickRow = typeof poemTicks.$inferSelect;

async function getDbTime(): Promise<TimeRow> {
  const { rows } = await pool.query<TimeRow>(
    "select now() as now, date_trunc('minute', now()) as slot"
  );
  return rows[0];
}

function toPoemLine(row: PoemLineRow): PoemLine {
  return {
    id: row.id,
    slot: row.slot.toISOString(),
    line: row.line,
  };
}

function resolveStatus({
  slotLine,
  tick,
  hasLines,
}: {
  slotLine?: PoemLineRow;
  tick?: PoemTickRow;
  hasLines: boolean;
}): PoemStatus {
  if (process.env.POEM_ENABLED === "false") return "paused";
  if (slotLine) return "live";
  if (tick?.status === "failed") return "failed";
  if (tick?.status === "pending") return "pending";
  if (!hasLines) return "empty";
  return "waiting";
}

export async function getPoemSnapshot({
  limit = DEFAULT_HISTORY_LIMIT,
}: {
  limit?: number;
} = {}): Promise<PoemSnapshot> {
  const safeLimit = Math.min(Math.max(Math.trunc(limit) || 30, 1), 50);
  const { now, slot } = await getDbTime();

  const [lines, slotLineRows, tickRows] = await Promise.all([
    db
      .select()
      .from(poemLines)
      .orderBy(desc(poemLines.slot))
      .limit(safeLimit),
    db.select().from(poemLines).where(eq(poemLines.slot, slot)).limit(1),
    db.select().from(poemTicks).where(eq(poemTicks.slot, slot)).limit(1),
  ]);

  const slotLine = slotLineRows[0];
  const tick = tickRows[0];
  const status = resolveStatus({
    slotLine,
    tick,
    hasLines: lines.length > 0,
  });

  return {
    lines: lines.map(toPoemLine),
    status,
    serverNow: now.toISOString(),
    nextAt: new Date(slot.getTime() + 60_000).toISOString(),
    latestId: lines[0]?.id ?? 0,
    hasMore: lines.length === safeLimit,
    error: tick?.status === "failed" ? (tick.error ?? undefined) : undefined,
  };
}

async function getNewLines(afterId: number): Promise<PoemLine[]> {
  const rows = await db
    .select()
    .from(poemLines)
    .where(gt(poemLines.id, afterId))
    .orderBy(asc(poemLines.id))
    .limit(MAX_NEW_LINES);

  return rows.map(toPoemLine);
}

export async function getPoemHistory({
  beforeId,
  limit = DEFAULT_HISTORY_LIMIT,
}: {
  beforeId: number;
  limit?: number;
}): Promise<PoemLine[]> {
  const safeLimit = Math.min(Math.max(Math.trunc(limit) || 30, 1), 50);
  const safeBefore = Number.isFinite(beforeId) ? Math.trunc(beforeId) : 0;

  const rows =
    safeBefore > 0
      ? await db
          .select()
          .from(poemLines)
          .where(lt(poemLines.id, safeBefore))
          .orderBy(desc(poemLines.id))
          .limit(safeLimit)
      : await db
          .select()
          .from(poemLines)
          .orderBy(desc(poemLines.id))
          .limit(safeLimit);

  return rows.map(toPoemLine);
}

export async function tickPoem({
  afterId = 0,
}: {
  afterId?: number;
} = {}): Promise<PoemTickResponse> {
  const { slot } = await getDbTime();
  let generated = false;

  if (process.env.POEM_ENABLED !== "false") {
    const [tick] = await db
      .insert(poemTicks)
      .values({ slot })
      .onConflictDoNothing()
      .returning();

    if (tick) {
      try {
        const recent = await db
          .select()
          .from(poemLines)
          .orderBy(desc(poemLines.slot))
          .limit(RECENT_LIMIT);

        const context = recent.slice().reverse();
        const startedAt = Date.now();
        const result = await generatePoemLine({ lines: context, slot });
        const latencyMs = Date.now() - startedAt;

        const [line] = await db
          .insert(poemLines)
          .values({
            slot,
            line: result.line,
            model: result.model,
            promptVersion: result.promptVersion,
            latencyMs,
            usage: result.usage,
          })
          .onConflictDoNothing()
          .returning();

        await db
          .update(poemTicks)
          .set({ status: "done", finishedAt: new Date() })
          .where(eq(poemTicks.slot, slot));

        generated = Boolean(line);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message.slice(0, 500)
            : "Unknown poem generation error";

        await db
          .update(poemTicks)
          .set({ status: "failed", error: message, finishedAt: new Date() })
          .where(eq(poemTicks.slot, slot));

        console.error("[poem] generation failed", {
          slot: slot.toISOString(),
          error: message,
        });
      }
    }
  }

  const newLines = await getNewLines(
    Number.isFinite(afterId) ? Math.max(0, Math.trunc(afterId)) : 0
  );
  const { now, slot: currentSlot } = await getDbTime();

  const [slotLineRows, tickRows] = await Promise.all([
    db
      .select()
      .from(poemLines)
      .where(eq(poemLines.slot, currentSlot))
      .limit(1),
    db
      .select()
      .from(poemTicks)
      .where(eq(poemTicks.slot, currentSlot))
      .limit(1),
  ]);

  const slotLine = slotLineRows[0];
  const tick = tickRows[0];
  const hasLines = afterId > 0 || newLines.length > 0 || Boolean(slotLine);
  const status = resolveStatus({ slotLine, tick, hasLines });

  return {
    newLines,
    status,
    serverNow: now.toISOString(),
    nextAt: new Date(currentSlot.getTime() + 60_000).toISOString(),
    generated,
    error: tick?.status === "failed" ? (tick.error ?? undefined) : undefined,
  };
}
