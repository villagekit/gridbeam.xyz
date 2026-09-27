---
title: "Field root: Chakra v2's block FormControl with inline-block switch and slider roots to Chakra v3's flex column, the design page's parameter fields 4 to 7px shorter"
status: upstream
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

- 2026-09-28: Fixed in ../ui commit 3f59037 (plan [[42f6738b9658]]): the field root is display block under the vertical orientation variant, Chakra v2's FormControl, and the slider root an inline-block on the field's baseline with a block-level flex control and a zero-height ::before item pinning the baseline to its bottom edge; on pnpm dev under the file:../ui override the height field reads 63px, each boolean field 59px with its switch 11px under its label row, Underside at legacy's y at 1280 and 375 (audit/_probe42f6/after.json against legacy.json). Waits on the operator's publish for the bump plan [[99f2fe62c62f]] to move it to fixed (decision 28c1a536).
