---
title: "Catalogue breakpoints: useIsMobile and useBreakpointValue to responsive style props"
status: regression
route: /designs
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/catalogue.tsx:1,27-37`, `filters.tsx:9`, `selector.tsx:20`, `results-count.tsx:9`, `list.tsx:45`, `layouts/catalogue.tsx:11-12` drive layout from `useIsMobile()` and `useBreakpointValue`.

## Current

`app/_components/catalogue/Catalogue.tsx:182,242` and `ItemCard.tsx` use `display`/`columns` objects only; both hooks are still exported by `@villagekit/ui@1.2.0` (`node_modules/@villagekit/ui/src/index.ts:106,126`).

## Verdict

## Log

- 2026-09-12: The `md` to `lg` breakpoint move is the interaction item on this route.
