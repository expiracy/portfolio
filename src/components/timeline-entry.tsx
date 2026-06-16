"use client"

import React, { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useReducedMotion } from "framer-motion";
import { BadgeList } from "@/components/detail-modal";
import { TIMELINE_CADENCE } from "@/lib/motion";
import { Tag } from "@/data/content";

const HEX = "0123456789abcdef";

/**
 * A commit hash that scrambles through random hex then resolves left-to-right —
 * a "computing the SHA" shimmer, fired `startDelayMs` after mount so it lands in
 * sync with the timeline's sequential draw-in. Renders the real hash immediately
 * for reduced-motion / SSR (so first paint matches and there's no hydration gap).
 */
function ScrambleHash({ text, startDelayMs = 0 }: { text: string; startDelayMs?: number }) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(text);
      return;
    }
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const startId = setTimeout(() => {
      const totalFrames = 24; // ~0.6s at 25ms/frame
      let frame = 0;
      intervalId = setInterval(() => {
        frame++;
        const locked = Math.floor((frame / totalFrames) * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          out += i < locked ? text[i] : HEX[Math.floor(Math.random() * HEX.length)];
        }
        setDisplay(out);
        if (frame >= totalFrames) {
          setDisplay(text);
          clearInterval(intervalId);
        }
      }, 25);
    }, startDelayMs);
    return () => {
      clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, reduceMotion, startDelayMs]);

  return <span className="text-terminal-cyan">{display}</span>;
}

/** The hover-affordance chevron shared by timeline rows and project cards. */
export function RowChevron() {
  return (
    <FiChevronRight className="w-4 h-4 text-terminal-dim group-hover:text-terminal-green transition-colors shrink-0" />
  );
}

interface TimelineEntryProps {
  hash: string;
  period: string;
  title: string;
  subtitle: string;
  detailLine: string;
  tags: Tag[];
  /** Row position — used to sync the hash scramble to the draw-in cadence. */
  index: number;
}

/** One commit-style row in a git-log timeline (education, experience). */
export function TimelineEntry({ hash, period, title, subtitle, detailLine, tags, index }: TimelineEntryProps) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <ScrambleHash text={hash} startDelayMs={index * TIMELINE_CADENCE * 1000} />
        <span className="text-terminal-amber">{period}</span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-terminal-green font-bold text-sm md:text-base group-hover:underline">
          {title}
        </span>
        <RowChevron />
      </div>
      <div className="text-terminal-cyan t-body mb-1">{subtitle}</div>
      <div className="text-terminal-dim t-body mb-2 leading-relaxed">{detailLine}</div>
      <BadgeList items={tags} />
    </>
  );
}
