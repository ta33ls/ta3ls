"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useRadio } from "@/components/radio/radio-provider";
import { useFinePointer } from "@/hooks/use-fine-pointer";
import { useHeroLens } from "@/hooks/use-hero-lens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { profile } from "@/lib/site-data";
import { Dial } from "./dial";
import { HeroScene } from "./hero-scene";

const INTRO = (delay: string) => ({ "--d": delay }) as CSSProperties;

export function Hero() {
  const { band, playing, started, toggle } = useRadio();
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [viewBox, setViewBox] = useState("0 0 1600 1000");

  useHeroLens(heroRef, finePointer, reducedMotion);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setViewBox(
        width <= 560
          ? "550 80 1000 920"
          : width <= 900
            ? "300 80 1300 920"
            : "0 0 1600 1000"
      );
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const note = playing
    ? `Receiving ${band.freq} ${band.name}`
    : started
      ? "Muted · The signal is still drifting"
      : finePointer
        ? "Sound off by default · Move your cursor to scan"
        : "Sound off by default · Tune freely";

  return (
    <section
      className="hero"
      id="top"
      aria-labelledby="heroTitle"
      ref={heroRef}
    >
      <div className="hero-art" id="heroArt" aria-hidden="true">
        <HeroScene viewBox={viewBox} />
        {finePointer ? (
          <div className="ghost" id="ghost">
            <HeroScene idPrefix="ghost-" ghost viewBox={viewBox} />
          </div>
        ) : null}
        <span className="scan" id="scan" aria-hidden="true">
          <span className="scan__label">SPECTRAL 33.00</span>
          <span className="scan__ticks" />
        </span>
        <div className="hero-scrim" />
      </div>

      <p className="hero-vertical" aria-hidden="true">
        TA3LS.DEV · 33 · ON AIR
      </p>

      <div className="hero-inner">
        <p className="hero-kicker hero-intro" style={INTRO(".1s")}>
          <span className="dot" /> FM 33.0 <span className="slash">/</span>{" "}
          ta3ls.dev <span className="slash">/</span> SHANGHAI · AUCKLAND
        </p>

        <h1 className="hero-title" id="heroTitle">
          <span className="hero-title__mask">
            <span
              className="hero-title__line hero-intro"
              style={INTRO(".2s")}
            >
              At the 25th hour,
            </span>
          </span>
          <span className="hero-title__mask">
            <span
              className="hero-title__line hero-title__line--accent hero-intro"
              style={INTRO(".32s")}
            >
              There are 33 love songs
              <span className="hero-title__stop">.</span>
            </span>
          </span>
        </h1>

        <p className="hero-sub hero-intro" style={INTRO(".46s")}>
          {profile.role}.
          <br />
          Blockchain developer, Product manager.
        </p>

        <div className="hero-actions hero-intro" style={INTRO(".56s")}>
          <button
            className="btn-tune"
            id="listenBtn"
            type="button"
            aria-pressed={playing}
            onClick={toggle}
          >
            <span className="btn-tune__eq" aria-hidden="true">
              <span className="eq eq--btn">
                <i />
                <i />
                <i />
                <i />
              </span>
            </span>
            <span className="btn-tune__text">
              <b>{playing ? "PAUSE LISTENING" : "START LISTENING"}</b>
              <small>ENTER THE FREQUENCY</small>
            </span>
            <span className="btn-tune__arrow" aria-hidden="true">
              ↗
            </span>
          </button>
          <a className="link-ghost" href="#work">
            READ THE RESUME <span aria-hidden="true">↓</span>
          </a>
        </div>

        <p className="hero-note hero-intro" style={INTRO(".66s")}>
          <span>{note}</span> · Headphones recommended
        </p>

        <span className="hero-seal" aria-hidden="true">
          LATE
          <br />
          NIGHT
        </span>
      </div>

      <Dial />
    </section>
  );
}
