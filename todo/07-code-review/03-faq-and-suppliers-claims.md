# 03 — Unsourced FAQ claims + supplier-page promises

**Status:** TODO (decision-gated — needs Mikey for the suppliers section)

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

- [ ] Re-read the current `app/faq/page.tsx` and `app/suppliers/page.tsx` — line numbers and copy may have moved; confirm each claim above still exists before touching it.
- [ ] FAQ materials claim: either source it (the Jergensons' book discusses wood choices — if someone can check it) or rewrite to what's documented: legacy used untreated Douglas fir; other woods and metals are possible. Don't just swap one unsourced specific for another.
- [ ] FAQ hex-key claim: verify against the actual hardware (M6 furniture bolt spec — a 4 mm hex drive is standard for M6 barrel nuts/bolts but confirm against a supplier datasheet or the legacy store data in `../node-modules`) or drop the number.
- [ ] FAQ tri-joint claim: drop the "failures are rare" engineering assertion, or rewrite to the structural point that is defensible (a tri-joint makes a rigid corner in three axes — that phrasing already exists on the about page with a stated reason).
- [ ] FAQ "the list is regional": rewrite to match the actual page (a short list that links out; no regional filter yet).
- [ ] **ASK MIKEY** (do not decide): (a) keep/soften/drop the "reach out before changing your listing" promise; (b) is the sample-part fit-check bar wanted; (c) is any response-time commitment wanted at all. Present the current wording and 1-2 softer alternatives.
- [ ] Fix "most listed suppliers ship 40 mm" — either state the actual split or write supplier-count-independent copy ("listings note which grid size each supplier stocks"), so it doesn't rot as entries change.
- [ ] Update `todo/04-content/05-suppliers-content/draft.md` to record the decisions.

## Notes

- Overlap: the FAQ "Developed by Phil Jergenson" attribution line is handled by `./01-phelps-history.md`.
- Wiggle room: some FAQ specifics may be verifiable — verification is a fine outcome; the bug is *unsourced*, not *wrong*. Record sources here when found.
- Principle from CLAUDE.md: don't guess on load-bearing choices; a task file's recommendation is not authorization.

## Depends on

- `./01-phelps-history.md` (touches overlapping FAQ lines; land that first to avoid conflicts)

## Files

- `app/faq/page.tsx`, `app/suppliers/page.tsx`, `content/suppliers.ts`
- `todo/04-content/05-suppliers-content/draft.md`, `todo/01-website/08-suppliers.md`
