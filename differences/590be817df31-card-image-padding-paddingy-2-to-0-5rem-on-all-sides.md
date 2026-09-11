---
title: "Card image padding: paddingY 2 to 0.5rem on all sides"
status: regression
route: /designs
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/item.tsx:55-61` the hover-card image has `paddingY: 2` only.

## Current

`app/_components/catalogue/ItemCard.tsx:34-37` `style={{ objectFit: 'contain', opacity, padding: '0.5rem' }}`.

## Verdict

## Log
