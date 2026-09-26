---
title: "StoryVideo: isInColumn accepted and ignored"
status: fixed
route: /stories/2021-winter-newsletter
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/story/story-video.tsx:5-19` `isInColumn` sets the column `sizes` on the ui-mdx `Video`.

## Current

`app/_components/story/StoryVideo.tsx:11,20-21` the prop is in the type and never read; `content/stories/2022-newsletter.mdx:143` and `content/stories/2021-winter-newsletter.mdx:178` pass it to no effect.

## Verdict

plan 373320c9

## Log

- 2026-09-12: Story page template; filed where first met.

- 2026-09-12: Route corrected after review: the first story route in the plan order that renders a StoryVideo; also holds on /stories/2022-newsletter.

- 2026-09-26: From the ui mdx and media slice [[bc0407533650]], found at its Parity review: the Legacy section is wrong. apps/gridkit/components/story/story-video.tsx:11-19 at fce357d builds extraProps from isInColumn and never spreads it (line 24 renders <Video aspectRatio="standard" {...rest} ...>), so legacy ignores the prop on a video too; only story-image.tsx:34 spreads it. On behavior the two sides agree; the story pages record judges the state (a port of legacy's shape keeps the unused prop, and the two content calls that pass it). The bump plan's video note ports StoryVideo without a spread for this reason.
