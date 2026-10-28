"use client";

import { useMemo } from "react";
import { heroSceneMarkup } from "./hero-scene-markup";

function prefixIds(markup: string, prefix: string) {
  if (!prefix) return markup;

  return markup
    .replace(/id="([^"]+)"/g, (_, id) => `id="${prefix}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`)
    .replace(/href="#([^"]+)"/g, (_, id) => `href="#${prefix}${id}"`);
}

type HeroSceneProps = {
  idPrefix?: string;
  ghost?: boolean;
  viewBox: string;
};

export function HeroScene({
  idPrefix = "",
  ghost = false,
  viewBox,
}: HeroSceneProps) {
  const markup = useMemo(() => prefixIds(heroSceneMarkup, idPrefix), [idPrefix]);

  return (
    <svg
      className={ghost ? "scene scene--ghost" : "scene"}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
