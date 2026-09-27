---
title: "Switch keyboard focus: Chakra v2's 2px outline shadow to Chakra v3's 2px gray.400 outline"
status: upstream
route: /designs/bed-frame
axis: accessibility
kind: changed
---
## Legacy

Chakra v2's switch track wrote `_focusVisible: { boxShadow: outline }` (the packed `@chakra-ui/theme` `dist/components` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`, `switch.js:49-51`), the theme's 2px `outlineColor` shadow: the `Controls` track with its input focused by keyboard reads `box-shadow: rgba(0, 163, 196, 0.5) 0px 0px 0px 2px` on the live `/designs/bed-frame` at 1280 (the Parity review of plan eba62a497d77, its `scratchpad/review/legacy.json`).

## Current

Chakra v3's `solid` switch control writes `focusVisibleRing: outside` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/switch.js:86`), a 2px `colorPalette.focusRing` outline offset 2px: the control reads `outline: solid 2px rgb(160, 174, 192)` offset 2px, `box-shadow: none` (`current.json`). Predates plan eba62a497d77's checked color, on the control it touches; its ui recipe (`../ui/src/components/Switch.recipe.ts`) leaves it. `e027cab46c34` reads the box.

## Verdict

## Log

- 2026-09-27: Fixed in ../ui 47c6ffb (plan 402430831b29, the ui switch, slider and tabs recipes, Chakra v2 theme again), not pushed; seen on pnpm dev under the ui override, legacy and current readings saved in the plan scratchpad probe. Waits on the operator publish and the bump plan 99f2fe62c62f (decision 28c1a536).
