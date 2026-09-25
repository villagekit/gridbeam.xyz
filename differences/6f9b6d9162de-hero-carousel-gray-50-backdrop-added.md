---
title: "Hero carousel: gray.50 backdrop added"
status: regression
route: /
axis: visual
kind: added
---
## Legacy

`apps/gridkit/components/image-carousel.tsx:29-42` no background on the wrapper.

## Current

`app/_components/landing/ImageCarousel.tsx:97` `bg="gray.50"`, visible behind a loading or fading slide. From code.

## Verdict

## Log

- 2026-09-25: Regression (grilling Q4). No backdrop behind the slides, as legacy.
