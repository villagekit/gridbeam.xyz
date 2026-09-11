---
title: Hero carousel box resizes with each slide's aspect ratio
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/image-carousel.tsx:36-39` no `aspectRatio` for the hero (no `slideSx`); the library's slider fixes the height.

## Current

`app/_components/landing/ImageCarousel.tsx:83,99` `aspectRatio = width / height` of the current slide; the slides mix 3:2 and 4:3, so the box changes height as it cycles. From code.

## Verdict

## Log
