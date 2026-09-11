---
title: "Guides filter chip palette: primary to accentB"
status: regression
route: /stories
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/stories/filters.tsx:9-12` `FilterCategoryColors = { ...StoryCategoryColors, all: 'accentB' }` with `apps/gridkit/stories.ts:29` `guide: 'primary'`, so the Guides chip's hover and selected shades are `primary`.

## Current

`app/stories/StoriesBrowser.tsx:24` `{ value: 'guide', label: 'Guides', palette: 'accentB' }`. From code.

## Verdict

## Log

- 2026-09-12: The card badge's matching swap is 7d1f5d0a8c9b on `/`; this is the filter chip, a separate component.
