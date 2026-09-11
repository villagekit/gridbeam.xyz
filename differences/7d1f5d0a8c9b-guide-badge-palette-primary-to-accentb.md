---
title: "Guide badge palette: primary to accentB"
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/stories.ts:27-32` `StoryCategoryColors = { guide: 'primary', inspiration: 'purple', newsletter: 'accentA' }`; `apps/gridkit/components/stories/item.tsx:76-83` `backgroundColor: primary.100`, `fontWeight: 'normal'`, `fontSize: 'sm'`.

## Current

`app/_components/StoryCard.tsx:28-32` `categoryPalettes = { guide: 'accentB', newsletter: 'accentA', inspiration: 'purple' }`, `<Badge colorPalette={palette} variant="subtle">`.

## Verdict

## Log

- 2026-09-12: A `StoryCard` difference, filed on `/` where first met; the stories ledger cites it.
