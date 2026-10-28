"use client";

import { useEffect, useRef } from "react";

export function useCursor(finePointer: boolean, playing: boolean) {
  const playingRef = useRef(playing);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    if (!finePointer) return;

    const cursor = document.getElementById("cursor");
    const label = document.getElementById("cursorLabel");
    if (!cursor || !label) return;

    document.body.classList.add("has-cursor");

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let renderX = pointerX;
    let renderY = pointerY;
    let frame = 0;
    let hasMoved = false;

    const renderCursor = () => {
      frame = 0;
      renderX += (pointerX - renderX) * 0.42;
      renderY += (pointerY - renderY) * 0.42;
      cursor.style.transform = `translate3d(${renderX}px, ${renderY}px, 0)`;
      if (
        Math.abs(pointerX - renderX) > 0.1 ||
        Math.abs(pointerY - renderY) > 0.1
      ) {
        frame = window.requestAnimationFrame(renderCursor);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!hasMoved) {
        hasMoved = true;
        renderX = pointerX;
        renderY = pointerY;
        cursor.classList.add("is-on");
      }

      if (!frame) frame = window.requestAnimationFrame(renderCursor);

      const target = event.target as Element | null;
      const interactive = target?.closest("a, button");
      if (interactive) {
        cursor.classList.add("is-hover");
        label.textContent = cursorTextFor(interactive, playingRef.current);
      } else {
        cursor.classList.remove("is-hover");
        label.textContent = "";
      }
    };

    const onPointerDown = () => cursor.classList.add("is-press");
    const onPointerUp = () => cursor.classList.remove("is-press");
    const onLeave = () => cursor.classList.remove("is-on");
    const onEnter = () => cursor.classList.add("is-on");

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("has-cursor");
      cursor.classList.remove("is-on", "is-hover", "is-press");
      cursor.style.removeProperty("transform");
      label.textContent = "";
    };
  }, [finePointer]);
}

function cursorTextFor(element: Element, playing: boolean) {
  if (element.classList.contains("station")) {
    const frequency = element.querySelector(".station__freq");
    return `TUNE ${frequency ? frequency.textContent : ""}`.trim();
  }
  if (element.id === "listenBtn") {
    return playing ? "MUTE" : "LISTEN";
  }
  if (element.classList.contains("sound-toggle")) {
    return "SOUND";
  }
  if (element.classList.contains("dial__auto")) {
    return element.getAttribute("aria-pressed") === "true"
      ? "PAUSE"
      : "RESUME";
  }
  if (element.classList.contains("footer__replay")) {
    return "REPLAY";
  }
  if (element.classList.contains("program")) {
    return "OPEN";
  }
  if (
    element.classList.contains("link-ghost") ||
    element.classList.contains("footer__top-link")
  ) {
    return "MOVE";
  }
  if (element.closest(".site-nav")) {
    return "GO";
  }
  return "PRESS";
}
