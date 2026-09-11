---
title: "Story rows: top-aligned columns to stretched rows with vertically centred columns"
status: regression
route: /stories/whats-a-grid-unit
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/story/story-row.tsx:22` `<Row ... spacing={[4, null, 12]}>` with no `alignItems`; `apps/gridkit/components/story/story-column.tsx:13` `<Column alignItems="center" spacing="4" sx={{ flex: 1 }}>` with no `justifyContent`: the "Base Units" text starts level with the image top, `audit/stories__whats-a-grid-unit/1280/legacy.png`.

## Current

`app/_components/story/StoryRow.tsx:18-23` `alignItems="stretch"`; `app/_components/story/StoryColumn.tsx:13` `justifyContent="center"`: the same text is centred against the image, `audit/stories__whats-a-grid-unit/1280/current.png`.

## Verdict

## Log

- 2026-09-12: Story page template, six routes; filed where first met.
