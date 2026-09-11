---
title: "Story components: spacing to gap, colorScheme to colorPalette, sx to style props"
status: sanctioned
route: /stories/whats-a-grid-unit
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/story/story-section.tsx:15-21` `colorScheme`, `spacing`; `story-column.tsx:13` `spacing`, `sx={{ flex: 1 }}`; `story-row.tsx:22` `spacing`.

## Current

`app/_components/story/StorySection.tsx:15-21` `colorPalette`, `gap`; `StoryColumn.tsx:13` `gap`, `flex="1"`; `StoryRow.tsx:22` `gap`.

## Verdict

rule: upgrade (Chakra v3 renames)

## Log

- 2026-09-12: Story page template; filed where first met.

- 2026-09-12: Story page template: shared by the six story routes (/stories/whats-a-grid-unit, /stories/how-to-cut-grid-beams, /stories/how-to-furniture-bolts, /stories/building-with-grid-kit, /stories/2021-winter-newsletter, /stories/2022-newsletter); filed here where first met.
