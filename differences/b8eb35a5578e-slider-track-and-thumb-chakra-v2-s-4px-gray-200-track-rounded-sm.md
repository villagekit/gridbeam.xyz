---
title: "Slider track and thumb: Chakra v2's 4px gray.200 track, rounded sm, under a white thumb with the base shadow to Chakra v3's 8px translucent track, rounded full, under a thumb with a 2px dark border"
status: open
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

Chakra v2's slider theme at `md`: the track `sizes.1` tall (4px), `borderRadius: sm`, `gray.200`; the thumb white with `boxShadow: base` and a 1px transparent border (the packed `@chakra-ui/theme` `dist/components` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`, `slider.js:51-116,142-147`). The live `/designs/5-12-13-triangle-desk` at 1280 with the `Custom` preset: each track 4px tall, `rgb(226, 232, 240)`, radius 2px; each thumb 24px (the engine's `boxSize`), white, `rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px` (plan eba62a497d77's probe, the scratchpad's `legacy.json`).

## Current

Chakra v3's slider recipe at `md`: `--slider-track-size: sizes.2` (8px), the track `borderRadius: full`, the `outline` variant's track `bg.emphasized/72` with an inset shadow and its thumb `bg` with a 2px `colorPalette.solid` border and no shadow (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/slider.js:27-31,82-89,102-118`). The page under the ui override: each track 8px, `color(srgb 0.886275 0.909804 0.941176 / 0.72)`, radius 9999px; each thumb 24px, white, `2px solid rgb(23, 25, 35)`, `box-shadow: none` (`after.json`). Read on the desk, the page with number parameters that stands for the route as the parent item `80946bbc84ba` reads it, beside the width and range plan eba62a497d77 restores; its ui recipe (`../ui/src/components/Slider.recipe.ts`) leaves the track and thumb as v3's.

## Verdict

## Log
