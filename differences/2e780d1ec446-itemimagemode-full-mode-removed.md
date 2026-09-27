---
title: itemImageMode full mode removed
status: fixed
route: /designs
axis: code
kind: removed
---
## Legacy

`apps/gridkit/context/catalogue.ts:32,81` `itemImageMode?: 'hover-card' | 'full'` and `components/catalogue/item.tsx:47-82` the `full` branch (rounded, shadowed, `objectFit: cover`, `.catalogue-item-image` focus-within outline).

## Current

`app/_components/catalogue/ItemCard.tsx:29-68` always the hover-card branch; no prop, no `full` styling.

## Verdict

plan e22f84fa6e1a

## Log
