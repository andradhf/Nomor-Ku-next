# Shopping Cart, Checkout Flow & Payment Integration — Implementation Plan

## Overview

Implement a full e-commerce checkout flow for the existing Next.js app. This includes a **shopping cart** (accessible from the header), a **cart page** listing selected products, a **checkout form** with Cloudflare Turnstile captcha, and a **two-step backend integration** that ends with a redirect to Xendit payment.

> **Read all sections before writing any code.** Follow the order of tasks below. Do NOT skip steps.

---

## Architecture Summary

```
Header (CartIcon + badge)
    │
    ▼
CustomizerSection.tsx ──adds──▶ Cart Store (Zustand)
    │
    ▼
/cart page ──shows──▶ List of carted products + Checkout button
    │
    ▼
/checkout page ──form──▶ Name, Phone, Address, Notes (optional)
    │                     + Cloudflare Turnstile captcha
    ▼
Step 1: POST /api/user/initiate  (with captcha token)
    │
    ▼
Step 2: POST /api/payment/initiate  (with phone + items)
    │
    ▼
Redirect → Xendit payment URL from response
```

---

## Task 1 — Cart State Management (Zustand Store)

Create a global cart store using **Zustand** with `persist` middleware (localStorage).

### File: `@/store/cartStore.ts`

```ts
// Types needed:
interface CartItem {
  item_code: string;   // maps to product_id from constants.ts
  item_name: string;   // product display name
  quantity: number;
  image?: string;      // product thumbnail for cart display
  price?: number;      // unit price for display (optional, for UI only)
  // Include any customization data the user selected in CustomizerSection
  customization?: Record<string, any>;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;       // add or increment quantity
  removeItem: (item_code: string) => void; // remove entirely
  updateQuantity: (item_code: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}
```

**Rules:**
- Use `zustand/middleware` `persist` to save cart in localStorage under key `"nomorku-cart"`.
- `addItem` should check if item_code already exists → if yes, increment quantity; if no, push new.
- `item_code` comes from the product constants in `@app/checkout/constants.ts`. Inspect that file and map each product's ID to `item_code`.
- Install zustand if not already installed: `npm install zustand`

---

## Task 2 — Wire Cart into CustomizerSection.tsx

### File: `@app/checkout/sections/CustomizerSection.tsx`

**What to do:**
1. Import the cart store: `import { useCartStore } from "@/store/cartStore"`
2. Find the existing "add" / "select" / "confirm" button (the action that finalizes the user's product selection).
3. On that button's click handler, call `addItem()` with the correct `item_code` and `item_name` pulled from `@app/checkout/constants.ts`.
4. After adding, show a brief toast/notification confirming "Added to cart" (use sonner, react-hot-toast, or a simple animated div — match the existing UI style).
5. **Do NOT break** any existing customizer logic. The add-to-cart is an *additional* side-effect on the existing action.

**Inspect first:**
- Read `@app/checkout/constants.ts` to understand product IDs, names, and structure.
- Read the full `CustomizerSection.tsx` to understand what data is available when the user "selects" a product.

---

## Task 3 — Cart Icon in Header

### File: `@/components/Header.tsx` (or wherever the app header/navbar lives)

**What to do:**
1. Add a shopping cart icon (use `lucide-react` `ShoppingCart` or the icon library already used in the project).
2. Display a **badge** showing the number of items in the cart. Read from `useCartStore.getState().getTotalItems()` or use the hook reactively.
3. Wrap the icon in a `<Link href="/cart">` so clicking navigates to the cart page.
4. Badge should only appear when items > 0.
5. Add a subtle scale/bounce animation when an item is added (optional but nice UX).

**Style rules:**
- Match the existing header's design language (colors, spacing, font).
- Badge: small circular indicator, positioned top-right of the cart icon, contrasting background color.

---

## Task 4 — Cart Page

### File: `@app/cart/page.tsx`

Create a new route `/cart` that displays the user's cart contents.

**UI Requirements:**
- List each `CartItem` as a row/card showing:
  - Product image (if available)
  - `item_name`
  - Quantity with +/- controls to adjust
  - Remove button (trash icon)
  - Any customization details the user selected
- Show **empty state** when cart is empty: friendly message + "Continue Shopping" link back to the customizer.
- At the bottom, show a **sticky footer or summary section** with:
  - Total items count
  - A prominent **"Checkout"** button → navigates to `/checkout`
- The Checkout button should be **disabled** if the cart is empty.

**Style rules:**
- Responsive: stack cards vertically on mobile, allow wider layout on desktop.
- Match the overall app design system (inspect existing pages for color palette, typography, border-radius, shadow patterns).

---

## Task 5 — Checkout Page (User Details Form + Captcha)

### File: `@app/checkout-form/page.tsx`

> Use `/checkout-form` as the route to avoid conflicts if `/checkout` is already used by the customizer. If `/checkout` is free, use that instead — inspect the existing routes first.

### 5A — Form UI

Create a clean checkout form with these fields:

| Field     | Type     | Required | Validation                              |
|-----------|----------|----------|-----------------------------------------|
| Full Name | text     | Yes      | Min 3 chars                             |
| Phone     | tel      | Yes      | Indonesian format (08xx or +62xx), 10-15 digits |
| Address   | textarea | Yes      | Min 10 chars                            |
| Notes     | textarea | No       | Optional, max 500 chars                 |

- Show an **order summary** sidebar/section (read from cart store) so the user can see what they're paying for.
- Use client-side validation. Show inline error messages under each field.
- Disable the submit button until all required fields pass validation AND the captcha is completed.

### 5B — Cloudflare Turnstile Integration

Install the Turnstile React component:
```bash
npm install @marsidev/react-turnstile
```

Or use the script-tag approach — either works. Here's the React component method:

```tsx
import { Turnstile } from '@marsidev/react-turnstile'

// In your form:
<Turnstile
  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
  onSuccess={(token) => setCaptchaToken(token)}
  onError={() => setCaptchaToken(null)}
  onExpire={() => setCaptchaToken(null)}
/>
```

**Environment variable needed:**
```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<the-site-key>
```

Add this to `.env.local` (or `.env`). If no key exists yet, use Cloudflare's **test key** for development:
- Always pass: `1x00000000000000000000AA`
- Always block: `2x00000000000000000000AB`

### 5C — Form Submission Logic (Two-Step API Flow)

On form submit, execute **two sequential API calls**:

#### Step 1: Register User

```ts
const res1 = await fetch("http://localhost:3000/api/user/initiate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Captcha-Token": captchaToken,  // from Turnstile widget
  },
  body: JSON.stringify({
    user: {
      name: formData.fullName,
      phone: formData.phone,
      address: formData.address,
    },
  }),
});

const userData = await res1.json();
// Expected: { success: true, user_id: number, phone: string, erp_customer: string }
```

- If `userData.success` is falsy or the request fails, show an error message and **stop**. Do NOT proceed to step 2.
- Save `userData.phone` for step 2.

#### Step 2: Initiate Payment

```ts
// Build items array from the cart store
const cartItems = useCartStore.getState().items.map((item) => ({
  item_code: item.item_code,
  item_name: item.item_name,
  quantity: item.quantity,
}));

const res2 = await fetch("http://localhost:3000/api/payment/initiate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // No captcha token needed
  },
  body: JSON.stringify({
    phone: userData.phone,
    items: cartItems,
  }),
});

const paymentData = await res2.json();
```

- The response from this endpoint will contain a **Xendit payment URL** (likely in a field like `paymentData.invoice_url` or `paymentData.redirect_url` — inspect the actual response).
- On success: **redirect the user** to that Xendit URL:
  ```ts
  window.location.href = paymentData.invoice_url; // or whatever the redirect field is
  ```
- On success, also **clear the cart**: `useCartStore.getState().clearCart()`

### 5D — Loading & Error States

- Show a **loading spinner/overlay** during API calls with text like "Processing your order..."
- Disable the submit button while loading to prevent double-submission.
- Handle network errors gracefully with a retry option.
- If step 1 succeeds but step 2 fails, inform the user and offer a retry for step 2 only (don't re-submit step 1).

---

## Task 6 — Backend URL Configuration

**Do NOT hardcode** `http://localhost:3000` everywhere. Create a centralized config:

### File: `@/lib/api.ts`

```ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  userInitiate: `${API_BASE_URL}/api/user/initiate`,
  paymentInitiate: `${API_BASE_URL}/api/payment/initiate`,
} as const;
```

Add to `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

Use `API_ENDPOINTS.userInitiate` and `API_ENDPOINTS.paymentInitiate` in the checkout form instead of raw strings.

---

## Task 7 — Navigation Flow & Edge Cases

### Navigation:
- Header cart icon → `/cart`
- Cart page "Checkout" button → `/checkout-form` (or `/checkout` if available)
- After payment redirect → Xendit handles it

### Edge cases to handle:
1. **User goes to `/cart` with empty cart** → show empty state, link back to product page.
2. **User goes to `/checkout-form` with empty cart** → redirect back to `/cart` automatically.
3. **User refreshes checkout form page** → cart data persists (Zustand persist middleware handles this).
4. **Captcha expires** → re-render Turnstile widget, disable submit until new token obtained.
5. **API returns non-JSON or 500** → catch and show user-friendly error, don't crash the page.

---

## File Summary — What to Create / Modify

| Action | File Path |
|--------|-----------|
| **Create** | `@/store/cartStore.ts` |
| **Create** | `@app/cart/page.tsx` |
| **Create** | `@app/checkout-form/page.tsx` (or `@app/checkout/page.tsx` if route is free) |
| **Create** | `@/lib/api.ts` |
| **Modify** | `@/components/Header.tsx` (or equivalent header component) — add cart icon + badge |
| **Modify** | `@app/checkout/sections/CustomizerSection.tsx` — wire addItem on product select |
| **Modify** | `.env.local` — add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `NEXT_PUBLIC_API_BASE_URL` |

---

## Dependencies to Install

```bash
npm install zustand @marsidev/react-turnstile
```

If `lucide-react` or another icon library is not already installed, install it too for the cart icon.

---

## Important Constraints

1. **Do NOT break existing functionality.** The customizer flow must continue to work as-is. Cart is additive.
2. **Inspect before editing.** Before modifying any existing file, read it fully to understand current logic.
3. **Use the existing design system.** Don't introduce new color palettes or fonts — match what's already in the app.
4. **TypeScript throughout.** All new files must be `.ts` or `.tsx` with proper types, no `any`.
5. **`item_code` mapping is critical.** The values sent to the backend in `items[].item_code` must match what the backend expects. These come from `@app/checkout/constants.ts` — inspect and use the correct product IDs.
6. **Test the full flow** end-to-end after implementation: select product → appears in cart → go to cart → checkout → fill form → captcha → submit → redirect to Xendit.
