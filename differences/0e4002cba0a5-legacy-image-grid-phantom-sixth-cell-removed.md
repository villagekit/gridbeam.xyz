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

- 2026-09-26: Handed to the operator on the attended verdicts plan [[14be8f377b34]] at the split of the story pages record [[56e6eb197e6c]] (decision 40abdb2f222a), as the M1 note above asks. The components slice [[373320c95e55]] ports legacy's grid line for line, so the sixth cell returns (Next 15.5 renders an image with no src as unoptimized without throwing, get-img-props.js:276-280, and logs the missing src in development) and the item closes with it unless a verdict lands first. The state stays until the operator judges it.
