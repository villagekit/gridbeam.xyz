---
title: "Story videos: a silent autoplaying loop to a paused player with controls"
status: regression
route: /stories/2021-winter-newsletter
axis: interaction
kind: changed
---
## Legacy

`apps/gridkit/pages/stories/2021-winter-newsletter.mdx:66,79,187` three `<StoryVideo>`; `apps/gridkit/components/story/story-video.tsx:21-32` over `packages/ui-media/src/video.tsx:35-65` `<Box as="video" autoPlay loop muted playsInline poster>` toggled by click, no `controls`; mid-motion frames in `audit/stories__2021-winter-newsletter/1280/legacy.png`.

## Current

`content/stories/2021-winter-newsletter.mdx:65,78,178` the same three; `app/_components/story/StoryVideo.tsx:32-40` `<video controls preload="metadata" playsInline>`, no autoplay, loop, mute or poster; black frames with a control bar in `audit/stories__2021-winter-newsletter/1280/current.png`. `:178` passes `isInColumn`, which `StoryVideo.tsx:20-21` ignores.

## Verdict

## Log

- 2026-09-12: The component swap is shell b397b0deb1cc; this is the route's outcome.
