# 08 — Suppliers page (replaces store)

**Status:** DONE

## Why
The legacy site sold parts directly via Stripe. The new site doesn't sell anything — instead it points visitors at suppliers who make compatible grid-beam hardware. The page is similar in shape (browse a list of items) but the data is suppliers (and their products), not a single supplier's catalog.

## What
- `app/suppliers/page.tsx` — list of suppliers, each with their offerings linked out
- (Optional) `app/suppliers/[supplierId]/page.tsx` — per-supplier detail page if there's enough info to warrant one

## Steps
- [x] Decide data shape and storage:
  - **Option A**: Flat JSON / TypeScript file (`content/suppliers.ts`) with each supplier as an object: `{ id, name, country, website, offerings: [...] }`. Simple, no DB, easy to PR new suppliers.
  - **Option B**: MDX file per supplier under `content/suppliers/*.mdx`. Lets each supplier have a description page.
  - **Option C**: Database — overkill for the foreseeable future.
  - **Chose Option A.** Schema lives at `content/suppliers.ts` matching the spec in `todo/04-content/05-suppliers-content/draft.md`.
- [x] Initial empty state: empty-state copy from the draft is in place — "None listed yet" + build-your-own + adapt-t-slot guidance.
- [x] Cards layout — `SupplierCard` component renders name, country, offerings as badges, compatibility note, optional editorial note, paused-state badge, and an external "Visit website" CTA.
- [-] Filter by region or category — *deferred until supplier count ≥ 5*. Per draft spec; revisit when list grows.
- [x] Mention "build your own" — empty state links to `/stories/how-to-cut-grid-beams` (will resolve once Stream 01 task 05 lands).
- [x] Guidelines for suppliers — "How to be listed" section embedded on the page covers compatibility spec, listing terms, and how to apply.
- [x] "How to be listed" anchor — section has `id="how-to-be-listed"`. CTA button links to `/contact` (no `?subject=` param: contact page surfaces an obfuscated `mailto:` only, so query strings have no effect — see open item #3 in `todo/04-content/05-suppliers-content/draft.md`).

## Notes
- The legacy store pages use `@villagekit-private/store` and `@villagekit-private/db` — both go away. We're not pulling Stripe or postgres into the new site.
- **Initial supplier list (per Mikey, 2026-04-30):**
  - `gridkit.nz` — 40 mm grid-beam hardware, Aotearoa New Zealand. Run independently by Mikey's ex-business-partner.
  - `gridbeamsupply.com` — Imperial profile (the OG grid beam, Ken Isaacs → Phil and Richard Jergenson lineage; this file previously said "~~Phelps~~", a fabricated name — see [../07-code-review/01-phelps-history.md](../07-code-review/01-phelps-history.md)), United States. Different geometry from this site's 40 mm focus; parts don't mix with 40 mm hardware. Page intro acknowledges this and each card flags its profile.
- Stream 04 task 05 produces additional content (more suppliers as they appear).
- `logoUrl` was dropped from the schema as dead code (no current logos). Add back as a one-line schema change when the first supplier provides one.

## Follow-ups
- When supplier count ≥ 5, add region + offering filters per draft spec.
- When first supplier provides a logo, restore `logoUrl?: string` on `Supplier` and render it on the card.
- Confirm gridbeam-compatible profile for `gridbeamsupply.com` cards — Mikey treats them as compatible-in-spirit; their site doesn't publish exact dimensions on product pages. Strong inference (Imperial-foot lengths + Jergenson lineage) is 1½″ × 1″ hole spacing.

## Depends on
- [./02-layout-and-nav.md](./02-layout-and-nav.md)
- [../04-content/05-suppliers-content.md](../04-content/05-suppliers-content.md)
