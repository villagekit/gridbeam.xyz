---
title: "Empty state line 1: We couldn't find any designs that match your search criteria to We couldn’t find any designs that match your search."
status: open
route: /designs
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/list.tsx:58` `We couldn&apos;t find any {itemLabel} that match your search criteria` (straight apostrophe, no period).

## Current

`app/_components/catalogue/Catalogue.tsx:519` `We couldn’t find any {itemLabel} that match your search.` (curly apostrophe, period).

## Verdict

## Log

- 2026-09-12: Note [[526d5330ef4e]]: the catalogue empty-state rewrite holds; this item and the two that follow are it.
