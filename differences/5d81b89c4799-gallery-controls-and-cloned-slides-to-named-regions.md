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

- 2026-09-26: Handed to the operator on the attended verdicts plan [[14be8f377b34]] at the split of the story pages record [[56e6eb197e6c]] (decision 40abdb2f222a), as the M1 note above asks. The components slice [[373320c95e55]] restores the ten carousels for [[2bb459b9f5db]], and the library's control names and cloned slides return with them, so the item closes with the slice unless a verdict lands first; the accessibility pass after M2 (note eeba2a65cee4) is where the names would be bettered. The state stays until the operator judges it.
