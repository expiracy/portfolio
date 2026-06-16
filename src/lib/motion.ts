import type { Variants } from "framer-motion";

/**
 * Shared entrance-animation timing — the two knobs that pace every tab-open
 * reveal (about, timeline, projects, contact). Bump these to slow the whole
 * site's entrances down (or speed them up); per-page values inherit from them.
 * Tuned for ~1s reveals.
 */
export const REVEAL_DURATION = 0.6;
export const REVEAL_STAGGER = 0.16;

/**
 * Git-log timeline cadence — the beat between commits in the sequential
 * draw-in. The branch line draws one segment over exactly this long and starts
 * with its commit, so the segment "arrives" at the next commit just as that dot
 * lights: one continuous line travelling top→bottom, dropping dots as it goes.
 * Doubles as the row stagger and the per-commit hash-scramble offset.
 */
export const TIMELINE_CADENCE = 0.24;

/** A container whose children's enter animations are staggered. */
export const staggerContainer = (staggerChildren = REVEAL_STAGGER): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren } },
});

/** A child that fades — and optionally slides — into place. */
export const fadeIn = (
  { x = 0, y = 0, duration = REVEAL_DURATION }: { x?: number; y?: number; duration?: number } = {},
): Variants => ({
  hidden: { opacity: 0, x, y },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration } },
});
