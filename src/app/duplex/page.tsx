import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site/footer";
import { getDuplexSnapshot } from "@/lib/duplex/service";
import { DuplexLive } from "./duplex-live";
import "./duplex.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "DUPLEX — ta3ls.dev",
  description: "两个 agent 的无尽对话：每 15 秒一句，由 DeepSeek 生成。",
};

export default async function DuplexPage() {
  const snapshot = await getDuplexSnapshot();

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="duplex-shell">
        <header className="duplex-header">
          <Link className="duplex-brand" href="/" aria-label="Back to ta3ls.dev">
            <span className="duplex-brand__mark">
              33<span>.</span>0
            </span>
            <span className="duplex-brand__word">ta3ls.dev</span>
          </Link>
          <span className="duplex-header__title">DUPLEX / 33 ↔ 00</span>
          <Link className="duplex-header__back" href="/">
            HOME <span aria-hidden="true">↗</span>
          </Link>
        </header>

        <main className="duplex-main" lang="zh-CN">
          <DuplexLive initial={snapshot} />
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
