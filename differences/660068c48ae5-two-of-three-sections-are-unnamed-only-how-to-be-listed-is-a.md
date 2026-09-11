---
title: Two of three Sections are unnamed, only How to be listed is a region
status: open
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
