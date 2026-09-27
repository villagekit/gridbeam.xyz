---
title: "Slider thumb press: Chakra v2's 1.15 scale over 0.2s removed"
status: upstream
route: /designs/bed-frame
axis: interaction
kind: removed
---
## Legacy

Chakra v2's slider thumb scales to 1.15 while pressed, over a 0.2s `transform` transition (the packed `@chakra-ui/theme` `dist/components` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`, `slider.js:85-91,108-109`): the pressed thumb reads `matrix(1.15, 0, 0, 1.15, 0, -12)` with `transition: transform 0.2s` (read by the Parity review of plan eba62a497d77 (its `scratchpad/review/p.mjs`, `legacy.json` and `current.json`) on the live `/designs/5-12-13-triangle-desk` and the page under the ui override, the `Custom` preset selected, at 1280).

## Current

Chakra v3's slider thumb writes no active scale and transitions `shadow` alone (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/slider.js:55-69`): the pressed thumb reads `matrix(1, 0, 0, 1, -12, 0)`, `transition: box-shadow 0.15s` (read by the Parity review of plan eba62a497d77 (its `scratchpad/review/p.mjs`, `legacy.json` and `current.json`) on the live `/designs/5-12-13-triangle-desk` and the page under the ui override, the `Custom` preset selected, at 1280). Read beside the width plan eba62a497d77 restores, hidden until then by the zero-width root; its ui recipe leaves it.

## Verdict

## Log

- 2026-09-27: Fixed in ../ui 47c6ffb (plan 402430831b29, the ui switch, slider and tabs recipes, Chakra v2 theme again), not pushed; seen on pnpm dev under the ui override, legacy and current readings saved in the plan scratchpad probe. Waits on the operator publish and the bump plan 99f2fe62c62f (decision 28c1a536).
