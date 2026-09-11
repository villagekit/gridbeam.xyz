---
title: prefers-reduced-motion honoured on the hero carousel and the typing section
status: open
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
