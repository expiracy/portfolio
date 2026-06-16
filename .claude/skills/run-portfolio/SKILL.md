---
name: run-portfolio
description: Run, build, preview, screenshot, or smoke-test the terminal-themed portfolio site. Builds the static Next.js export, serves it, and drives the running SPA (five terminal tabs + the colour-theme switcher) with a headless Playwright driver that screenshots every step. Use when asked to launch/start/run the portfolio, take screenshots of it, or confirm a UI change renders.
---

# Run the portfolio

A terminal/CRT-themed personal site: **Next.js 14 App Router, `output: "export"`** (fully static, no server runtime), one route, a tabbed SPA (about / education / experience / projects / contact) with seven switchable colour themes. Managed with **Bun**.

There is no API and no test suite. You verify it by **rendering the real page in a headless browser** and looking. The driver for that is committed next to this file:

- **Driver:** [`driver.mjs`](driver.mjs) — headless-chromium Playwright script. Points at an already-running server, clicks through all five tabs, switches the theme, screenshots each step, and asserts on the DOM (`HTTP ok`, `html[data-theme]` flips, 5 tabs present, zero console errors). Exits non-zero on any failure, so it doubles as a smoke test.

All paths below are **relative to the repo root** (the directory with `package.json`). Verified on macOS (darwin); Linux notes are called out where they differ.

## Prerequisites

- **Bun** and **Node** on PATH (`bun 1.3`, `node 26` used here). `python3` for the static file server (or substitute any static server).
- **One-time harness setup** — installs Playwright into the *skill's own* `node_modules` (kept out of the app's `package.json` on purpose) and downloads the chromium build (~95 MB, cached in `~/Library/Caches/ms-playwright`):

```bash
bun add --cwd .claude/skills/run-portfolio playwright
.claude/skills/run-portfolio/node_modules/.bin/playwright install chromium
```

> Linux: use `.claude/skills/run-portfolio/node_modules/.bin/playwright install --with-deps chromium` instead — `--with-deps` pulls the system libraries headless chromium needs. (Not exercised here; this machine is macOS.)

## Build

```bash
bun install              # app deps (skip if node_modules is present)
bun run build            # static export → ./out
```

`bun run build` writes the site to `out/` (`index.html`, `404.html`, `_next/…`). Assets are referenced with **absolute** `/_next/…` paths, so the build must be served over **HTTP from the directory root** — opening `out/index.html` as a `file://` URL gives an unstyled, broken page.

## Run (agent path — this is the one to use)

Two steps: serve the build, then drive it. Run the server in the background (or a second shell).

```bash
# 1. serve the static export (port 8000 was free here; pick any free port)
python3 -m http.server -d out 8000

# 2. drive it — screenshots land in /tmp/portfolio-shots
node .claude/skills/run-portfolio/driver.mjs --url http://localhost:8000
```

Expected tail — **11/11**, and six PNGs on disk:

```
PASS  page loads (HTTP ok)  — status 200 @ http://localhost:8000
PASS  app hydrated  — header + data-theme present
PASS  tab bar has 5 tabs  — found 5
PASS  tab: about  — /tmp/portfolio-shots/tab-0-about.png
...
PASS  theme → vaporwave  — button reads "[vaporwave]"
PASS  no page/console errors

11/11 checks passed — screenshots in /tmp/portfolio-shots
```

Then **look at the screenshots** (e.g. `/tmp/portfolio-shots/theme-vaporwave.png`) — a green/0 check count is necessary but not sufficient; a blank-but-200 page still "passes" the HTTP check.

Driver flags:

| Flag | Default | Notes |
|------|---------|-------|
| `--url <url>` | `http://localhost:8000` | server to drive (also `BASE_URL` env) |
| `--theme <name>` | `vaporwave` | `green` `pink` `blue` `light` `synthwave` `cyberpunk` `vaporwave` |
| `--out <dir>` | `/tmp/portfolio-shots` | screenshot directory (also `SHOT_DIR` env) |

## Run (dev server — fast iteration loop)

For live editing, drive `next dev` instead of rebuilding. **It does not match production** — see the framer gotcha below.

```bash
bun dev                  # http://localhost:3000 … but see port note
node .claude/skills/run-portfolio/driver.mjs --url http://localhost:3001
```

> `bun dev` **auto-increments the port** if 3000 is taken (it logs e.g. `Port 3000 is in use, trying 3001 instead` → `Local: http://localhost:3001`). Point `--url` at the port it actually logged, not 3000.

## Run (human path)

```bash
bun dev                  # open the logged URL in a browser, Ctrl-C to stop
```

Useless headless — it just spawns a server and waits.

## Inside Claude Code

The `preview_*` MCP tools (`preview_start`, then `preview_screenshot` / `preview_snapshot`) are a zero-setup alternative to the Playwright driver for a quick look — no `playwright install` needed. Use the committed `driver.mjs` when you want the scripted tab/theme walk-through, a portable CI-runnable harness, or a pass/fail exit code.

## Gotchas

- **Static export needs an HTTP root.** Absolute `/_next/…` asset paths mean `file://` and "serve a subdirectory" both break styling. Serve `out/` itself at `/`.
- **Theme lives on `<html>`.** The provider sets `document.documentElement.dataset.theme` and `localStorage["theme"]` *after hydration*. Server HTML ships `class="dark"` with **no** `data-theme` until JS boots — the driver waits for `html[data-theme]` as its "hydrated" signal. Seven themes are real (`src/lib/themes.ts`); an older note about "back to 4 themes" is stale.
- **Tab labels are width-gated.** The five tab buttons render their text in a `hidden md:inline` span, so below 768px they're icon-only with no accessible name. The driver uses a 1280px viewport and selects the five `button.font-bold` tabs by index — don't shrink the viewport or text selectors vanish.
- **Framer entrance animations freeze in `bun dev`, run in the export.** `reactStrictMode` double-invoke plus the typewriter command re-rendering the subtree restart framer's container-stagger every frame, so staggered entrances (git-log timeline, About ASCII reveal) sit at their first frame in dev. They animate correctly in the static export. Don't chase it as a bug — **screenshot the built `out/` (port 8000 path), not dev.** Content is still present in dev (only the entrance animation is stuck), so the smoke checks pass either way.
- **Playwright is the skill's dep, not the app's.** It installs under `.claude/skills/run-portfolio/node_modules`; the app's `package.json` stays clean. The skill's own `node_modules`/lockfile are git-ignored.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Cannot find package 'playwright'` | Run the one-time `bun add --cwd .claude/skills/run-portfolio playwright` setup line. |
| `browserType.launch: Executable doesn't exist …` | Browser not downloaded: `.claude/skills/run-portfolio/node_modules/.bin/playwright install chromium`. |
| Driver `goto` times out / `ECONNREFUSED` | No server on that port. Start `python3 -m http.server -d out 8000` (or `bun dev`) first, and match `--url` to the running port. |
| Page renders unstyled / 404s on `_next/*` | Served from the wrong root or via `file://`. Serve `out/` at `/` over HTTP. |
| (Linux) chromium fails to launch on missing `.so` | Reinstall with deps: `… playwright install --with-deps chromium`. |

## Static check

No unit tests exist; the driver's exit code is the smoke test. For lint:

```bash
bun run lint             # next lint → "No ESLint warnings or errors"
```
