---
title: Search landmark role search Search removed
status: regression
route: /designs
axis: accessibility
kind: removed
---
## Legacy

`apps/gridkit/components/catalogue/search-bar.tsx:23-29` `<InputGroup id="designs-menu-search" role="search" aria-label="Search" size="lg">` (`audit/designs/dom/legacy.aria.yaml`: `search "Search"` > `searchbox`).

## Current

`app/_components/catalogue/Catalogue.tsx:384-396` a `Box position="relative"` with a bare `<Input type="search">`; no element carries `role="search"` (`audit/designs/dom/current.aria.yaml`: `searchbox "Search designs"` directly under `main`).

## Verdict

## Log
