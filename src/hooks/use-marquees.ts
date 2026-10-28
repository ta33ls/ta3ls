"use client";

import { useEffect } from "react";

export function useMarquees() {
  useEffect(() => {
    const tracks = Array.from(
      document.querySelectorAll<HTMLElement>("[data-marquee]")
    );

    tracks.forEach((track) => {
      const group = track.firstElementChild as HTMLElement | null;
      if (!group || track.classList.contains("is-marquee")) return;

      const containerWidth = track.parentElement
        ? track.parentElement.getBoundingClientRect().width
        : window.innerWidth;
      const isTicker = Boolean(track.closest(".ticker"));
      const minimumWidth = isTicker
        ? Math.max(containerWidth + 60, 4200)
        : containerWidth + 60;

      let guard = 0;
      while (group.scrollWidth < minimumWidth && guard < 6) {
        Array.from(group.children).forEach((child) => {
          const clone = child.cloneNode(true) as HTMLElement;
          clone.setAttribute("data-marquee-clone", "item");
          clone.setAttribute("aria-hidden", "true");
          clone
            .querySelectorAll("a, button")
            .forEach((element) => element.setAttribute("tabindex", "-1"));
          group.appendChild(clone);
        });
        guard += 1;
      }

      const duplicate = group.cloneNode(true) as HTMLElement;
      duplicate.setAttribute("aria-hidden", "true");
      duplicate.setAttribute("data-marquee-clone", "group");
      duplicate
        .querySelectorAll("a, button")
        .forEach((element) => element.setAttribute("tabindex", "-1"));
      track.appendChild(duplicate);

      const speed = isTicker ? 24 : 23;
      const duration = Math.max(30, group.scrollWidth / speed);
      track.style.setProperty("--dur", `${duration.toFixed(1)}s`);
      track.classList.add("is-marquee");
    });

    return () => {
      tracks.forEach((track) => {
        track
          .querySelectorAll("[data-marquee-clone]")
          .forEach((clone) => clone.remove());
        track.classList.remove("is-marquee");
        track.style.removeProperty("--dur");
      });
    };
  }, []);
}
