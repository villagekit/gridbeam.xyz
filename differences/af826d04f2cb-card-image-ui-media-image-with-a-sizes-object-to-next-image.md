---
title: "Card image: ui-media Image with a sizes object to next/image unoptimized with a static sizes string"
status: fixed
route: /designs
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/item.tsx:1,49-62` `<Image {...image} sizes={{ base: ['full', 2], lg: ['8xl', 3] }} ...>` from `@villagekit-private/ui-media` (`packages/ui-media/src/image.tsx:111-120,162-203`), which resolves the object to a `sizes` attribute and serves optimized variants.

## Current

`app/_components/catalogue/ItemCard.tsx:10,31-38` `NextImage` with `fill`, `unoptimized` and `sizes="(min-width: 1280px) 22vw, ..."`; with `unoptimized` every viewport downloads the full PNG from `app/_lib/design-images.ts`.

## Verdict

plan e22f84fa6e1a

## Log

- 2026-09-12: The home carousel's instance of the same swap is [[1501ee97ed24]].

- 2026-09-27: Closed by the card re-port (plan e22f84fa6e1a): the ui Image of 1.2.0 again with the design image object spread and legacy's sizes object (base 100% for full, [[fd48a49f469f]]) at app/_components/catalogue/Item.tsx:50-66 and :69-86. Its unoptimized half lives on [[2a0840f8087b]], the operator's item on the verdicts plan [[549ec777422c]]: the prop stays on both Image branches by default, so Next writes no srcset and no sizes attribute until that verdict.
