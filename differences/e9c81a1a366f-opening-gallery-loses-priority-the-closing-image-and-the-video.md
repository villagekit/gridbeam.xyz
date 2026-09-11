---
title: Opening gallery loses its priority hint
status: regression
route: /stories/2022-newsletter
axis: code
kind: removed
---
## Legacy

`apps/gridkit/pages/stories/2022-newsletter.mdx:47` `priority` on the Team-trip carousel, forwarded to the first slide's image (`apps/gridkit/components/image-carousel.tsx:20,24,78`).

## Current

`app/_components/story/StoryImageGrid.tsx:14-19` has no `priority` prop, so `content/stories/2022-newsletter.mdx:45-62` cannot set one on the opening, above-the-fold gallery.

## Verdict

## Log
