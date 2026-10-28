import { NextResponse } from "next/server";
import { getDuplexHistory } from "@/lib/duplex/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const before = Number(url.searchParams.get("before") ?? "0");
  const limit = Number(url.searchParams.get("limit") ?? "50");

  try {
    const messages = await getDuplexHistory({
      beforeId: Number.isFinite(before) ? Math.max(0, Math.trunc(before)) : 0,
      limit: Number.isFinite(limit) ? limit : 50,
    });

    return NextResponse.json(
      { messages },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[duplex] history route failed", error);
    return NextResponse.json(
      { ok: false, error: "Duplex history failed" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
