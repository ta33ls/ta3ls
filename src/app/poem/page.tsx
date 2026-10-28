import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site/footer";
import { getPoemSnapshot } from "@/lib/poem/service";
import { PoemLive } from "./poem-live";
import "./poem.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ENDLESS GLITCH POEM — ta3ls.dev",
  description: "一分钟一句，永不停止的中文意识流乱码诗。由 DeepSeek 生成。",
};

export default async function PoemPage() {
  const snapshot = await getPoemSnapshot({ limit: 30 });

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="poem-shell">
        <header className="poem-header">
          <Link className="poem-brand" href="/" aria-label="Back to ta3ls.dev">
            <span className="poem-brand__mark">
              33<span>.</span>0
            </span>
            <span className="poem-brand__word">ta3ls.dev</span>
          </Link>
          <span className="poem-header__title">ENDLESS GLITCH POEM</span>
          <Link className="poem-header__back" href="/">
            HOME <span aria-hidden="true">↗</span>
          </Link>
        </header>

        <main className="poem-main" lang="zh-CN">
          <PoemLive initial={snapshot} />
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
