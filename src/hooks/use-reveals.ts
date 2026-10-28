"use client";

import { useEffect } from "react";

export function useReveals(reducedMotion: boolean) {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (reducedMotion) {
      document.documentElement.classList.remove("js-reveal");
      elements.forEach((element) => element.classList.add("is-in"));
      return;
    }

    document.documentElement.classList.add("js-reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-in"));
      return () => document.documentElement.classList.remove("js-reveal");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("js-reveal");
    };
  }, [reducedMotion]);
}
