import { NextResponse } from "next/server";
import { tickPoem } from "@/lib/poem/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  const url = new URL(request.url);
  const after = Number(url.searchParams.get("after") ?? "0");

  try {
    const result = await tickPoem({
      afterId: Number.isFinite(after) ? Math.max(0, Math.trunc(after)) : 0,
    });

    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("[poem] tick route failed", error);
    return NextResponse.json(
      { ok: false, error: "Poem tick failed" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
