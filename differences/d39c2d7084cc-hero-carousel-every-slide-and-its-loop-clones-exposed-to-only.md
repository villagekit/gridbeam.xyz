---
title: "Hero carousel: every slide and its loop clones exposed to only the current slide mounted"
status: regression
route: /
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/image-carousel.tsx:44-49` `infiniteLoop` with no per-slide `aria-hidden`; six `listitem`/`img` nodes for four slides in `audit/_root/dom/legacy.aria.yaml`, two of them clones.

## Current

`app/_components/landing/ImageCarousel.tsx:103-125` `AnimatePresence` mounts the current slide only; one `img` under the region in `audit/_root/dom/current.aria.yaml`.

## Verdict

## Log
