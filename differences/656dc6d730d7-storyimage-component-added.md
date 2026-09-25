---
title: StoryImage component added
status: regression
route: /
axis: code
kind: added
---
## Legacy

`apps/gridkit/components/stories/item.tsx:49-62` renders the cover with ui-media `Image` inline.

## Current

`app/_components/story/StoryImage.tsx:1-61` a `next/image` wrapper with an `aspectRatio` enum, `isInColumn` sizes and `priority`.

## Verdict

## Log

- 2026-09-12: Filed on `/` where first met; the stories ledger cites it.

- 2026-09-25: Regression (grilling Q15). Story covers render with the `@villagekit/ui` media `Image` inline, as legacy's `stories/item.tsx` does; the `StoryImage` wrapper goes. Not upgrade-forced: the component still ships in `@villagekit/ui`.
