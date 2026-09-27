---
title: "Slider thumb keyboard focus: Chakra v2's 2px outline shadow to Chakra v3's 3px gray.400 ring"
status: upstream
route: /designs/bed-frame
axis: accessibility
kind: changed
---
## Legacy

Chakra v2's slider thumb wrote `_focusVisible: { boxShadow: outline }` (the packed `@chakra-ui/theme` `dist/components` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`, `slider.js:110-112`), the theme's 2px `outlineColor` shadow: the thumb focused by keyboard reads `box-shadow: rgba(0, 163, 196, 0.5) 0px 0px 0px 2px` (read by the Parity review of plan eba62a497d77 (its `scratchpad/review/p.mjs`, `legacy.json` and `current.json`) on the live `/designs/5-12-13-triangle-desk` and the page under the ui override, the `Custom` preset selected, at 1280).

## Current

Chakra v3's slider thumb writes `_focusVisible: { ring: 3px, ringColor: colorPalette.focusRing/50 }` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/slider.js:65-68`): the thumb focused by keyboard reads a 3px `gray.400` ring at half opacity (read by the Parity review of plan eba62a497d77 (its `scratchpad/review/p.mjs`, `legacy.json` and `current.json`) on the live `/designs/5-12-13-triangle-desk` and the page under the ui override, the `Custom` preset selected, at 1280). Read beside the width plan eba62a497d77 restores, hidden until then by the zero-width root; its ui recipe leaves it. The shell's one-ring fix (the ui CHANGELOG's Unreleased Fixed) covers buttons, links, inputs, selects, number inputs and accordion triggers, not the slider.

## Verdict

## Log

- 2026-09-27: Fixed in ../ui 47c6ffb (plan 402430831b29, the ui switch, slider and tabs recipes, Chakra v2 theme again), not pushed; seen on pnpm dev under the ui override, legacy and current readings saved in the plan scratchpad probe. Waits on the operator publish and the bump plan 99f2fe62c62f (decision 28c1a536).
