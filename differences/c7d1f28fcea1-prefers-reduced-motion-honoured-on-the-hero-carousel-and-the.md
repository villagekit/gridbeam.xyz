---
title: prefers-reduced-motion honoured on the hero carousel and the typing section
status: regression
route: /
axis: interaction
kind: added
---
## Legacy

No reduced-motion handling in `apps/gridkit/pages/index.tsx`, `components/image-carousel.tsx`, `components/carousel.tsx` or `hooks/useDesignTypingEffect.tsx`.

## Current

`app/_components/landing/ImageCarousel.tsx:42-46` no autoplay and no cross-fade; `TypingDesignSection.tsx:28-39,110-117` typing paused, full label shown, no zoom. From code.

## Verdict

## Log

- 2026-09-25: Regression (grilling Q4). Legacy behaviour restored: the carousel and the typing effect animate regardless of the visitor's motion preference. Returns in the dedicated accessibility pass after M2 ([[eeba2a65cee4]]).

- 2026-09-26: The carousel half is done: app/_components/ImageCarousel.tsx (plan [[c92c235205f5]]) is legacy's react-responsive-carousel port with no useReducedMotion; autoplay and the slide transition run whatever the visitor's motion preference. The typing section's half stays; the design carousel slice [[60cca8519469]] closes the item.
