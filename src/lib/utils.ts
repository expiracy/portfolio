import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with clsx, then resolve conflicting Tailwind utilities with
 * tailwind-merge (e.g. a later `px-4` wins over an earlier `px-2`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Footer counter: "3 entries" when unfiltered, "2 of 3 entries" when filtered. */
export function pluralCount(filtered: number, total: number, noun: string) {
  return filtered === total ? `${total} ${noun}` : `${filtered} of ${total} ${noun}`;
}
