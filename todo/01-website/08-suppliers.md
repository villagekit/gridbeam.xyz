# 08 — Suppliers page (replaces store)

**Status:** TODO

## Why
The legacy site sold parts directly via Stripe. The new site doesn't sell anything — instead it points visitors at suppliers who make compatible grid-beam hardware. The page is similar in shape (browse a list of items) but the data is suppliers (and their products), not a single supplier's catalog.

## What
- `app/suppliers/page.tsx` — list of suppliers, each with their offerings linked out
- (Optional) `app/suppliers/[supplierId]/page.tsx` — per-supplier detail page if there's enough info to warrant one

## Steps
- [ ] Decide data shape and storage:
  - **Option A**: Flat JSON / TypeScript file (`content/suppliers.ts`) with each supplier as an object: `{ id, name, country, website, offerings: [...] }`. Simple, no DB, easy to PR new suppliers.
  - **Option B**: MDX file per supplier under `content/suppliers/*.mdx`. Lets each supplier have a description page.
  - **Option C**: Database — overkill for the foreseeable future.
  - Recommend Option A or B. Default to A for v1.
- [ ] Initial empty state: if no suppliers signed up, show a clear message: "No suppliers yet — interested in becoming one? [Contact us]".
- [ ] Cards layout — each card shows supplier name, country/region, products offered, a "visit website" outbound link.
- [ ] Filter by region or category if the list ever grows.
- [ ] Mention "build your own" — link to designs catalog and stories about building beams (e.g. how-to-cut-grid-beams).
- [ ] Guidelines for suppliers: a small section explaining what makes hardware "grid-beam compatible" (40 mm grid, etc.). Could be its own MDX page, linked.
- [ ] Add a "How to be listed" anchor on the page or a separate `/suppliers/list-yours` page that just points to /contact.

## Notes
- The legacy store pages use `@villagekit-private/store` and `@villagekit-private/db` — both go away. We're not pulling Stripe or postgres into the new site.
- Initial supplier list will likely be empty or just include the original Grid Kit if they're still shipping (decision point for the user).
- Stream 04 task 05 produces the actual content (which suppliers, what they sell).

## Depends on
- [./02-layout-and-nav.md](./02-layout-and-nav.md)
- [../04-content/05-suppliers-content.md](../04-content/05-suppliers-content.md)
