---
title: "StoryVideo: isInColumn accepted and ignored"
status: regression
route: /stories/2021-winter-newsletter
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/story/story-video.tsx:5-19` `isInColumn` sets the column `sizes` on the ui-mdx `Video`.

## Current

`app/_components/story/StoryVideo.tsx:11,20-21` the prop is in the type and never read; `content/stories/2022-newsletter.mdx:143` and `content/stories/2021-winter-newsletter.mdx:178` pass it to no effect.

## Verdict

## Log

- 2026-09-12: Story page template; filed where first met.

- 2026-09-12: Route corrected after review: the first story route in the plan order that renders a StoryVideo; also holds on /stories/2022-newsletter.
