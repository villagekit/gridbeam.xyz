---
title: "Number input steppers: a hover fill added, the press fill gray.200 over 0.2s to gray.100 with no transition, and disabled at opacity 0.5 under a pointer cursor where v2 was 0.4 under not-allowed"
status: open
route: shell
axis: interaction
kind: changed
---
## Legacy

Chakra v2's number input theme (`@chakra-ui/theme` `components/number-input.ts`, the `stepper` style's `_disabled` and the `field` style through `inputTheme`'s `_disabled`): the stepper has no hover style, fills `gray.200` while pressed (`_active: { bg: gray.200 }`) over the `common` transition at 0.2s, and disabled, the field and the steppers take `opacity: 0.4` and `cursor: not-allowed`: on the live `/tools/cutting-planner` with an infeasible row, the read-only table's inputs and steppers read `opacity: 0.4`, `cursor: not-allowed`; an editable stepper under the pointer keeps its transparent background, reads `rgba(226, 232, 240, 0.925)` while pressed and `transition-duration: 0.2s` at rest (the Parity review of plan 55d567074c71, `scratchpad/review/55d5/leg-1280.txt`, its `hov.mjs`).

## Current

Chakra v3's number input recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/number-input.js:7-30`, `triggerStyle`): `_hover: { bg: bg.muted }` and `_active: { bg: bg.emphasized }`, the same `rgb(244, 244, 245)` under the pointer and while pressed (`gray.100`, the ui's `bg.emphasized` token resolving to it), no transition (`transition-duration: 0s`), and `_disabled: { opacity: 0.5 }` with `cursor: button`, read as `pointer`, while the field takes the input recipe's disabled `opacity: 0.5` and `cursor: not-allowed`: the re-ported `app/tools/cutting-planner/components/BeamRow.tsx:70-102` read-only rows on the slice's throwaway route (`cur-1280.txt`). Every `NumberInput` on the site renders this. The sizes are [[a902f3221f1b]]; a ui recipe fix, for the same ui slice.

## Verdict

## Log
