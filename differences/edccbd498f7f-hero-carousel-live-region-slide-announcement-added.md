---
title: "Hero carousel: live-region slide announcement added"
status: fixed
route: /
axis: accessibility
kind: added
---
## Legacy

`apps/gridkit/components/image-carousel.tsx:68` `showStatus={false}`; no `aria-live` on the route.

## Current

`app/_components/landing/ImageCarousel.tsx:127-129` `<VisuallyHidden aria-live="polite" aria-atomic="true">Slide {index + 1} of {slideCount}: {slide.alt}</VisuallyHidden>`; `text: "Slide 1 of 4: ..."` in `audit/_root/dom/current.aria.yaml`.

## Verdict

plan c92c235205f5

## Log

- 2026-09-25: Regression (grilling Q4). No live region, as legacy. Returns in the dedicated accessibility pass after M2 ([[eeba2a65cee4]]).
