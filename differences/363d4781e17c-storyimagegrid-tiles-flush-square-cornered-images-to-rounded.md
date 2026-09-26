---
title: "StoryImageGrid tiles: flush square-cornered images to rounded, shadowed tiles with a gap"
status: fixed
route: /stories/whats-a-grid-unit
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/story/story-image-grid.tsx:36-53` nested `VStack`/`HStack` of bare `RasterImage`s with `flex: '1 1 0'`, no radius, shadow or gap; the "Made With The Grid" tiles touch with square corners in `audit/stories__whats-a-grid-unit/1280/legacy.png`, likewise the "What Sizes To Use" grid in `audit/stories__how-to-furniture-bolts/1280/legacy.png` at the images' native ratio.

## Current

`app/_components/story/StoryImageGrid.tsx:21-40` `<SimpleGrid gap="4">` of `StoryImage` (`app/_components/story/StoryImage.tsx:39-41` `borderRadius="xl" boxShadow="md"`), cropped to the grid's `aspectRatio` (`'square'` by default; `'standard'` on furniture-bolts, `content/stories/how-to-furniture-bolts.mdx:120-122`); `audit/stories__whats-a-grid-unit/1280/current.png`, `audit/stories__how-to-furniture-bolts/1280/current.png`.

## Verdict

plan 373320c9

## Log

- 2026-09-12: Story page template; visible on /stories/whats-a-grid-unit and /stories/how-to-furniture-bolts, where legacy used its grid; on the two newsletters the grid replaces a carousel (see those routes).

- 2026-09-12: Story page template: shared by the six story routes (/stories/whats-a-grid-unit, /stories/how-to-cut-grid-beams, /stories/how-to-furniture-bolts, /stories/building-with-grid-kit, /stories/2021-winter-newsletter, /stories/2022-newsletter); filed here where first met.

- 2026-09-26: Correction to the Legacy text by the components slice [[373320c95e55]]: the live legacy site's tiles do not touch. Legacy's VStack of HStacks takes Chakra v2's default stack spacing, 8px, and the probe of 2026-09-26 reads the Made With The Grid tiles at x 144, 477.33 and 810.67 with a width of 325.33 at 1280 (8px apart) and the two rows at y 3616.73 and 3950.08 (8px apart); Chakra v3's HStack and VStack default to the same 0.5rem gap (node_modules/@chakra-ui/react/dist/esm/components/stack/stack.js:20), so the line-for-line port reads 32, 354.66 and 677.33 at a width of 314.66 at 1280, the same 8px, the narrower column being the shell's container padding [[5c1af396cc2e]].
