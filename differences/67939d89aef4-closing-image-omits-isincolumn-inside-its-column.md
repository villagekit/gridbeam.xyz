---
title: Closing image omits isInColumn inside its column
status: regression
route: /stories/2022-newsletter
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/stories/2022-newsletter.mdx:577-585` the team-robot `StoryImage` inside `<StoryColumn index={0}>` gets `isInColumn` from the column context (`apps/gridkit/components/story/story-image.tsx:16`).

## Current

`content/stories/2022-newsletter.mdx:536-544` the same image inside `<StoryColumn index={0}>` passes no `isInColumn`, so it gets the full-width `sizes` `'(min-width: 1024px) 1024px, 100vw'` (`app/_components/story/StoryImage.tsx:33`) where every other in-column image on the route passes it (`:157,169,210,222,234,246,412`).

## Verdict

## Log
