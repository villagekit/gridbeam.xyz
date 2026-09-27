---
title: "Slider cursor: Chakra v2's pointer on the root and thumb to auto"
status: open
route: /designs/bed-frame
axis: interaction
kind: changed
---
## Legacy

Chakra v2's slider container wrote `cursor: pointer` (the packed `@chakra-ui/theme` `dist/components` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`, `slider.js:38`), inherited by the thumb: the root and the thumb read `cursor: pointer` (read by the Parity review of plan eba62a497d77 (its `scratchpad/review/p.mjs`, `legacy.json` and `current.json`) on the live `/designs/5-12-13-triangle-desk` and the page under the ui override, the `Custom` preset selected, at 1280).

## Current

Chakra v3's slider recipe writes no cursor (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/slider.js:8-70`): the root and the thumb read `cursor: auto` (read by the Parity review of plan eba62a497d77 (its `scratchpad/review/p.mjs`, `legacy.json` and `current.json`) on the live `/designs/5-12-13-triangle-desk` and the page under the ui override, the `Custom` preset selected, at 1280). Read beside the width plan eba62a497d77 restores, hidden until then by the zero-width root; its ui recipe leaves it.

## Verdict

## Log
