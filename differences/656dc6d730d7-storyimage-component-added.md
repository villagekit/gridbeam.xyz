---
title: StoryImage component added
status: open
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
