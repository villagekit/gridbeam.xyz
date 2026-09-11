---
title: "Heading and description: left aligned to centered below lg"
status: regression
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue-item/catalogue-item.tsx:84,89` no `textAlign` (`audit/designs__bed-frame/375/legacy.png`).

## Current

`app/_components/catalogue/CatalogueItem.tsx:75,79` `textAlign={{ base: 'center', lg: 'left' }}` (`audit/designs__bed-frame/375/current.png`).

## Verdict

## Log

- 2026-09-12: Template.
