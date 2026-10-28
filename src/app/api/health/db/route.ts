import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const startedAt = Date.now();

  try {
    const { rows } = await pool.query<{
      ok: number;
      now: string;
      database: string;
    }>(
      "select 1 as ok, now() as now, current_database() as database"
    );

    return NextResponse.json({
      ok: true,
      service: "postgres",
      latencyMs: Date.now() - startedAt,
      result: rows[0],
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        service: "postgres",
        error:
          error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}
