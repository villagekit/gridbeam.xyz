---
title: "StoryImageGrid: breakpoint row and column counts over RasterImage to a SimpleGrid of StoryImage with columns and ariaLabel"
status: regression
route: /stories/whats-a-grid-unit
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/story/story-image-grid.tsx:14-18,23,35-53` props `images`, `sizes: { base: { numRows, numColumns }, md: {...} }`, `aspectRatio`; `useBreakpointValue(sizes)` (throws when unset); no `ariaLabel` prop, so the one the MDX passes (`apps/gridkit/pages/stories/whats-a-grid-unit.mdx:134`) is dropped. Call: `:131-134` `sizes={{ base: { numRows: 3, numColumns: 2 }, md: { numRows: 2, numColumns: 3 } }} aspectRatio='1/1'`.

## Current

`app/_components/story/StoryImageGrid.tsx:14-40` props `images`, `ariaLabel` (required), `columns = { base: 2, md: 3 }`, `aspectRatio = 'square'`; `<section aria-label>` around the grid. Call: `content/stories/whats-a-grid-unit.mdx:134-137` `columns={{ base: 2, md: 3 }} aspectRatio='square'`.

## Verdict

## Log

- 2026-09-12: Story page template; filed where first met.

- 2026-09-12: Story page template: shared by the six story routes (/stories/whats-a-grid-unit, /stories/how-to-cut-grid-beams, /stories/how-to-furniture-bolts, /stories/building-with-grid-kit, /stories/2021-winter-newsletter, /stories/2022-newsletter); filed here where first met.
