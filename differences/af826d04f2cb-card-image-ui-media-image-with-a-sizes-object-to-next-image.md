---
title: "Card image: ui-media Image with a sizes object to next/image unoptimized with a static sizes string"
status: regression
route: /designs
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/item.tsx:1,49-62` `<Image {...image} sizes={{ base: ['full', 2], lg: ['8xl', 3] }} ...>` from `@villagekit-private/ui-media` (`packages/ui-media/src/image.tsx:111-120,162-203`), which resolves the object to a `sizes` attribute and serves optimized variants.

## Current

`app/_components/catalogue/ItemCard.tsx:10,31-38` `NextImage` with `fill`, `unoptimized` and `sizes="(min-width: 1280px) 22vw, ..."`; with `unoptimized` every viewport downloads the full PNG from `app/_lib/design-images.ts`.

## Verdict

## Log

- 2026-09-12: The home carousel's instance of the same swap is [[1501ee97ed24]].
