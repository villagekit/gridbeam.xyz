---
title: "Mobile preview: fixed 256 px tall to 4/3 with a 320/400 px minimum"
status: regression
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue-item/catalogue-item.tsx:99-102` mobile `height: 256, width: '100%'`, desktop `aspectRatio '4 / 3'`, `width '60%'` (`audit/designs__bed-frame/375/legacy.png`).

## Current

`app/_components/catalogue/CatalogueItem.tsx:97-100` `aspectRatio '4 / 3'` at every width, `minH={{ base: '320px', md: '400px' }}` (`audit/designs__bed-frame/375/current.png`, a taller box).

## Verdict

## Log

- 2026-09-12: Template.
