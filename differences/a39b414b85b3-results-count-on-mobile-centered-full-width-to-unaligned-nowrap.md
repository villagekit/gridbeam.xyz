---
title: "Results count on mobile: centered full width to unaligned nowrap"
status: regression
route: /designs
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/results-count.tsx:9,15` `sx={{ textAlign: 'center', width: '100%' }}` on mobile.

## Current

`app/_components/catalogue/Catalogue.tsx:427` no alignment, `whiteSpace="nowrap"`.

## Verdict

## Log
