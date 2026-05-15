# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint (no --fix flag in current config)
```

There are no tests in this project.

## Architecture

**NomorKu** is an Indonesian landing page + product customizer for custom acrylic house number signs. It has two routes:

- `/` — landing page (`app/page.tsx`) composed of section components from `components/sections/`
- `/checkout` — client-side product customizer (`app/checkout/page.tsx`)

### Checkout / Customizer

The core of the app. All product data, pricing, and canvas drawing logic lives in `app/checkout/constants.ts`. The main component `app/checkout/sections/CustomizerSection.tsx` is a large `'use client'` component with:

- **State**: active product (1/2/3), jenis (color variant), size, font family+variant, main text, sub text, LED toggle
- **Canvas preview**: drawn via `drawPortrait`, `drawLandscape`, or `drawLightBox` from `constants.ts`, each of which implements layered LED glow effects using Canvas 2D shadow API
- **Font loading**: Customizer fonts (Garet, Plus Jakarta Sans) are loaded into `document.fonts` via the FontFace API on mount from `/public/fonts/`. A `fontsReady` gate prevents rendering until all fonts are available. These are separate from the layout fonts (Noto Serif, Manrope) which are loaded via `next/font/google`.
- **Price lookup**: Sizes and prices are keyed by `jenis.id` (and optionally `-led` suffix for products 1 and 3) in `PRODUCTS[n].sizesByJenis`

**Adding/modifying a product**: Edit the `PRODUCTS` record in `constants.ts`. The image key format is `${jenis.id}_${size.id}` (e.g. `black-silver_M`). For LED variants on products 1 and 3, the `sizesByJenis` key uses `${jenis.id}-led`.

**Canvas renderers**: `drawPortrait` / `drawLandscape` / `drawLightBox` are pure functions — they take a `CanvasRenderingContext2D` plus config and draw everything. All use a shared `fitFontSize` helper that shrinks text until it fits within a max width.

### Styling

Tailwind CSS v4 — configured entirely through the `@theme {}` block in `app/globals.css` (no `tailwind.config.js`). The design token names follow Material Design semantics (`--color-primary`, `--color-on-surface`, etc.). Font tokens: `font-headline` = Noto Serif, `font-body` / `font-label` = Manrope.

The root layout applies a full-screen `div.grain-overlay` (z-index 100, `pointer-events: none`) for the subtle texture effect.

### Path alias

`@/*` resolves to the project root (e.g. `@/components/layout/Header`).

### Environment variables

`NEXT_PUBLIC_SITE_URL` — used in `app/sitemap.ts` for the sitemap base URL.
