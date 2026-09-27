---
title: "Search placeholder: Search... to Search designs…"
status: fixed
route: /designs
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/search-bar.tsx:31` `placeholder="Search..."` (three periods).

## Current

`app/_components/design/DesignsBrowser.tsx:26` `searchPlaceholder="Search designs…"` (an ellipsis), consumed by `app/_components/catalogue/Catalogue.tsx:220`.

## Verdict

plan bb15d0f99647

## Log

- 2026-09-25: Regression (designs grilling D2). Ships as "Search...", three periods.
