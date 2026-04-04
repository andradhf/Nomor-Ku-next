# Convert NomorKu Landing Page to Next.js 14

Convert the existing `index.html` static prototype into a production-ready Next.js 14 App Router application, optimized for Meta Ads campaigns with high Lighthouse scores and full SEO.

## Proposed Changes

### Project Initialization
- Bootstrap a new Next.js 14 project with TypeScript and Tailwind CSS inside the workspace root (`c:\Users\GF63\Documents\nomorku-fe`)

---

### App Layer

#### [NEW] `app/layout.tsx`
Root layout with `next/font` (Noto Serif + Manrope), global metadata, JSON-LD LocalBusiness schema, and grain overlay div.

#### [NEW] `app/globals.css`
Tailwind directives + custom CSS from `index.html` (`.material-symbols-outlined`, `.grain-overlay`, `.acrylic-blur`), plus Tailwind config colors/fonts matching original.

#### [NEW] `app/page.tsx`
Landing page that imports and assembles all section components as Server Components, with `generateMetadata()` and JSON-LD Product schema.

#### [NEW] `app/sitemap.ts`
Next.js Sitemap API — exports `/` and `/checkout` URLs.

#### [NEW] `app/checkout/page.tsx`
Checkout page — `'use client'` component with form and WhatsApp redirect logic. Reads product data from URL params / `sessionStorage`.

---

### Components

#### [NEW] `components/layout/Header.tsx`
Navigation bar, identical to `index.html` nav. Client component for mobile scroll behavior.

#### [NEW] `components/layout/Footer.tsx`
Footer, identical to `index.html` footer. Server Component.

#### [NEW] `components/sections/Hero.tsx`
Hero section with `next/image` (eager loading), headline, CTA buttons. Server Component.

#### [NEW] `components/sections/SocialProof.tsx`
Stats bar (500+ rumah, 4.9/5, 2 Thn, 100%). Server Component.

#### [NEW] `components/sections/ProductGrid.tsx`
4-product grid. Each card has a "Pilih Desain" button → navigates to `/checkout?product=...`. Client Component (for navigation).

#### [NEW] `components/sections/HowItWorks.tsx`
4-step process with Material Symbols icons. Server Component.

#### [NEW] `components/sections/CustomizationPreviewer.tsx`
Interactive acrylic previewer (font/color switcher). `'use client'` component.

#### [NEW] `components/sections/Testimonials.tsx`
3 testimonial cards with `next/image` avatars. Server Component, loaded via `next/dynamic` (lazy).

#### [NEW] `components/sections/FAQ.tsx`
3 accordion FAQ items using `<details>/<summary>`. Server Component.

#### [NEW] `components/sections/CTASection.tsx`
Final CTA with background image using `next/image`. Server Component.

---

### Utilities & Config

#### [NEW] `lib/whatsapp.ts`
`generateWhatsAppMessage(product, form)` and `buildWhatsAppUrl(message)` utilities.

#### [NEW] `public/robots.txt`
Standard robots.txt allowing all crawlers.

#### [NEW] `.env.local.example`
```
NEXT_PUBLIC_WA_NUMBER=628xxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

#### [NEW] `next.config.ts`
Configure `images.remotePatterns` for `lh3.googleusercontent.com` (used by all image URLs in the prototype).

---

## User Flow
1. `/` landing page loads → user browses products
2. Clicks "Pilih Desain" on a product card → navigated to `/checkout?product=Rustic+Oak&price=...`
3. Fills form (name, WhatsApp, address, notes)
4. Clicks "Order via WhatsApp" → `wa.me` redirect with pre-filled message

## SEO Implementation
- `generateMetadata()` on both pages with full OG/Twitter tags
- JSON-LD LocalBusiness on homepage
- `sitemap.ts` via Next.js API
- `robots.txt` in `/public`

## Verification Plan
### Automated
- `npm run build` — must succeed with no TypeScript errors
- `npm run dev` — visually verify both pages in browser

### Manual
- Confirm hero image loads eagerly
- Confirm product card → checkout navigation works
- Confirm WhatsApp message is generated correctly
- Confirm FAQ accordion works
- Confirm customization previewer (font/color) works
