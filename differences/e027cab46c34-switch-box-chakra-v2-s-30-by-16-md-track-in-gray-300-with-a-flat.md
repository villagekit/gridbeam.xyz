---
title: "Switch box: Chakra v2's 30 by 16 md track in gray.300 with a flat thumb to Chakra v3's 40 by 20 track in gray.200 with a shadowed thumb"
status: open
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

Chakra v2's switch theme at `md`: the track `1.875rem` wide and `sizes.4` tall (30 by 16) with `p: 0.5`, `gray.300` when unchecked, its colors fading over the `common` properties at `fast`, and a white thumb with no shadow (the packed `@chakra-ui/theme` `dist/components` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`, `switch.js:36-64,94-99`). The live `/designs/bed-frame` at 1280: the `Controls` track 30 by 16, `rgb(203, 213, 224)` unchecked, the thumb 16px, `box-shadow: none` (plan eba62a497d77's probe, the scratchpad's `legacy.json`).

## Current

Chakra v3's switch recipe at `md`: `--switch-width: sizes.10` and `--switch-height: sizes.5` (40 by 20), the `solid` control `bg.emphasized` (`gray.200` on the ui's palette) when unchecked, its background fading over `backgrounds`, and a white thumb with `boxShadow: sm` at `scale: 0.8` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/switch.js:46-56,82-100,141-146`). The page under the ui override at 1280: the `Controls` track 40 by 20, `rgb(226, 232, 240)` unchecked, the thumb 20px scaled 0.8 with `rgba(0, 0, 0, 0.05) 0px 1px 2px 0px` (`after.json`). Read beside the checked color plan eba62a497d77 restores; its ui recipe (`../ui/src/components/Switch.recipe.ts`) leaves the box as v3's. Every ui `Switch` reads it: the engine's `Controls` and parts switches, the Parts tab's switches, the planner's unit toggle (`sm` there, 32 by 16, against legacy's default `md`, the planner's own item `a2211c366c5f`).

## Verdict

## Log
