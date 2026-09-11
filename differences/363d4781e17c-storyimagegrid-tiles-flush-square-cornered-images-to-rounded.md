---
title: "StoryImageGrid tiles: flush square-cornered images to rounded, shadowed tiles with a gap"
status: regression
route: /stories/whats-a-grid-unit
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/story/story-image-grid.tsx:36-53` nested `VStack`/`HStack` of bare `RasterImage`s with `flex: '1 1 0'`, no radius, shadow or gap; the "Made With The Grid" tiles touch with square corners in `audit/stories__whats-a-grid-unit/1280/legacy.png`, likewise the "What Sizes To Use" grid in `audit/stories__how-to-furniture-bolts/1280/legacy.png` at the images' native ratio.

## Current

`app/_components/story/StoryImageGrid.tsx:21-40` `<SimpleGrid gap="4">` of `StoryImage` (`app/_components/story/StoryImage.tsx:39-41` `borderRadius="xl" boxShadow="md"`), cropped to the grid's `aspectRatio` (`'square'` by default; `'standard'` on furniture-bolts, `content/stories/how-to-furniture-bolts.mdx:120-122`); `audit/stories__whats-a-grid-unit/1280/current.png`, `audit/stories__how-to-furniture-bolts/1280/current.png`.

## Verdict

## Log

- 2026-09-12: Story page template; visible on /stories/whats-a-grid-unit and /stories/how-to-furniture-bolts, where legacy used its grid; on the two newsletters the grid replaces a carousel (see those routes).

- 2026-09-12: Story page template: shared by the six story routes (/stories/whats-a-grid-unit, /stories/how-to-cut-grid-beams, /stories/how-to-furniture-bolts, /stories/building-with-grid-kit, /stories/2021-winter-newsletter, /stories/2022-newsletter); filed here where first met.
