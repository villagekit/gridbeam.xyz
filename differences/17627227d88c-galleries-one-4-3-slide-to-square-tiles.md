---
title: "Galleries: one 4:3 slide to square tiles"
status: regression
route: /stories/2021-winter-newsletter
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/story/story-image-carousel.tsx:22` `aspectRatio ?? '4 / 3'` (neither call passes one); one rounded, shadowed frame with a chevron and dots, `audit/stories__2021-winter-newsletter/1280/legacy.png`.

## Current

`app/_components/story/StoryImageGrid.tsx:22` `aspectRatio = 'square'` (neither call passes one); a 2x2 block and a 1x3 row of square tiles, `audit/stories__2021-winter-newsletter/1280/current.png`; stacked at 375.

## Verdict

## Log
