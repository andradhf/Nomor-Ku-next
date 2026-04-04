# NomorKu Next.js Conversion — Task List

## Phase 1: Project Setup
- [x] Initialize Next.js 14 project (TypeScript + Tailwind CSS + App Router)
- [x] Configure `next.config.ts` (image remote patterns)
- [x] Configure `tailwind.config.ts` (custom colors/fonts from index.html)
- [x] Set up `app/globals.css` (custom styles + Tailwind directives)
- [x] Create `.env.local.example`
- [x] Create `public/robots.txt`

## Phase 2: Layout & Utilities
- [x] `app/layout.tsx` — Root layout + fonts + metadata
- [x] `lib/whatsapp.ts` — WhatsApp message utility
- [x] `components/layout/Header.tsx`
- [x] `components/layout/Footer.tsx`

## Phase 3: Section Components
- [x] `components/sections/Hero.tsx`
- [x] `components/sections/SocialProof.tsx`
- [x] `components/sections/ProductGrid.tsx`
- [x] `components/sections/HowItWorks.tsx`
- [x] `components/sections/CustomizationPreviewer.tsx`
- [x] `components/sections/Testimonials.tsx`
- [x] `components/sections/FAQ.tsx`
- [x] `components/sections/CTASection.tsx`

## Phase 4: Pages & SEO
- [x] `app/page.tsx` — Landing page with metadata + JSON-LD
- [x] `app/checkout/page.tsx` — Checkout form + WhatsApp redirect
- [x] `app/sitemap.ts` — Dynamic sitemap

## Phase 5: Verify
- [x] `npm run build` — no TypeScript errors
- [x] Visual verification in browser
