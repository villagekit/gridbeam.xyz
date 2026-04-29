# 01 — Rebrand copy audit (gridkit.nz → gridbeam.xyz)

**Status:** DONE

## Why
The legacy site's copy is full of company-specific framing: "Buy a Grid Kit", "Order from us", "Made in NZ", references to specific products as "the kit". The new site is community/educational — every line of copy needs to be evaluated.

## What
A spreadsheet (or markdown table) with one row per page or content block, capturing: legacy copy → proposed new copy → status. Used to drive every Stream 01 page rewrite.

## Steps
- [x] Inventory every copy-bearing surface in `node-modules/apps/gridkit/`:
  - Hero copy on the homepage (`pages/index.tsx`)
  - About page sections (`pages/about.tsx`)
  - FAQ Q&As (`pages/faq.tsx`)
  - All 5 MDX stories *(actually 6 — both newsletters + 4 guides; audit covers all)*
  - Tools-and-resources cards (`pages/tools-and-resources.tsx`)
  - Footer text (`@villagekit-private/ui-brand` Footer + legacy app's footer customisation)
  - Subscribe / contact CTAs
  - Page titles + meta descriptions for SEO
- [x] For each, note one of:
  - **KEEP** — content is already framed correctly
  - **TWEAK** — minor rewording to drop startup framing
  - **REWRITE** — needs full new copy
  - **DROP** — startup-specific, no replacement needed
- [x] Pay particular attention to:
  - "Grid Kit" mentions → mostly become "grid beam" (the system) or "Grid Kit" (the historical company; only in stories about its history)
  - "We" / "us" / "our team" → community language ("the community", "you can", "anyone can")
  - Pricing / shipping / order language → "find a supplier" / "build your own"
  - "Made in NZ" → drop or generalise
- [x] Output: `04-content/01-rebrand-copy/audit.md` (a sub-doc under this task, since the table will be long).
- [x] Once the audit exists, individual Stream 01 page tasks can pull from it.

## Notes
- Don't try to do the rewrite *and* the audit in one step — the audit's value is the bird's-eye view. Rewrites can be one-by-one as pages are built.
- Ask: would this copy make sense if the reader had never heard of the dead startup? If not, rewrite.
- First-pass audit complete (`./01-rebrand-copy/audit.md`). Six items flagged for Mikey at the bottom of the audit (testimonials reuse, active socials, forum hosting, launch banner, logo decision, sustainability stats freshness). Decisions resolve into the audit, not into separate tasks.
- Spec facts (beam profile, hole diameter, hole spacing, bolt sizes) flagged for cross-check against `gridkit/parts/gridbeam` and `gridkit/parts/fastener` before About/Designs pages ship.

## Depends on
None.
