# 06 — Designs catalog browser

**Status:** DONE (build/types/lint clean; live canvas runtime verification deferred)

## Why
The legacy site has a strong designs catalog — browse by category (bedroom, desk, dining, storage), drill into individual designs with parameters and 3D previews. This is one of the highest-value features to keep.

## What
- `app/designs/page.tsx` — grid of all designs, filterable by category
- `app/designs/[id]/page.tsx` — individual design page with parameters UI, 3D preview, parts list, inline cutting plan

## Steps
- [x] Wire up the design data source. Designs live in `./gridkit-products/products/` and are read at build time by `app/_lib/designs.ts` (Node fs + `smol-toml`). 37 products as of writing. (Done as part of [../03-engine/07-website-integration.md](../03-engine/07-website-integration.md).)
- [x] Build the listing page: server `app/designs/page.tsx` reads the index and renders `<DesignsBrowser>` (client) — toggleable category chips derived from each design's `tags` (excluding the generic `furniture` tag), filtered grid.
- [x] Build the detail page:
  - Server component for static design data (title, description) — `app/designs/[id]/page.tsx`
  - Client component for the parameters UI (`@villagekit/parameters`) — `app/_components/design/DesignViewer.tsx`
  - Client component for the 3D sandbox preview (`@villagekit/sandbox`, dynamic with `ssr: false`) — `app/_components/design/DesignViewerDynamic.tsx`
  - Parts list — `app/_components/design/PartsBreakdown.tsx`, wraps `<ProductSummary>` from `@villagekit/product` with gu/mm and group-same-size toggles
  - Build instructions deferred to a follow-up — neither the legacy site nor `gridkit-products/` has structured build steps; would need authored content per design
- [x] Embed the cutting planner inline — `app/_components/design/DesignCuttingPlan.tsx` reads parts from `ProductKitContext`, runs `firstFitDecreasing` from `app/tools/cutting-planner/algorithm.ts`, renders the same `<CutBeamSvg>` (extracted to `app/_components/cutting-plan/CutBeamSvg.tsx`) used by the standalone `/tools/cutting-planner` page, plus a "Open in cutting planner" link that pre-fills the URL state.
- [x] "Get the parts" CTA → links to `/suppliers` (instead of the old `/store/[id]` link).
- [x] Pre-render design pages at build time via `generateStaticParams` — confirmed in production build (37/37 pages).

## Notes
- The 3D sandbox uses react-three-fiber. Mount it client-side only (`'use client'` + dynamic import with `ssr: false`).
- The legacy site uses `getStaticPaths`/`getStaticProps` (pages router); under app router, this becomes `generateStaticParams` + the page component being a server component.
- Parameter state syncs to the URL via query params — keep this; users like sharing configured designs.
- The inline cutting plan picks 30 gu stock when all required cuts ≤ 30 gu, otherwise 60 gu — same heuristic the legacy site used to size starter kits.
- `@villagekit/part` was added to website `package.json` as a direct workspace dep so `PartCreator` is type-importable when reading `ProductKitContext.parts`.

## Follow-ups
- Build instructions per design — neither the legacy site nor the products repo defines them; would require authored MDX or schema. Out of scope for the catalog itself.
- Live runtime verification (drag a slider, watch the cutting plan update, confirm SVG renders) — currently the canvas wasn't booted in this round, matching the deferral on `../03-engine/07-website-integration.md`.

## Depends on
- [./02-layout-and-nav.md](./02-layout-and-nav.md)
- [../03-engine/05-publish-npm.md](../03-engine/05-publish-npm.md) — engine packages need to be installable
- [../03-engine/07-website-integration.md](../03-engine/07-website-integration.md) — the integration glue
