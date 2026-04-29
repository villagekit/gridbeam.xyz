# 06 — Designs catalog browser

**Status:** TODO

## Why
The legacy site has a strong designs catalog — browse by category (bedroom, desk, dining, storage), drill into individual designs with parameters and 3D previews. This is one of the highest-value features to keep.

## What
- `app/designs/page.tsx` — grid of all designs, filterable by category
- `app/designs/[id]/page.tsx` — individual design page with parameters UI, 3D preview, parts list, build instructions

## Steps
- [ ] Decide where design data lives:
  - **Option A**: Keep using `@villagekit-private/designs` from `node-modules/packages/designs/`. Easy to start, but Stream 05 wants to retire `node-modules`.
  - **Option B**: Move designs into `./gridkit/products/kit/designs/` (or a sibling) so they live with the engine. Cleaner long-term.
  - Recommend Option B — folded into the engine's open-source repo.
- [ ] Build the listing page: server component reads design index, renders grid of cards. Filter by category (client component over the index).
- [ ] Build the detail page:
  - Server component for static design data (title, description, parts list)
  - Client component for the parameters UI (`@villagekit/parameters` from the engine)
  - Client component for the 3D sandbox preview (`@villagekit/sandbox`)
- [ ] Embed the cutting planner inline (legacy site does this — see commit `392eb975`).
- [ ] "Get the parts" CTA → links to `/suppliers` (instead of the old `/store/[id]` link).
- [ ] Pre-render design pages at build time where possible (`generateStaticParams`).

## Notes
- The 3D sandbox uses react-three-fiber. Mount it client-side only (`'use client'` + dynamic import with `ssr: false`).
- The legacy site uses `getStaticPaths`/`getStaticProps` (pages router); under app router, this becomes `generateStaticParams` + the page component being a server component.
- Parameter state syncs to the URL via query params — keep this; users like sharing configured designs.

## Depends on
- [./02-layout-and-nav.md](./02-layout-and-nav.md)
- [../03-engine/05-publish-npm.md](../03-engine/05-publish-npm.md) — engine packages need to be installable
- [../03-engine/07-website-integration.md](../03-engine/07-website-integration.md) — the integration glue
