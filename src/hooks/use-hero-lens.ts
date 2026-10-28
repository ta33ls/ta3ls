"use client";

import { useEffect, type RefObject } from "react";

export function useHeroLens(
  heroRef: RefObject<HTMLElement | null>,
  finePointer: boolean,
  reducedMotion: boolean
) {
  useEffect(() => {
    if (!finePointer) return;
    const hero = heroRef.current;
    if (!hero) return;

    let frame = 0;
    let pointer = { x: 0, y: 0 };

    const applyPointer = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const x = pointer.x - rect.left;
      const y = pointer.y - rect.top;

      hero.style.setProperty("--lx", `${x}px`);
      hero.style.setProperty("--ly", `${y}px`);

      if (!reducedMotion) {
        const px = x / rect.width - 0.5;
        const py = y / rect.height - 0.5;
        hero.style.setProperty("--px", px.toFixed(3));
        hero.style.setProperty("--py", py.toFixed(3));
      }
    };

    const onEnter = () => hero.classList.add("is-lensing");
    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = window.requestAnimationFrame(applyPointer);
    };
    const onLeave = () => {
      hero.classList.remove("is-lensing");
      if (!reducedMotion) {
        hero.style.setProperty("--px", "0");
        hero.style.setProperty("--py", "0");
      }
    };

    hero.addEventListener("pointerenter", onEnter);
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      hero.removeEventListener("pointerenter", onEnter);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      hero.classList.remove("is-lensing");
    };
  }, [heroRef, finePointer, reducedMotion]);
}
