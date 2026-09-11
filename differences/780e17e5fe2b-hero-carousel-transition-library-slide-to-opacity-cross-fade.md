---
title: "Hero carousel transition: library slide to opacity cross-fade"
status: regression
route: /
axis: interaction
kind: changed
---
## Legacy

`apps/gridkit/components/image-carousel.tsx:44-72` `react-responsive-carousel` `Carousel` with `autoPlay`, `infiniteLoop`, `interval={4000}` and its default translate slide transition.

## Current

`app/_components/landing/ImageCarousel.tsx:104-124` `AnimatePresence` cross-fade, opacity 0 to 1 over 0.6s `easeOut`; the 4000ms interval matches (`:34`). From code.

## Verdict

## Log
