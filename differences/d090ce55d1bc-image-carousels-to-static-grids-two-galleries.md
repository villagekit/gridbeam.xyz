---
title: Image carousels to static grids (two galleries)
status: regression
route: /stories/2021-winter-newsletter
axis: interaction
kind: changed
---
## Legacy

`apps/gridkit/pages/stories/2021-winter-newsletter.mdx:91-125,137-163` `<StoryImageCarousel isInColumn ariaLabel="Grid beam out in the world" slides={[4]}>` and `ariaLabel="Grid beam furniture designs" slides={[3]}`; `apps/gridkit/components/story/story-image-carousel.tsx:1-27` over `apps/gridkit/components/image-carousel.tsx:44-83` (react-responsive-carousel: arrows, dot indicators, swipe, infinite loop, no autoplay); `audit/stories__2021-winter-newsletter/dom/legacy.aria.yaml:65-84,89-105`.

## Current

`content/stories/2021-winter-newsletter.mdx:90-119,131-154` `<StoryImageGrid columns={{ base: 2, md: 2 }} ...>` and `columns={{ base: 1, md: 3 }}`: every slide survives with its alt; the `orientation: 'portrait'` field on the compost-toilet slide is dropped; no controls (`audit/stories__2021-winter-newsletter/dom/current.aria.yaml:75-79,84-87`).

## Verdict

## Log

- 2026-09-12: Note 526d5330's ImageCarousel finding on this route; the carousel rewrite itself is 081bb0ea7651 on `/`, and the legacy `StoryImageCarousel` has no current counterpart.
