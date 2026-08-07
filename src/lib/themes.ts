// Plain (non-"use client") module so the theme list is real on both the server
// (layout's pre-hydration script) and the client (provider + header menu).

export const THEMES = ["green", "pink", "blue", "light", "synthwave", "cyberpunk", "vaporwave"] as const;
export type Theme = (typeof THEMES)[number];
export const DEFAULT_THEME: Theme = "synthwave";

/** Runtime guard: is an unknown string one of our themes? */
export function isTheme(value: string | null): value is Theme {
  return value !== null && (THEMES as readonly string[]).includes(value);
}
