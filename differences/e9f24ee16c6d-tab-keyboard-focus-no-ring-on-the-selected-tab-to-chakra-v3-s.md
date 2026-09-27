---
title: "Tab keyboard focus: no ring on the selected tab to Chakra v3's 2px gray.400 outline"
status: open
route: /designs/bed-frame
axis: interaction
kind: changed
---
## Legacy

Chakra v2's base tab wrote `_focusVisible: { zIndex: 1, boxShadow: outline }` (the packed `@chakra-ui/theme` `dist/components` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`, `tabs.js:45-48`) and the 0.9.0 theme's `_selected: { boxShadow: none }` blanks it on the selected tab; the tabs activate automatically, so the one tab in the keyboard's order is the selected one, and keyboard focus shows no ring. The live `/designs/bed-frame` at 1280, the `Overview` trigger focused by keyboard: `box-shadow: none`, `outline: rgba(0, 0, 0, 0) solid 2px` (plan eba62a497d77's probe, the scratchpad's `residual-legacy.json`).

## Current

Chakra v3's base trigger writes `_focusVisible: { zIndex: 1, outline: 2px solid, outlineColor: colorPalette.focusRing }` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/tabs.js:43-47`). The page under the ui override, the same trigger focused by keyboard: `outline: rgb(160, 174, 192) solid 2px` (`gray.400`), `box-shadow: none` (`residual-current.json`). Read beside the variant plan eba62a497d77 restores; its ui recipe leaves it. The shell's one-ring fix (the ui CHANGELOG's Unreleased Fixed) covers buttons, links, inputs, selects, number inputs and accordion triggers, not the tabs.

## Verdict

## Log
