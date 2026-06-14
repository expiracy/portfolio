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
 * Import as `T` at call sites: `import { terminalColors as T } from "@/lib/tokens"`.
 */
export const terminalColors = {
  green: "var(--t-green)",
  dim: "var(--t-dim)",
  cyan: "var(--t-cyan)",
  amber: "var(--t-amber)",
  red: "var(--t-red)",
  bg: "var(--t-bg)",
  "bg-light": "var(--t-bg-light)",
  border: "var(--t-border)",
  glow: "var(--t-glow)",
  scanline: "var(--t-scanline)",
  selection: "var(--t-selection-bg)",
} satisfies Record<string, string>;
