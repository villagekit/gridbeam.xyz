---
title: Image carousels to static grids (ten galleries)
status: regression
route: /stories/2022-newsletter
axis: interaction
kind: changed
---
## Legacy

`apps/gridkit/pages/stories/2022-newsletter.mdx` ten `<StoryImageCarousel>`: Team trip to the farm `:45-65` (2 slides, `priority`), GridBot Hex `:77-145` (9), Design catalogue updates `:193-213` (2), Kitchen unit `:280-299` (2), Record player shelving unit `:313-346` (4), Server rack `:358-377` (2), Hanging lights `:389-429` (5), Peacock truck `:453-493` (5), Kitchen island `:506-538` (4), New components `:550-569` (2); arrows, dots, swipe and infinite loop from `apps/gridkit/components/image-carousel.tsx:44-83`.

## Current

`content/stories/2022-newsletter.mdx` ten `<StoryImageGrid>` with every slide and alt kept: `:45-62` columns {1,2}, `:74-133` {2,3}, `:181-198` {1,2}, `:264-281` {1,2}, `:295-324` {2,2}, `:336-353` {1,2}, `:365-400` {2,3}, `:424-459` {2,3}, `:471-500` {2,2}, `:512-529` {1,2}; no controls.

## Verdict

## Log

- 2026-09-12: Note 526d5330's ImageCarousel finding on this route; the carousel rewrite itself is 081bb0ea7651 on `/`.
