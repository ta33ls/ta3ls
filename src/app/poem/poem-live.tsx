"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type {
  PoemLine,
  PoemSnapshot,
  PoemStatus,
  PoemTickResponse,
} from "@/lib/poem/types";

const POLL_INTERVAL_MS = 10_000;
const AUTO_RETRY_MS = 8_000;
const SLOT_MS = 60_000;
const LOAD_LIMIT = 30;
const GLYPHS = "01#%&@*+-/\\|[]{}<>~^";

function formatClock(slot: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(slot));
}

function formatTime(slot: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(slot));
}

function formatCountdown(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function statusLabel(status: PoemStatus) {
  switch (status) {
    case "live":
      return "LIVE · 33.0 FM";
    case "waiting":
      return "等待下一句";
    case "pending":
      return "正在同步信号";
    case "failed":
      return "信号干扰";
    case "paused":
      return "传输暂停";
    case "empty":
    default:
      return "等待第一句";
  }
}

function statusClass(status: PoemStatus, syncing: boolean) {
  if (syncing) return "is-syncing";
  if (status === "live") return "is-live";
  if (status === "failed") return "is-error";
  if (status === "pending") return "is-syncing";
  return "is-idle";
}

function ScrambleText({
  text,
  reducedMotion,
}: {
  text: string;
  reducedMotion: boolean;
}) {
  const [display, setDisplay] = useState(text);
  const previous = useRef(text);

  useEffect(() => {
    if (reducedMotion || previous.current === text) {
      previous.current = text;
      setDisplay(text);
      return;
    }

    previous.current = text;
    const characters = Array.from(text);
    const totalFrames = 18;
    let frame = 0;

    const interval = window.setInterval(() => {
      frame += 1;
      const progress = frame / totalFrames;
      setDisplay(
        characters
          .map((character, index) => {
            if (character === " " || index / characters.length < progress) {
              return character;
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (frame >= totalFrames) {
        window.clearInterval(interval);
        setDisplay(text);
      }
    }, 40);

    return () => window.clearInterval(interval);
  }, [reducedMotion, text]);

  return <span className="poem-scramble">{display}</span>;
}

export function PoemLive({ initial }: { initial: PoemSnapshot }) {
  const [lines, setLines] = useState(initial.lines);
  const [status, setStatus] = useState(initial.status);
  const [serverNow, setServerNow] = useState(initial.serverNow);
  const [nextAt, setNextAt] = useState(initial.nextAt);
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, Date.parse(initial.nextAt) - Date.parse(initial.serverNow))
  );
  const [hasMore, setHasMore] = useState(initial.hasMore);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(initial.error ?? "");

  const latestIdRef = useRef(initial.latestId);
  const offsetRef = useRef(0);
  const pollingRef = useRef(false);
  const lastPollRef = useRef(0);
  const mountedRef = useRef(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    offsetRef.current = Date.parse(serverNow) - Date.now();
  }, [serverNow]);

  const poll = useCallback(async () => {
    if (pollingRef.current) return;

    pollingRef.current = true;
    lastPollRef.current = Date.now();
    setSyncing(true);

    try {
      const response = await fetch(
        `/api/poem/tick?after=${latestIdRef.current}`,
        { method: "POST", cache: "no-store" }
      );
      if (!response.ok) throw new Error(`tick failed: ${response.status}`);

      const data = (await response.json()) as PoemTickResponse;
      if (!mountedRef.current) return;

      if (data.newLines.length > 0) {
        setLines((previous) => {
          const seen = new Set(previous.map((line) => line.id));
          const fresh = data.newLines.filter((line) => !seen.has(line.id));
          if (fresh.length === 0) return previous;
          return [...fresh.slice().reverse(), ...previous];
        });
        latestIdRef.current = Math.max(
          latestIdRef.current,
          ...data.newLines.map((line) => line.id)
        );
      }

      setStatus(data.status);
      setServerNow(data.serverNow);
      setNextAt(data.nextAt);
      setError(data.error ?? "");
    } catch (caught) {
      if (mountedRef.current) {
        setError(caught instanceof Error ? caught.message : "tick failed");
      }
    } finally {
      if (mountedRef.current) setSyncing(false);
      pollingRef.current = false;
    }
  }, []);

  useEffect(() => {
    void poll();
    const interval = window.setInterval(() => {
      void poll();
    }, POLL_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [poll]);

  useEffect(() => {
    const update = () => {
      const value = Math.max(
        0,
        Date.parse(nextAt) - (Date.now() + offsetRef.current)
      );
      setRemaining(value);

      if (
        value <= 0 &&
        !pollingRef.current &&
        Date.now() - lastPollRef.current > AUTO_RETRY_MS
      ) {
        void poll();
      }
    };

    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [nextAt, poll]);

  const loadOlder = useCallback(async () => {
    if (loadingOlder || !hasMore) return;

    const oldest = lines[lines.length - 1];
    if (!oldest) return;

    setLoadingOlder(true);
    try {
      const response = await fetch(
        `/api/poem/lines?before=${oldest.id}&limit=${LOAD_LIMIT}`,
        { cache: "no-store" }
      );
      if (!response.ok) throw new Error(`history failed: ${response.status}`);

      const data = (await response.json()) as { lines: PoemLine[] };
      if (!mountedRef.current) return;

      setLines((previous) => {
        const seen = new Set(previous.map((line) => line.id));
        const older = data.lines.filter((line) => !seen.has(line.id));
        return [...previous, ...older];
      });
      setHasMore(data.lines.length === LOAD_LIMIT);
    } catch (caught) {
      if (mountedRef.current) {
        setError(caught instanceof Error ? caught.message : "history failed");
      }
    } finally {
      if (mountedRef.current) setLoadingOlder(false);
    }
  }, [hasMore, lines, loadingOlder]);

  const latest = lines[0];
  const history = lines.slice(1);
  const placeholder =
    status === "empty" || status === "waiting"
      ? "信号正在寻找第一句话……"
      : "……";
  const currentText = latest?.line ?? placeholder;
  const progress = Math.min(1, Math.max(0, 1 - remaining / SLOT_MS));

  return (
    <>
      <section className="poem-hero" aria-labelledby="poem-current">
        <p className="poem-kicker">
          <span className="poem-kicker__dot" aria-hidden="true" />
          第 01 号传输 <span>/</span> 永不停止的乱码诗
        </p>

        <div className={`poem-live ${statusClass(status, syncing)}`}>
          <span className="poem-live__lamp" aria-hidden="true" />
          <span>{syncing ? "正在同步信号" : statusLabel(status)}</span>
        </div>

        <div className="poem-current-wrap">
          <p className="poem-current-meta">
            <span>{latest ? `第 ${latest.id} 句` : "第 — 句"}</span>
            <span>{latest ? formatClock(latest.slot) : "--:--"}</span>
          </p>
          <h1 className="poem-current" id="poem-current">
            <span className="poem-sr-only">{currentText}</span>
            <span aria-hidden="true">
              <ScrambleText text={currentText} reducedMotion={reducedMotion} />
              <span className="poem-cursor" />
            </span>
          </h1>
        </div>

        <div className="poem-next">
          <div className="poem-next__row">
            <span className="poem-next__label">NEXT LINE / 下一句</span>
            <span className="poem-next__time">
              {remaining <= 0 ? "SYNCING" : formatCountdown(remaining)}
            </span>
          </div>
          <div className="poem-progress" aria-hidden="true">
            <span style={{ width: `${progress * 100}%` }} />
          </div>
          <p className="poem-next__note">
            {syncing
              ? "正在同步信号"
              : status === "failed"
                ? "信号干扰 · 稍后重试"
                : error
                  ? "信号中断"
                  : "每分钟一句 · 自动接收"}
          </p>
        </div>
      </section>

      <section className="poem-log" aria-labelledby="poem-log-title">
        <div className="poem-log__head">
          <h2 id="poem-log-title">TRANSMISSION LOG</h2>
          <span>{lines.length} LOADED</span>
        </div>

        {history.length > 0 ? (
          <ol className="poem-lines">
            {history.map((line) => (
              <li className="poem-line-row" key={line.id}>
                <time dateTime={line.slot}>{formatTime(line.slot)}</time>
                <p>{line.line}</p>
                <span>#{line.id}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="poem-empty">还只有这一句。等下一分钟。</p>
        )}

        {hasMore ? (
          <button
            className="poem-more"
            type="button"
            onClick={() => void loadOlder()}
            disabled={loadingOlder}
          >
            {loadingOlder ? "LOADING…" : "LOAD OLDER / 更早的信号"}
          </button>
        ) : null}

        <p className="poem-note">
          每分钟一句 · DeepSeek 生成 · 存在 Neon Postgres · 不重播
        </p>
      </section>
    </>
  );
}
