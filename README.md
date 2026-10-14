# Sable & Oak: Handmade Furniture Website

React + Vite + Tailwind + Framer Motion. A slideshow hero with side descriptions, a custom cursor, a company-history section (since 2003, now online), a draggable collection slider, a photo-based shop with cart, a custom-order form, and Paystack checkout with a 50% deposit option.

"Sable & Oak" is a placeholder name. Change it in one place: `BRAND.name` in `src/config.ts` (also update the `<title>` and meta tags in `index.html`).

## 1. Make it yours

- `src/config.ts`: brand name, founding year, contact details, history timeline, reviews
- `src/data/products.ts`: products, prices and categories
- `src/components/Hero.tsx`: slideshow slides and their descriptions
- `public/images/`: your photos. Use the largest originals you have (at least 1600px wide for full-screen slides); small photos look soft when stretched.
- Reviews: add real ones to `REVIEWS` in `src/config.ts`. The section stays hidden until you do.
- The middle chapter of the history timeline is generic. Replace it with your real milestones.

## 2. Run locally

```bash
npm install
cp .env.example .env   # then fill in your values
npm run dev
```

## 3. Payments (Paystack)

1. Create a Paystack account for your South African business and copy your **public** key (`pk_test_...` to test, `pk_live_...` when live).
2. Put it in `VITE_PAYSTACK_PUBLIC_KEY`. Never put the secret key in this project.
3. Customers can pay in full or a 50% deposit. The order details travel with the payment as metadata, so you can see them on the Paystack dashboard.

GitHub Pages is a static host, so there is no server to verify payments or store orders. Treat the Paystack dashboard as your record of payments. For order tracking, an admin dashboard or server-side verification, add a backend such as Supabase.

## 4. Order and enquiry emails (optional)

Create a free form at formspree.io and set `VITE_FORMSPREE_ID`. Custom-order requests, newsletter signups and paid-order details are then emailed to you. Without it, the forms open WhatsApp with the details pre-filled (set `VITE_WHATSAPP_NUMBER`).

## 5. Publish on GitHub Pages

1. Create a GitHub repository and push this folder to the `main` branch.
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Repo **Settings → Secrets and variables → Actions → Variables**: add `VITE_PAYSTACK_PUBLIC_KEY`, `VITE_FORMSPREE_ID`, `VITE_WHATSAPP_NUMBER`.
4. Every push to `main` builds and deploys automatically (`.github/workflows/deploy.yml`).

## Notes

- Sliders can be dragged with the mouse or swiped on touch screens. The hero also responds to the left and right arrow keys.
- The custom cursor only runs on devices with a mouse, and is off when the visitor prefers reduced motion.
- Test a small payment in Paystack test mode before going live.
