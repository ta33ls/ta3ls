CREATE TABLE "poem_lines" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"slot" timestamp with time zone NOT NULL,
	"line" text NOT NULL,
	"model" text NOT NULL,
	"prompt_version" text NOT NULL,
	"latency_ms" integer,
	"usage" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "poem_lines_slot_unique" UNIQUE("slot"),
	CONSTRAINT "poem_lines_line_length" CHECK (char_length("poem_lines"."line") between 1 and 200)
);
--> statement-breakpoint
CREATE TABLE "poem_ticks" (
	"slot" timestamp with time zone PRIMARY KEY NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"error" text,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"finished_at" timestamp with time zone
);
