"use client"

import React, { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@*<>=/\\$+?".split("");
const randGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
const MS_PER_CHAR = 34; // how fast the decode locks characters in, left-to-right

/**
 * Reveals `text` with a Matrix-style decode: every character flickers through
 * random glyphs, then locks into place left-to-right.
 *
 * Progress is read from a fixed wall-clock origin (`performance.now()`), so the
 * decode always finishes on schedule no matter how the timer fires — 60fps in a
 * live tab, or clamped/throttled in the background — and the TerminalPage
 * typewriter re-rendering the list can't starve it. Self-contained with stable
 * deps so a parent re-render never restarts it. Collapses straight to the final
 * text under prefers-reduced-motion.
 */
export function MatrixText({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (reduce) {
      setDisplay(text);
      return;
    }
    const chars = text.split("");
    const start = performance.now() + delay;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const elapsed = performance.now() - start;
      const locked = elapsed < 0 ? 0 : Math.min(chars.length, Math.floor(elapsed / MS_PER_CHAR));
      setDisplay(chars.map((c, i) => (c === " " || i < locked ? c : randGlyph())).join(""));
      if (locked < chars.length) timer = setTimeout(tick, 33);
    };
    tick();
    return () => clearTimeout(timer);
  }, [text, delay, reduce]);

  return (
    <span className={className} aria-label={text}>
      {display || " "}
    </span>
  );
}
