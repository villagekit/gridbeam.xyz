# 03 — Unsourced FAQ claims + supplier-page promises

**Status:** DONE

## Why

Two flavors of the same disease: copy asserting things nobody verified or agreed to.

**FAQ states invented specifics as fact** (`app/faq/page.tsx`, lines as of 2026-08-03):
- `:74` — "most often pine for furniture … stainless steel for fasteners". The only documented legacy material is untreated NZ-grown **Douglas fir** (`../node-modules/apps/gridkit/pages/index.tsx:287`); "pine" and "stainless" appear in no source.
- `:66` — "a 4 mm hex key" — plausible for M6 furniture bolts, but stated as fact with no source.
- `:79` — "Tri-joints distribute load across three bolts, so failures are rare" — an invented engineering claim.
- `:175-176` — "The list is regional; pick the entry closest to you" — the suppliers page has no regional grouping/filter (deferred until ≥5 suppliers per `todo/01-website/08-suppliers.md:20`) and lists exactly 2 entries.
- (For calibration: the EPA furniture-waste stat at `:151-155` was checked against EPA 2018 figures and is fine — leave it.)

**Suppliers page ships process commitments Mikey never confirmed** (`app/suppliers/page.tsx`):
- `:146-158` — "we'll reach out before changing your listing", "a sample part you can ship for fit-check", "We'll respond within a week." The source draft (`todo/04-content/05-suppliers-content/draft.md:102`) explicitly lists the sample-part bar as an OPEN QUESTION ("Reasonable, or too high a bar?"), yet it shipped verbatim. A one-week SLA on a volunteer-run site is a promise to third parties.
- `:65` — "most listed suppliers ship 40 mm hardware" — arithmetically false: 1 of the 2 listed suppliers is 40 mm.

## What

FAQ claims either verified (with a source noted in this task) or rewritten to what's actually known; supplier commitments replaced with wording Mikey has explicitly approved; no quantitative claims that the data on the page contradicts.

## Steps

- [x] Re-read the current `app/faq/page.tsx` and `app/suppliers/page.tsx` — line numbers and copy may have moved; confirm each claim above still exists before touching it.
- [x] FAQ materials claim: **the finding was wrong** — pine and stainless are both sourced (see Notes). Rewritten anyway to attribute rather than generalise, and the unsourced "aluminium and steel beams exist for load-bearing builds" dropped.
- [x] FAQ hex-key claim: **verified sourced** (see Notes). Kept, and linked to the furniture-bolts guide as legacy did.
- [x] FAQ tri-joint claim: dropped "over-engineered / failures are rare"; reworded around repairability and the rigid-corner-in-three-axes point from the about page.
- [x] FAQ "the list is regional": rewritten to describe what each listing actually shows.
- [x] **ASK MIKEY** — asked 2026-08-03. Decisions: (a) drop the "reach out before changing your listing" sentence entirely; (b) no fit-check bar at all, sample part *or* photos — "we just need to say 'Contact us to be added as a supplier'"; (c) no response-time commitment.
- [x] Fix "most listed suppliers ship 40 mm" — replaced with supplier-count-independent copy.
- [x] Update `todo/04-content/05-suppliers-content/draft.md` to record the decisions.

## Notes

### Sources found (the "unsourced" premise was partly wrong)

Legacy checkout at `fce357d2` (= `origin/main`):

- **Pine + stainless steel** — `apps/gridkit/pages/faq.tsx:73`: "We use locally sourced, untreated old pine timber and high-quality stainless steel fasteners." Corroborated by `pages/index.tsx:324` ("Made from untreated New Zealand old pine"). The review's counter-claim that Douglas fir was the only documented material came from misreading `pages/index.tsx:332` — a decorative forest photo (`douglas-fir-forest_etzvle`, `alt="Forest of douglas fir trees"`), not a beam-material statement. **No Douglas fir claim exists anywhere in the legacy copy.**
- **Plywood panels** — `pages/about.tsx:79`, `pages/stories/whats-a-grid-unit.mdx:113`.
- **4 mm hex key** — `pages/faq.tsx:52`, and decisively `pages/stories/how-to-furniture-bolts.mdx:90`: "All Grid Kit furniture bolts use a 4mm hex key." Also `building-with-grid-kit.mdx:49`. No datasheet needed.
- **Tri-joint** — legacy has the photo (`pages/about.tsx:102`) and the caption "When three beams are joined with three connectors a strong connection is created" (`:108-114`). **No load-distribution or failure-rate claim.** The "distribute load across three bolts, so failures are rare" sentence was invented by the rebuild; dropped.

What *was* wrong with the materials answer is subtler than "unsourced": legacy states these as one supplier's product choices ("we use…"), while the rebuild generalised them to the whole "40 mm grid-beam family" as what is "most often" used. The rewrite attributes instead of generalising, and drops "Aluminium and steel beams exist for load-bearing builds", which has no source anywhere.

### Other

- Overlap: the FAQ "Developed by Phil Jergenson" attribution line is handled by `./01-phelps-history.md`.
- Principle from CLAUDE.md: don't guess on load-bearing choices; a task file's recommendation is not authorization.
- The suppliers "How to be listed" section now carries no commitments to third parties at all — worth keeping that way as suppliers are added.

## Depends on

- `./01-phelps-history.md` (touches overlapping FAQ lines; land that first to avoid conflicts)

## Files

- `app/faq/page.tsx`, `app/suppliers/page.tsx`, `content/suppliers.ts`
- `todo/04-content/05-suppliers-content/draft.md`, `todo/01-website/08-suppliers.md`
