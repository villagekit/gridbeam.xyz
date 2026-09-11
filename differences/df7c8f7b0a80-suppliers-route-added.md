---
title: Suppliers route added
status: sanctioned
route: /suppliers
axis: code
kind: added
---
## Legacy

No `/suppliers` route at fce357d: `https://gridkit-landing-villagekit.vercel.app/suppliers` is the legacy 404 page (`audit/suppliers/1280/legacy.png`). Prior art for the map the decision names: `apps/gridkit/components/map/{map,producer-list,producer-item,producer-marker}.tsx`, `apps/gridkit/producers.ts`, `apps/gridkit/context/map.ts` (the 2023 `/order` page, decision [[bfa9a416b415]]).

## Current

`app/suppliers/page.tsx` (206 lines) with the data in `content/suppliers.ts`; linked from the top nav and the footer ([[191e28561c6d]], [[703c2d78a721]]). Its copy is one `open` item per visible text block; what the page has and lacks against the decision's design is filed on its own axes.

## Verdict

rule: operator (decision [[8b5e51fcaf61]]: the Suppliers page replaces the store; rule 2 covers the store's removal, not this addition)

## Log
