# Coding Agent Prompt: Convert Landing Page to Next.js — Custom House Numbers

## Context

You are a senior full-stack developer tasked with converting a static landing page (`index.html`) into a Next.js application optimized for UX and SEO. This landing page is for a **custom house numbers** business and will be used as a Meta Ads (Facebook/Instagram) campaign destination. Therefore, performance, load speed, and on-page SEO are critical.

## Reference File

- `index.html` — the existing prototype containing HTML structure, Tailwind CSS styling, and JavaScript. This is the source of truth for design and content. **Do not alter the design, colors, layout, or copy text unless explicitly instructed.**

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Package Manager:** npm

---

## Pages to Build

### 1. `/` — Landing Page (Homepage)

- Full conversion of `index.html` into Next.js components
- Break the page into reusable components (e.g., `Hero`, `ProductCard`, `Testimonial`, `FAQ`, `CTASection`, etc.)
- Each section from `index.html` must be represented as a separate component inside the `components/` folder
- Use `next/image` for all images (automatic optimization)
- Use `next/font` for optimal font loading
- Ensure all JavaScript interactions from `index.html` remain fully functional

### 2. `/checkout` — Checkout Page

- Display a summary of the product selected by the user (product name, variant, price)
- Input form with the following fields (all required unless noted):
  - Full name
  - WhatsApp number
  - Shipping address
  - Additional notes *(optional)*
- CTA button: **"Order via WhatsApp"**
- On button click, automatically generate a WhatsApp message containing:
  - Selected product details
  - Data from the form
  - A clean, professional message format
- Redirect to `https://wa.me/[WA_NUMBER]?text=[ENCODED_MESSAGE]`
- Use the WhatsApp number from the environment variable: `NEXT_PUBLIC_WA_NUMBER`

---

## User Flow

1. User opens the landing page at `/`
2. User browses products and selects one (clicks a "Buy" or "Select" button)
3. Selected product data (name, price, variant if applicable) is passed to `/checkout` via URL query params or `sessionStorage`
4. User fills in the checkout form
5. User clicks **"Order via WhatsApp"** → redirected to WhatsApp with a pre-filled, formatted message

---

## SEO Requirements *(High Priority — for Meta Ads)*

- Implement `generateMetadata()` on every page
- Required meta tags:
  - `title` — specific and keyword-rich
  - `description` — compelling, max 160 characters
  - `og:title`, `og:description`, `og:image` — for Facebook/Instagram link previews
  - `og:type`, `og:url`
  - `twitter:card` set to `summary_large_image`
- Create `public/robots.txt`
- Create `app/sitemap.ts` using the Next.js Sitemap API
- Add JSON-LD structured data (Schema.org `Product` or `LocalBusiness`) on the homepage

---

## Performance & Best Practices

- Use `'use client'` only on components that genuinely require interactivity — keep everything else as Server Components
- All images must use `next/image` with proper `width`, `height`, and `alt` attributes
- Lazy load below-the-fold components using `next/dynamic`
- Target Lighthouse scores: **Performance > 90, SEO = 100, Accessibility > 90**
- Add `loading="eager"` on the hero image (above the fold)

---

## Expected Folder Structure

```
/
├── app/
│   ├── layout.tsx              # Root layout + global metadata
│   ├── page.tsx                # Landing page (/)
│   ├── sitemap.ts              # Dynamic sitemap
│   ├── checkout/
│   │   └── page.tsx            # Checkout page (/checkout)
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/               # One file per section from index.html
│       ├── Hero.tsx
│       ├── ProductCard.tsx
│       └── [other sections].tsx
├── lib/
│   └── whatsapp.ts             # Utility: generate & encode WhatsApp message
├── public/
│   └── robots.txt
├── .env.local.example          # Environment variable template
└── next.config.ts
```

---

## Environment Variables

Create a `.env.local.example` file with the following content:

```env
NEXT_PUBLIC_WA_NUMBER=628xxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Additional Instructions

- Do not install unnecessary third-party libraries. Use only what Next.js natively supports unless there is a specific requirement that justifies an addition.
- All text and copy must be identical to the content in `index.html` — no changes allowed.
- Add a brief comment to each component explaining its purpose.
- Once complete, provide a summary including:
  - A list of all files created
  - Instructions to run the project locally (`npm install && npm run dev`)
  - Steps to deploy to Vercel
