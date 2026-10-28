"use client";

import { RadioProvider, useRadio } from "@/components/radio/radio-provider";
import { useCursor } from "@/hooks/use-cursor";
import { useFinePointer } from "@/hooks/use-fine-pointer";
import { useMarquees } from "@/hooks/use-marquees";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useReveals } from "@/hooks/use-reveals";
import { FieldNotes } from "./field-notes";
import { SiteFooter } from "./footer";
import { SiteHeader } from "./header";
import { Hero } from "./hero";
import { Letters } from "./letters";
import { Programs } from "./programs";
import { Ticker } from "./ticker";

function CursorLayer() {
  const { playing } = useRadio();
  const finePointer = useFinePointer();
  useCursor(finePointer, playing);

  return (
    <div className="cursor" id="cursor" aria-hidden="true">
      <span className="cursor__ring" />
      <span className="cursor__dot" />
      <span className="cursor__label" id="cursorLabel" />
    </div>
  );
}

function SoundHint() {
  const { hint } = useRadio();
  return (
    <div
      className={`sound-hint${hint ? " is-visible" : ""}`}
      role="status"
      aria-live="polite"
    >
      {hint}
    </div>
  );
}

function Page() {
  const reducedMotion = useReducedMotion();
  useMarquees();
  useReveals(reducedMotion);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <div className="grain" aria-hidden="true" />
      <CursorLayer />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Ticker />
        <Programs />
        <FieldNotes />
        <Letters />
      </main>
      <SiteFooter />
      <SoundHint />
    </>
  );
}

export function Home() {
  return (
    <RadioProvider>
      <Page />
    </RadioProvider>
  );
}
