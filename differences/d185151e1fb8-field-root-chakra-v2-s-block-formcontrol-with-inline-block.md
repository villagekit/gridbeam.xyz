---
title: "Field root: Chakra v2's block FormControl with inline-block switch and slider roots to Chakra v3's flex column, the design page's parameter fields 4 to 7px shorter"
status: open
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's `FormControl` is a plain block, and the v2 `Switch` and `Slider` roots are `inline-block` (the switch at `vertical-align: middle`), so each control sits in a line box on the body's 24px line: on the live `/designs/bed-frame` with the Overview's `Controls` on, the engine's `Bed frame height` field reads 63px tall and each boolean field (`Top panel`, `Double posts`, `Underside`) 59px, the switch 11px under its label row (the ui NumberInput and field label slice's Spec and Parity reviews, `audit/_review1b47/fields.mjs`, `bool.mjs` and `disp.mjs`, readings in `audit/_review1b47/{legacy,current}.json` under `controls1280` and `controls375` and in `fields-legacy.json`).

## Current

Chakra v3's field root is a flex column (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/field.js`, `root` base and the `vertical` orientation), so no line box forms around the control: on `pnpm dev` under the `file:../ui` override at `../ui` 486ef24 the same height field reads 56px and each boolean field 55px, the switch 8px under its label row, and by `Underside` the fields sit about 22px higher than legacy at 1280 and 375 (some 7px of that from the slider's own item). Before 486ef24 the 6px root gap hid part of it. The mechanism is the ui field recipe's root display against v2's block control, for a `../ui` slice beside the shell record.

## Verdict

## Log
