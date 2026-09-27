---
title: "Select text: Chakra v2's md field at fontSizes.md, 16px, to Chakra v3's native select md field at textStyle sm, 14px"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's `Select` md size takes the input's md field, `fontSizes.md` (`@chakra-ui/theme` `dist/components/input.js:66-71` and `select.js:281-285` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`), so on the live `/designs/bed-frame` at 1280 the engine's preset select reads 16px (the re-port's `verify-parity.mjs`, `controls.select`, both sides); the Parity review's `audit/_review/sbs-375.png` and `sbs-768.png`.

## Current

Chakra v3's native select recipe gives the md field `textStyle: "sm"` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/native-select.js:108-114`), which the ui `Select` wrapper (`node_modules/@villagekit/ui/dist/components/Select.js`) does not override, so on `pnpm dev` the preset select reads 14px at 375, 768 and 1280, and the catalog's mobile selects on `/designs` the same. The select items on `shell` (`42cd11c9585f`, `3dae1b1f6437`, `a7779316906c`, `e7661dae0c4b`, `fc09ead545ab`, `dc60b9b9c1bf`) record its background, padding, chevron, transition, hover and focus color, not its text size. A fix belongs to the ui's `Select` in `../ui`, never here. Read by the Parity review of the page re-port (plan 3c448a379ad7), which introduced neither.

## Verdict

## Log

- 2026-09-28: Moved to upstream at the design pages record's finish (plan [[0bc88eaf5493]], decision 28c1a536): the fix is in ../ui already, at commit 540e9c3 (the recipes and provider slice [[45d6f5634a11]]), whose nativeSelectRecipe writes the md size's field through inputSize with fontSize md and textStyle none (../ui/src/components/Select.tsx at 47c6ffb, selectSize and the md variant), replacing v3's textStyle sm key for key through the theme merge; the recipe is the site's theme system's, so every NativeSelect.Field under the Provider takes it, the engine's preset select included. Read under the file:../ui override by the ui Select slice [[6bc0d3ba08dc]]: on /designs at 375 both menuitem selects in 16px type, the live legacy site's reading (its Outcome and the note on [[42cd11c9585f]]); the preset select on /designs/bed-frame was not measured under the override, so the ui slice [[59fa9072c63f]] reads it at 16px in its probe and moves this to regression with a note if it reads otherwise. The bump plan [[99f2fe62c62f]] repeats the reading on the published package and moves this to fixed.
