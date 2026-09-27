---
title: "Tab trigger transition: Chakra v2's common properties over 0.2s removed"
status: upstream
route: /designs/bed-frame
axis: interaction
kind: removed
---
## Legacy

Chakra v2's base tab wrote `transitionProperty: common` and `transitionDuration: normal` (the packed `@chakra-ui/theme` `dist/components` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`, `tabs.js:43-44`), so the 0.9.0 theme's `primary.700` hover fades in. The live `/designs/bed-frame` at 1280: each trigger `transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform` over `0.2s` `ease` (plan eba62a497d77's probe, the scratchpad's `residual-legacy.json`).

## Current

Chakra v3's base trigger writes no transition (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/tabs.js:33-52`), so the hover color snaps. The page under the ui override: `transition-property: all` over `0s` (`residual-current.json`). Read beside the variant plan eba62a497d77 restores; its ui recipe leaves it.

## Verdict

## Log

- 2026-09-27: Fixed in ../ui 47c6ffb (plan 402430831b29, the ui switch, slider and tabs recipes, Chakra v2 theme again), not pushed; seen on pnpm dev under the ui override, legacy and current readings saved in the plan scratchpad probe. Waits on the operator publish and the bump plan 99f2fe62c62f (decision 28c1a536).
