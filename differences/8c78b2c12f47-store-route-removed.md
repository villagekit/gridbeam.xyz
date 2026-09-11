---
title: Store route removed
status: sanctioned
route: /store
axis: code
kind: removed
---
## Legacy

`apps/gridkit/pages/store/index.tsx` (78 lines: `SupplysPage`, a `Catalogue` of store supplies in a `CatalogueLayout`, hydrated by `getStaticProps` from `@villagekit-private/db` and `@villagekit-private/store`) and `apps/gridkit/pages/store/[id].tsx` (393 lines: the product page with its cart actions). Live: `https://gridkit-landing-villagekit.vercel.app/store`; its visible text is `audit/store/dom/legacy.txt` (the route is `legacy-only` in `scripts/audit-routes.txt`, so only the legacy side is captured).

## Current

No `app/store/` route: `http://localhost:3000/store` is the 404 page (not captured: `audit/store/dom/manifest.json` records the current side as skipped). The Suppliers page replaces it (`app/suppliers/page.tsx`, decision [[8b5e51fcaf61]]). The nav swap, the redirects and the plumbing are filed on `shell`: [[191e28561c6d]], [[206a60875a2b]], [[62a5f2d31990]]. Not diffed against `/suppliers`: the two compare structurally, not as route mirrors.

## Verdict

rule: no e-commerce (the store is gone, replaced by the Suppliers page)

## Log
