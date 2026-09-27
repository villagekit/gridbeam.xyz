---
title: "Field label text selection: Chakra v2's selectable label to Chakra v3's user-select none"
status: open
route: shell
axis: interaction
kind: changed
---
## Legacy

Chakra v2's `FormLabel` wrote no `user-select`, so a label's text is selectable with the pointer: on the live `/designs/bed-frame` at 1280 and 375 every field label (`Preset`, `Controls`, the engine's parameter labels) reads `user-select: auto` (`audit/_probe42f6/legacy.json`, `labelUserSelect`; the packed v2 theme at 3.3.1, `components/form-label.js:31-40`, and the `FormLabel` component, `form-control/dist/chunk-H46NUPBZ.mjs:33-37`, under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`).

## Current

Chakra v3's field recipe writes `userSelect: none` on the label (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/field.js`, the `label` base), and the ui `fieldRecipe` (`../ui/src/components/FormLabel.recipe.ts`) does not reset it: on `pnpm dev` under the `file:../ui` override every field label on `/designs/bed-frame` reads `user-select: none` (`audit/_probe42f6/after.json`), so a label's text cannot be selected with the pointer. Predates the ui field root and label box slice `42f6738b9658`, which read it on its probe; a ui recipe reading, for a `../ui` slice beside the shell record, the badge's selectable text (`a4f938a27428`) its precedent.

## Verdict

## Log
