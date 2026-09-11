---
title: "Image grids: an unnamed run of images to a named region"
status: open
route: /stories/whats-a-grid-unit
axis: accessibility
kind: added
---
## Legacy

`audit/stories__whats-a-grid-unit/dom/legacy.aria.yaml:63-68` six `img`s with no group; `audit/stories__how-to-furniture-bolts/dom/legacy.aria.yaml:66-70` the same (the MDX `ariaLabel` is a dead prop, see the StoryImageGrid code item).

## Current

`app/_components/story/StoryImageGrid.tsx:25` `<section aria-label={ariaLabel}>`: `region "Carousel of things made with grid beam"` (`audit/stories__whats-a-grid-unit/dom/current.aria.yaml:107-113`), `region "Grid of common grid-beam connections"` (`audit/stories__how-to-furniture-bolts/dom/current.aria.yaml:114-119`), and one region per gallery on the two newsletters.

## Verdict

## Log

- 2026-09-12: Story page template; filed where first met.

- 2026-09-12: Story page template: shared by the six story routes (/stories/whats-a-grid-unit, /stories/how-to-cut-grid-beams, /stories/how-to-furniture-bolts, /stories/building-with-grid-kit, /stories/2021-winter-newsletter, /stories/2022-newsletter); filed here where first met.
