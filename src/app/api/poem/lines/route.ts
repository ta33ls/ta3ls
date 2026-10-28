import { NextResponse } from "next/server";
import { getPoemHistory } from "@/lib/poem/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const before = Number(url.searchParams.get("before") ?? "0");
  const limit = Number(url.searchParams.get("limit") ?? "30");

  try {
    const lines = await getPoemHistory({
      beforeId: Number.isFinite(before) ? Math.max(0, Math.trunc(before)) : 0,
      limit: Number.isFinite(limit) ? limit : 30,
    });

    return NextResponse.json(
      { lines },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[poem] history route failed", error);
    return NextResponse.json(
      { ok: false, error: "Poem history failed" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
