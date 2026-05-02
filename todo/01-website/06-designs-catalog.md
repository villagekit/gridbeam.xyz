# 06 — Designs catalog browser

**Status:** TODO

## Why
The legacy site has a strong designs catalog — browse by category (bedroom, desk, dining, storage), drill into individual designs with parameters and 3D previews. This is one of the highest-value features to keep.

## What
- `app/designs/page.tsx` — grid of all designs, filterable by category
- `app/designs/[id]/page.tsx` — individual design page with parameters UI, 3D preview, parts list, build instructions

## Steps
- [x] Wire up the design data source. Designs live in `./gridkit-products/products/` and are read at build time by `app/_lib/designs.ts` (Node fs + `smol-toml`). 37 products as of writing. (Done as part of [../03-engine/07-website-integration.md](../03-engine/07-website-integration.md).)
- [ ] Build the listing page: server component reads design index, renders grid of cards. Filter by category (client component over the index). *(Basic listing exists from task 03-engine/07; category filter still TODO.)*
- [x] Build the detail page:
  - Server component for static design data (title, description) — `app/designs/[id]/page.tsx`
  - Client component for the parameters UI (`@villagekit/parameters`) — `app/_components/design/DesignViewer.tsx`
  - Client component for the 3D sandbox preview (`@villagekit/sandbox`, dynamic with `ssr: false`) — `app/_components/design/DesignViewerDynamic.tsx`
  - Parts list still TODO (legacy uses `<ProductSummary>`)
  - Build instructions still TODO
- [ ] Embed the cutting planner inline (legacy site does this — see commit `392eb975`).
- [x] "Get the parts" CTA → links to `/suppliers` (instead of the old `/store/[id]` link).
- [x] Pre-render design pages at build time via `generateStaticParams` — confirmed in production build (37/37 pages).

## Notes
- The 3D sandbox uses react-three-fiber. Mount it client-side only (`'use client'` + dynamic import with `ssr: false`).
- The legacy site uses `getStaticPaths`/`getStaticProps` (pages router); under app router, this becomes `generateStaticParams` + the page component being a server component.
- Parameter state syncs to the URL via query params — keep this; users like sharing configured designs.

## Depends on
- [./02-layout-and-nav.md](./02-layout-and-nav.md)
- [../03-engine/05-publish-npm.md](../03-engine/05-publish-npm.md) — engine packages need to be installable
- [../03-engine/07-website-integration.md](../03-engine/07-website-integration.md) — the integration glue
