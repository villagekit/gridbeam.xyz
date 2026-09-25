---
title: "How to be listed paragraph: What compatible means"
status: regression
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:137-145` "What \"compatible\" means. Your beams (or panels, or fasteners) honour the 40 mm grid — 40 mm hole spacing, 8 mm hole diameter, M6 bolts. We're material-agnostic — wood, aluminium, recycled, anything that holds a bolt is fine." The lead-in is a bold `Span` with straight double quotes (`:138`); "40 mm grid" links to `/about` (`:140-142`); the `40&nbsp;mm` and `8&nbsp;mm` measures use non-breaking spaces (`:143`).

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q5). The "How to be listed" section is removed; the decision names no such section, and Contact is in the footer.
