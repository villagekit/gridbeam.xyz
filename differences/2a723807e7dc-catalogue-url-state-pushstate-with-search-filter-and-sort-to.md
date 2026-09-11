---
title: "Catalogue URL state: pushState with search, filter and sort to replaceState with q, f and s"
status: regression
route: /designs
axis: interaction
kind: changed
---
## Legacy

`apps/gridkit/context/catalogue.ts:90-98` `useQueryParams` with keys `search`, `filter`, `sort` and sort values `name`/`nameReverse` (`:60-63`); each change pushes a history entry, so Back steps through the catalogue's states (probe: `history.length` grows by 1 per search commit and per filter click).

## Current

`app/_components/catalogue/Catalogue.tsx:37-39` `q`, `f`, `s`, sort values `name-asc`/`name-desc` (`app/_components/catalogue/types.ts:14-17`), written by `replaceUrl` (`app/_lib/url-state.ts:18`, `replaceState`); Back leaves `/designs` (probe: `history.length` unchanged).

## Verdict

## Log

- 2026-09-12: The helper itself is the shell item [[43c1babc2051]]; this is the catalogue's own params and history behaviour.
