---
title: "Galleries: one 4:3 slide to square tiles"
status: regression
route: /stories/2022-newsletter
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/story/story-image-carousel.tsx:22` `aspectRatio ?? '4 / 3'` (no call passes one); one rounded, shadowed frame per gallery with a chevron and pink dots, `audit/stories__2022-newsletter/1280/legacy.png`.

## Current

`app/_components/story/StoryImageGrid.tsx:22` `aspectRatio = 'square'` (no call passes one); two to nine square tiles per gallery with a gap, `audit/stories__2022-newsletter/1280/current.png`.

## Verdict

## Log
