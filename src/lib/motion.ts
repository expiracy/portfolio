import type { Variants } from "framer-motion";

/** A container whose children's enter animations are staggered. */
export const staggerContainer = (staggerChildren = 0.05): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren } },
});

/** A child that fades — and optionally slides — into place. */
export const fadeIn = (
  { x = 0, y = 0, duration = 0.2 }: { x?: number; y?: number; duration?: number } = {},
): Variants => ({
  hidden: { opacity: 0, x, y },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration } },
});
