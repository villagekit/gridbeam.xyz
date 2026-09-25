---
title: "Empty state paragraph: Build your own"
status: regression
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:102-109` "Build your own. A drill press and a jig is enough to mill beams in your own workshop. The How to mark and cut grid beams story walks through the basics." "Build your own." is a bold `Span` (`:103`); "How to mark and cut grid beams" links to `/stories/how-to-cut-grid-beams` (`:105-107`). Unrendered today.

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q6). The unreachable empty-state branch is removed with its text.
