---
title: "Filter and sort options: Enter-only to Enter and Space activation"
status: fixed
route: /designs
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/option.tsx:20-27` `handleKeyDown` acts on `ev.key === 'Enter'` only.

## Current

`app/_components/catalogue/Catalogue.tsx:336-341` acts on `'Enter'` and `' '` with `preventDefault()`.

## Verdict

plan 8417428fd88a

## Log
