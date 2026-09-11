---
title: "Search input accessible name: Search to Search designs"
status: open
route: /designs
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/search-bar.tsx:28` `aria-label="Search"` on the `role="search"` wrapper; the input itself is named by its placeholder (`audit/designs/dom/legacy.aria.yaml`: `search "Search"` > `searchbox "Search..."`).

## Current

`app/_components/catalogue/Catalogue.tsx:394` `aria-label={`Search ${itemLabel}`}` on the input, rendered `Search designs` (`audit/designs/dom/current.aria.yaml`: `searchbox "Search designs"`).

## Verdict

## Log

- 2026-09-12: The dropped `role="search"` landmark has its own accessibility item.
