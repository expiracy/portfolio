/**
 * Terminal palette tokens.
 *
 * The actual colour values live once in globals.css under each [data-theme]
 * block. This module is the single source of truth for the token *name* →
 * CSS custom property mapping, shared by:
 *   - tailwind.config.ts, so each token becomes a `*-terminal-<name>` utility, and
 *   - runtime code that can't use Tailwind classes — SVG `fill`/`stroke`
 *     attributes and framer-motion animated values.
 *
 * Most custom properties hold a raw `R G B` channel triple rather than a
 * colour, so that the `rgb(... / <alpha-value>)` wrapper below lets Tailwind
 * inject an alpha channel — `text-terminal-dim/50` only works because of this.
 * (A bare `var(--t-dim)` silently produces an invalid colour under `/50`.)
 *
 * `border`, `scanline` and `selection` are complete pre-alpha'd colours, so
 * they carry no `<alpha-value>` slot and must not be given an opacity modifier.
 *
 * Import as `T` at call sites: `import { terminalColors as T } from "@/lib/tokens"`.
 */
export const terminalColors = {
  green: "rgb(var(--t-green) / <alpha-value>)",
  dim: "rgb(var(--t-dim) / <alpha-value>)",
  cyan: "rgb(var(--t-cyan) / <alpha-value>)",
  amber: "rgb(var(--t-amber) / <alpha-value>)",
  red: "rgb(var(--t-red) / <alpha-value>)",
  bg: "rgb(var(--t-bg) / <alpha-value>)",
  "bg-light": "rgb(var(--t-bg-light) / <alpha-value>)",
  border: "var(--t-border)",
  glow: "rgb(var(--t-glow) / <alpha-value>)",
  scanline: "var(--t-scanline)",
  selection: "var(--t-selection-bg)",
} satisfies Record<string, string>;

/**
 * The same tokens as plain CSS colours, for anything outside Tailwind's colour
 * pipeline (inline `style`, SVG attributes, framer-motion values) — Tailwind is
 * what substitutes `<alpha-value>`, so the raw strings above are invalid there.
 */
export const terminalCssColors = Object.fromEntries(
  Object.entries(terminalColors).map(([name, value]) => [name, value.replace(" / <alpha-value>", "")]),
) as Record<keyof typeof terminalColors, string>;
