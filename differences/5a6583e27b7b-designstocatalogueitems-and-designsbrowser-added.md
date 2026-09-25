---
title: designsToCatalogueItems and DesignsBrowser added
status: regression
route: /designs
axis: code
kind: added
---
## Legacy

`apps/gridkit/pages/designs/index.tsx:52-65` an inline `useMemo` maps designs to items (`active: true`, `categories: tags`); the page calls `<Catalogue>` itself (`:71-85`).

## Current

`app/_components/design/designs-to-catalogue.ts:27-37` a tested pure mapper that also drops `furniture` and sets a `description` no card reads (`ItemCard.tsx:22`); `app/_components/design/DesignsBrowser.tsx:1-29` a `'use client'` wrapper that derives options and items and renders `<Catalogue>`.

## Verdict

## Log

- 2026-09-25: Regression (designs grilling D4). Back to legacy's inline useMemo mapping in the page and a direct <Catalogue>; no mapper module or client wrapper.
