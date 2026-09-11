---
title: Gallery controls and cloned slides to named regions
status: regression
route: /stories/2022-newsletter
axis: accessibility
kind: changed
---
## Legacy

`audit/stories__2022-newsletter/dom/legacy.aria.yaml:31-369` twenty buttons named "previous slide / item" or "next slide / item" (indistinguishable across the ten galleries), 37 indicator icons named "slide item", and each gallery's first and last slide cloned, so the read order differs from the source order (`apps/gridkit/components/image-carousel.tsx:93-146`).

## Current

`audit/stories__2022-newsletter/dom/current.aria.yaml:107-297` one named `region` per gallery ("Team trip to the farm", "GridBot Hex", ...) holding its images once, in source order; no controls (`app/_components/story/StoryImageGrid.tsx:25`).

## Verdict

## Log

- 2026-09-12: The legacy names are the library's generic defaults; a fix plan should ask the operator (rule 5) before restoring them.
