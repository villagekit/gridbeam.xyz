---
title: "Empty state paragraph: Adapt t-slot"
status: regression
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:110-114` "Adapt t-slot. 80/20-style aluminium extrusion isn't directly grid-beam-compatible (different profile, different fastener system) but it's the closest off-the-shelf alternative if you don't want to mill your own." "Adapt t-slot." is a bold `Span` (`:111`). Unrendered today.

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q6). The unreachable empty-state branch is removed with its text.
