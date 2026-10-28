CREATE TABLE "duplex_messages" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"thread" text DEFAULT 'main' NOT NULL,
	"turn" integer NOT NULL,
	"speaker" text NOT NULL,
	"content" text NOT NULL,
	"slot" timestamp with time zone NOT NULL,
	"model" text NOT NULL,
	"prompt_version" text NOT NULL,
	"usage" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "duplex_messages_speaker_check" CHECK ("duplex_messages"."speaker" in ('33','00')),
	CONSTRAINT "duplex_messages_content_length" CHECK (char_length("duplex_messages"."content") between 1 and 300)
);
--> statement-breakpoint
CREATE TABLE "duplex_ticks" (
	"slot" timestamp with time zone PRIMARY KEY NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"error" text,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"finished_at" timestamp with time zone
);
--> statement-breakpoint
CREATE UNIQUE INDEX "duplex_messages_thread_turn_idx" ON "duplex_messages" USING btree ("thread","turn");--> statement-breakpoint
CREATE UNIQUE INDEX "duplex_messages_thread_slot_idx" ON "duplex_messages" USING btree ("thread","slot");--> statement-breakpoint
CREATE INDEX "duplex_messages_thread_id_idx" ON "duplex_messages" USING btree ("thread","id");