---
title: aria-live polite added to the results count
status: regression
route: /designs
axis: accessibility
kind: added
---
## Legacy

`apps/gridkit/components/catalogue/results-count.tsx:12-19` a plain `Text`, no live region.

## Current

`app/_components/catalogue/Catalogue.tsx:427` `<Text ... aria-live="polite" whiteSpace="nowrap">`.

## Verdict

## Log

- 2026-09-25: Regression (designs grilling D3). Legacy's plain results count returns; the live region waits for the accessibility pass after M2 ([[eeba2a65cee4]]).
