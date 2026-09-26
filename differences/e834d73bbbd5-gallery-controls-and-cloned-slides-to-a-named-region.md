---
title: Gallery controls and cloned slides to a named region
status: regression
route: /stories/2021-winter-newsletter
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/image-carousel.tsx:93-109` indicator icons all named "slide item", `:118-146` buttons "previous slide / item" and "next slide / item", `infiniteLoop` clones of the first and last slide in the DOM; `audit/stories__2021-winter-newsletter/dom/legacy.aria.yaml:65-84` six list items for four images plus six tab stops, `:89-105` five for three.

## Current

`app/_components/story/StoryImageGrid.tsx:25` `region "Grid beam out in the world"` with four images (`audit/stories__2021-winter-newsletter/dom/current.aria.yaml:75-79`) and `region "Grid beam furniture designs"` with three (`:84-87`); no controls.

## Verdict

## Log

- 2026-09-12: The legacy names are the library's generic defaults; a fix plan should ask the operator (rule 5) before restoring them.

- 2026-09-26: Handed to the operator on the attended verdicts plan [[14be8f377b34]] at the split of the story pages record [[56e6eb197e6c]] (decision 40abdb2f222a), as the M1 note above asks. The components slice [[373320c95e55]] restores the carousel for [[d090ce55d1bc]], and the library's control names and cloned slides return with it, so the item closes with the slice unless a verdict lands first; the accessibility pass after M2 (note eeba2a65cee4) is where the names would be bettered. The state stays until the operator judges it.
