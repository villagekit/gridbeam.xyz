---
title: "GridBot Hex test drilling video: a silent autoplaying loop to a paused player with controls"
status: regression
route: /stories/2022-newsletter
axis: interaction
kind: changed
---
## Legacy

`apps/gridkit/pages/stories/2022-newsletter.mdx:155` `<StoryVideo ... aspectRatio="wide" title="GridBot Hex test drilling" />`; `packages/ui-media/src/video.tsx:35-65` `autoPlay loop muted playsInline poster`, click toggles play, no `controls`; a plain rounded frame in `audit/stories__2022-newsletter/1280/legacy.png`.

## Current

`content/stories/2022-newsletter.mdx:143` the same call plus `isInColumn`; `app/_components/story/StoryVideo.tsx:32-40` `<video controls preload="metadata" playsInline>`: a control bar reading 0:00, paused, in `audit/stories__2022-newsletter/1280/current.png`.

## Verdict

## Log

- 2026-09-12: The component swap is shell b397b0deb1cc; this is the route's outcome.
