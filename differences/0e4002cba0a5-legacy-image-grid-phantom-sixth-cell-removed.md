---
title: Legacy image grid phantom sixth cell removed
status: regression
route: /stories/how-to-furniture-bolts
axis: accessibility
kind: removed
---
## Legacy

`apps/gridkit/pages/stories/how-to-furniture-bolts.mdx:117-118` `sizes={{ base: { numRows: 3, numColumns: 2 }, md: { numRows: 2, numColumns: 3 } }}` for five images: `apps/gridkit/components/story/story-image-grid.tsx:40-48` renders `images[5]`, which is undefined, as a `RasterImage` with no src or alt: an unnamed `img` after the five, `audit/stories__how-to-furniture-bolts/dom/legacy.aria.yaml:71`.

## Current

`content/stories/how-to-furniture-bolts.mdx:120-122` `columns={{ base: 2, md: 3 }}`: exactly the five images, `audit/stories__how-to-furniture-bolts/dom/current.aria.yaml:115-119`.

## Verdict

## Log

- 2026-09-12: A legacy rendering bug; a fix plan should ask the operator (rule 5) rather than restore the empty cell.
