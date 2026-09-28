---
title: Two of three Sections are unnamed, only How to be listed is a region
status: regression
route: /suppliers
axis: accessibility
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:56` and `:74` `Section` with no `aria-label` or `aria-labelledby` render as bare `section` elements (not landmarks); `:121-127` `Section ... id="how-to-be-listed" aria-labelledby="how-to-be-listed-heading"` is the one `region "How to be listed"` in `audit/suppliers/dom/current.aria.yaml`. `@villagekit/ui@1.2.0 src/components/layouts/Section.tsx:41-43,96-97` forwards the props only when given.

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q7). Section naming follows legacy's markup for now and waits for the accessibility pass after M2 ([[eeba2a65cee4]]).

- 2026-09-28: Stale after plan `3ba33b316c3c`: the How to be listed section, the one region this item names, is gone (removed whole). Two bare Sections remain, neither a landmark, so the item's substance (two of three Sections unnamed) still holds in reduced form; the page slice `f1e016a563d6` measures against the interim shape. Not a new difference, and not this slice's to fix.
