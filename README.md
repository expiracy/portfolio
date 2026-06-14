# Portfolio

A terminal-themed personal portfolio for James Gray, built with Next.js and
exported as a static site to GitHub Pages.

The UI is styled as a retro CRT terminal — typewriter commands, a scanline ASCII
`neofetch`, a `git log` timeline for education and experience, an `ls`-style
project listing, and a `netstat` contact graph — with four switchable colour
themes (green, pink, blue, light) persisted to `localStorage`.

## Tech stack

- **Next.js 14** (App Router, `output: "export"` static export)
- **TypeScript** + **Tailwind CSS** (design tokens as CSS variables in `globals.css`)
- **framer-motion** for animation, **react-icons** for icons
- **Bun** for install/build

## Development

```bash
bun install
bun dev          # http://localhost:3000
```

## Build

```bash
bun run build    # static export to ./out
```

## Project structure

- `src/app` — root layout, global styles, and the single route
- `src/components` — UI primitives (terminal shell, timeline, detail modal, contact graph)
- `src/components/pages` — the five tab pages (about, education, experience, projects, contact)
- `src/lib` — design tokens, theme constants, the `cn` helper, motion presets, shared hooks
- `src/data/content.ts` — all portfolio content (profile, experience, projects, education)

## Deployment

Pushing to `master` triggers [`.github/workflows/nextjs.yml`](.github/workflows/nextjs.yml),
which builds with Bun and deploys the static export to GitHub Pages.
