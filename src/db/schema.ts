import { sql } from "drizzle-orm";
import {
  bigserial,
  check,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const poemLines = pgTable(
  "poem_lines",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    slot: timestamp("slot", { withTimezone: true }).notNull().unique(),
    line: text("line").notNull(),
    model: text("model").notNull(),
    promptVersion: text("prompt_version").notNull(),
    latencyMs: integer("latency_ms"),
    usage: jsonb("usage"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check(
      "poem_lines_line_length",
      sql`char_length(${table.line}) between 1 and 200`
    ),
  ]
);

export const poemTicks = pgTable("poem_ticks", {
  slot: timestamp("slot", { withTimezone: true }).primaryKey(),
  status: text("status").notNull().default("pending"),
  error: text("error"),
  startedAt: timestamp("started_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
});

export const duplexMessages = pgTable(
  "duplex_messages",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    thread: text("thread").notNull().default("main"),
    turn: integer("turn").notNull(),
    speaker: text("speaker").notNull(),
    content: text("content").notNull(),
    slot: timestamp("slot", { withTimezone: true }).notNull(),
    model: text("model").notNull(),
    promptVersion: text("prompt_version").notNull(),
    usage: jsonb("usage"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("duplex_messages_thread_turn_idx").on(
      table.thread,
      table.turn
    ),
    uniqueIndex("duplex_messages_thread_slot_idx").on(
      table.thread,
      table.slot
    ),
    index("duplex_messages_thread_id_idx").on(table.thread, table.id),
    check(
      "duplex_messages_speaker_check",
      sql`${table.speaker} in ('33','00')`
    ),
    check(
      "duplex_messages_content_length",
      sql`char_length(${table.content}) between 1 and 300`
    ),
  ]
);

export const duplexTicks = pgTable("duplex_ticks", {
  slot: timestamp("slot", { withTimezone: true }).primaryKey(),
  status: text("status").notNull().default("pending"),
  error: text("error"),
  startedAt: timestamp("started_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
});
