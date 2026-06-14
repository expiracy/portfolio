import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Drives a count from 0 → `total`, advancing one step every `speed` ms — the
 * shared core behind the typewriter command and the ASCII scanline reveal.
 *
 * Respects prefers-reduced-motion via framer's reactive hook: when reduced, it
 * jumps straight to `total`. Restarts whenever `total` or `speed` changes.
 */
export function useRevealCount(total: number, speed = 30) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setCount(total);
      return;
    }

    setCount(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setCount(i);
      if (i >= total) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [total, speed, reduceMotion]);

  return { count, done: count >= total };
}
