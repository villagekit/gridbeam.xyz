---
title: "Field label transition: Chakra v2's common properties over 0.2s removed"
status: upstream
route: shell
axis: visual
kind: removed
---
## Legacy

Chakra v2's `FormLabel` base wrote `transitionProperty: common` and `transitionDuration: normal` (the packed v2 theme at 3.3.1, `components/form-label.js:29-30`, under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/theme/dist/`), so on the live `/designs/bed-frame` at 1280 and 375 the engine's `Preset` and `Controls` labels read `transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform` at `0.2s` (the ui form recipes slice's probe, `scratchpad/s59fa/legacy.json`, `labels1280.preset`). Nothing on the site changes a label's color or opacity, so the transition has no motion to show.

## Current

Chakra v3's field recipe writes no transition on the label (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/field.js:19-30`) and the ui `fieldRecipe` (`../ui/src/components/FormLabel.recipe.ts`) writes the weight, size and text style alone: on `pnpm dev` under the `file:../ui` override the same labels read `transition: all` at `0s` (`after.json`). Every `FormLabel` on the site reads the same. A ui recipe reading, for a `../ui` slice beside the shell record.

## Verdict

## Log

- 2026-09-28: Fixed in ../ui by commit 486ef24 (plan 1b4708347ae9), read on pnpm dev under the file:../ui override against the live legacy site (audit/_probe1b47/probe.mjs, legacy.json and after.json; the number input roots on a throwaway route, roots.mjs). Waits on the operator's publish; the bump plan 99f2fe62c62f moves it to fixed.
