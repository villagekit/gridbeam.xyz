---
title: "Story components renamed: story-*.tsx to Story*.tsx under app/_components/story"
status: regression
route: /stories/whats-a-grid-unit
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/story/{index.ts,mdx.tsx,story-column.tsx,story-image.tsx,story-image-carousel.tsx,story-image-grid.tsx,story-row.tsx,story-section.tsx,story-video.tsx}`, imported as `@/components/story` (`apps/gridkit/pages/stories/whats-a-grid-unit.mdx:1`).

## Current

`app/_components/story/{index.ts,StoryColumn.tsx,StoryEditorialNote.tsx,StoryImage.tsx,StoryImageGrid.tsx,StoryRow.tsx,StorySection.tsx,StoryVideo.tsx}`, imported as `@/app/_components/story` (`content/stories/whats-a-grid-unit.mdx:3-9`); no `mdx.tsx`, no carousel.

## Verdict

## Log

- 2026-09-12: Story page template; filed where first met.

- 2026-09-12: Story page template: shared by the six story routes (/stories/whats-a-grid-unit, /stories/how-to-cut-grid-beams, /stories/how-to-furniture-bolts, /stories/building-with-grid-kit, /stories/2021-winter-newsletter, /stories/2022-newsletter); filed here where first met.
