---
title: OverlayMessage component dropped, the inactive overlay inlined in ItemCard
status: regression
route: /designs
axis: code
kind: removed
---
## Legacy

`apps/gridkit/components/overlay-message.tsx:1-38` a standalone `OverlayMessage`, used by `components/catalogue/item.tsx:46` with the catalogue-level `inactiveItemMessage`.

## Current

`app/_components/catalogue/ItemCard.tsx:52-67` a plain `Box` keyed on the per-item `active`/`inactiveMessage` (`types.ts:10-11`). Dead on this route on both sides: every design is active.

## Verdict

## Log
