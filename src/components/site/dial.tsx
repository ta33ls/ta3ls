"use client";

import { useLayoutEffect, useRef, type KeyboardEvent } from "react";
import { useAuto, useRadio } from "@/components/radio/radio-provider";
import { skillBands } from "@/lib/site-data";

export function Dial() {
  const { station, band, playing, selectStation } = useRadio();
  const { autoEnabled, countdown, toggleAuto } = useAuto();
  const trackRef = useRef<HTMLDivElement>(null);
  const stationRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useLayoutEffect(() => {
    const update = () => {
      const track = trackRef.current;
      const active = stationRefs.current[station];
      if (!track || !active) return;
      const center = active.offsetLeft + active.offsetWidth / 2;
      track.style.setProperty("--needle", `${center}px`);
    };

    update();
    const frame = window.requestAnimationFrame(update);
    const onResize = () => update();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    document.fonts?.ready.then(update).catch(() => {});

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }, [station]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = stationRefs.current.findIndex(
      (node) => node === document.activeElement
    );
    if (currentIndex < 0) return;

    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % skillBands.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (currentIndex - 1 + skillBands.length) % skillBands.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = skillBands.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectStation(nextIndex, true);
    stationRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="dial">
      <div className="dial__meta">
        <span className="dial__label">
          $ cat skills.json <span>/</span> NIGHT BAND
        </span>
        <span className="dial__status">
          <span className="dial__lamp" aria-hidden="true" />
          {band.freq} {band.name} · {playing ? "RECEIVING" : "STANDBY"}
        </span>
        <span className="dial__hint">{band.level}</span>
        <button
          className={`dial__auto${autoEnabled ? "" : " is-paused"}`}
          type="button"
          aria-pressed={autoEnabled}
          aria-label={
            autoEnabled
              ? `Pause auto scan, next station in ${countdown} seconds`
              : "Resume auto scan"
          }
          onClick={toggleAuto}
        >
          <span className="dial__auto-lamp" aria-hidden="true" />
          <span className="dial__auto-text">
            AUTO{" "}
            {autoEnabled ? (
              <>
                <b className="dial__auto-count">
                  {String(countdown).padStart(2, "0")}
                </b>
                s
              </>
            ) : (
              "OFF"
            )}
          </span>
        </button>
      </div>

      <div
        className="dial__track"
        ref={trackRef}
        role="radiogroup"
        aria-label="Skill bands"
        onKeyDown={onKeyDown}
      >
        <div className="dial__ticks" aria-hidden="true" />
        {skillBands.map((item) => {
          const active = item.index === station;
          return (
            <button
              key={item.freq}
              ref={(node) => {
                stationRefs.current[item.index] = node;
              }}
              className={`station${active ? " is-active" : ""}`}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              data-station={item.index}
              onClick={() => selectStation(item.index, true)}
              onFocus={() => {
                if (item.index !== station) selectStation(item.index, false);
              }}
            >
              <span className="station__freq">{item.freq}</span>
              <span className="station__name">{item.name}</span>
              <span className="station__en">{item.en}</span>
            </button>
          );
        })}
        <span className="dial__needle" aria-hidden="true" />
      </div>
    </div>
  );
}
