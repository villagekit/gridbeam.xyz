---
title: "Preview frame: dashed gray.50 HoverCard with a pointer cursor to a plain Box"
status: regression
route: /designs/bed-frame
axis: visual
kind: removed
---
## Legacy

`apps/gridkit/components/catalogue-item/catalogue-item.tsx:104-115` `<HoverCard isHoverable={false} sx={{ cursor: 'pointer', ... }}>` around the preview; `@villagekit/ui@0.9.0 src/components/HoverCard.tsx:34-51` gives `gray.50`, `gray.200` dashed 2 px border, `borderRadius xl` (`audit/designs__bed-frame/1280/legacy.png` and `current.png`).

## Current

`app/_components/catalogue/CatalogueItem.tsx:96-103` a plain `Box`; no border, no background, cursor `auto` (probe).

## Verdict

## Log

- 2026-09-12: Template.
