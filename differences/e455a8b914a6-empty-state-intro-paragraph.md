---
title: Empty state intro paragraph
status: regression
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:94-100` "If you make or stock grid-beam-compatible hardware, get in touch — we'll add you. Until then, two paths:" "get in touch" links to `/contact` (`:96-97`). Unrendered today (see the empty state heading item).

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q6). The unreachable empty-state branch is removed with its text.
