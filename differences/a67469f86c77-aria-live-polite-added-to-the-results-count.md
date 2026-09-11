---
title: aria-live polite added to the results count
status: open
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
