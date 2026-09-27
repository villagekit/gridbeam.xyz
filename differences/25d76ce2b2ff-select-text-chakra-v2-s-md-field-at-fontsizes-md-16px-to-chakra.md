---
title: "Select text: Chakra v2's md field at fontSizes.md, 16px, to Chakra v3's native select md field at textStyle sm, 14px"
status: open
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
