# Stream 01 — Website

Bootstrap and build the gridbeam.xyz Next.js site at the top level of this repo.

## Goal

A clean, content-focused Next.js (latest, app router) + Chakra v3 site that explains grid beam, browses designs, links to suppliers, and hosts the cutting planner — adapted from the legacy gridkit.nz site at `node-modules/apps/gridkit/`, minus everything tied to selling product.

## Tasks

| # | Task | Status |
|---|------|--------|
| 01 | [Bootstrap Next.js + Chakra v3 + tooling](./01-bootstrap-nextjs.md) | DONE |
| 02 | [Root layout, header, footer, mobile nav](./02-layout-and-nav.md) | DONE |
| 03 | [Home page](./03-home-page.md) | DONE |
| 04 | [Educational pages: about, FAQ, tools-and-resources](./04-educational-pages.md) | DONE |
| 05 | [MDX stories / guides](./05-stories.md) | TODO |
| 06 | [Designs catalog browser](./06-designs-catalog.md) | TODO |
| 07 | [Cutting planner tool](./07-cutting-planner.md) | TODO |
| 08 | [Suppliers page (replaces store)](./08-suppliers.md) | TODO |
| 09 | [Contact + subscribe pages](./09-contact-and-subscribe.md) | DONE |
| 10 | [Legal pages (privacy, cookies, etc)](./10-legal-pages.md) | DONE |
| 11 | [Deployment, SEO, sitemaps, robots](./11-deployment-and-seo.md) | TODO |

## Order of attack

**Stream 02 must ship a usable Chakra-v3 `@villagekit/ui` before Stream 01 starts** — decided to avoid a double-migration. Then 01 → 02 within this stream must come first.

After that, work in parallel:
- **Quick-win path:** 03, 04, 05, 09, 10, 11 — pure content + layout, no engine dependency.
- **Engine-dependent path:** 06 (designs catalog) needs Stream 03 first.
- **Standalone tools:** 07 (cutting planner) and 08 (suppliers) are independent.

## Cross-stream dependencies

- **Stream 02 (UI library on Chakra v3) is hard-blocking** — must be ready before task 01 here.
- Stream 03 (engine) blocks task 06 only.
- Stream 04 (content) feeds copy + imagery into tasks 03–10.

## Don't start from the existing stub

`node-modules/apps/gridbeam/` is an abandoned earlier attempt at the gridbeam.xyz site. **Don't use it as a starting point.** It still depends on the legacy `@villagekit-private/ui-*` packages and is on Chakra v2 — wrong direction. Reference it only for what URL routes / page titles existed before; build fresh at the top level.

## What we're explicitly NOT doing

Carried over from the old site but **deleted**:

- `pages/cart.tsx`, `pages/order-complete.tsx`, `pages/store/*`
- `pages/api/checkout.ts`, `pages/api/webhooks/stripe.ts`
- All Stripe SDK usage
- Cart context (`context/cart.ts`) and `CartContextProvider`
- Hardcoded `supplierId: 'gridkit'`
- Matomo + Sentry analytics configs (siteId 6, project gridkit-landing)
- `BUTTONDOWN_API_KEY` Buttondown integration (subscribe page may go static)
