---
title: "Number input sm: Chakra v2's 32px field padded 32px for its stepper column to v3's 36px field with no end padding and 19px chevrons"
status: open
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's number input theme at `size="sm"` (`@chakra-ui/theme` `components/number-input.ts`): the field 32px tall with `paddingInlineEnd` the stepper column's width, 32px, and the stepper column 24px wide, each stepper 15px tall with its own 1px start border, drawing a filled triangle: on the live `/tools/cutting-planner` the `flushed` `sm` inputs of `packages/applet-cutting-planner/src/components/beam-row.tsx:72-87` read `height: 32px`, `padding-right: 32px`, each stepper 24 by 15 with `border-left-width: 1px` and the column without one (the Parity review of plan 55d567074c71, `scratchpad/review/55d5/leg-1280.txt`, `legacy-uncut-1280.png`).

## Current

Chakra v3's number input recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/number-input.js`): the `sm` size takes the input recipe's `sm`, `--input-height: sizes.9`, 36px (`dist/esm/theme/recipes/input.js:38-42`), and a `--stepper-width` of `sizes.5`, 20px (`number-input.js:81-86`); the base writes the field's `pe` as the stepper width plus 0.5rem (`:40-43`), which the `flushed` variant's `px: 0` (`input.js:79-84`) beats, so the value runs under the steppers; the control column, 20px, carries the 1px start border (`:55`) and each trigger draws Chakra's chevron at `fontSize: xs` with no border of its own: the re-ported `app/tools/cutting-planner/components/BeamRow.tsx:70-102` inputs read `height: 36px`, `padding-right: 0px`, the column `border-left-width: 1px`, each stepper 19 by 16.5 (`cur-1280.txt`, `current-uncut-1280.png`). Every `NumberInput` on the site renders this; the planner's monolith carries the same. Read on the slice's throwaway route. The wrapper is `@villagekit/ui`'s (`dist/components/NumberInput.js`), so the fix is a ui recipe, the input recipe having taken v2's sizes already ([[6b5488415a06]]), for a ui slice beside the shell record; the field's transition is [[8707d63ac65c]].

## Verdict

## Log

- 2026-09-28: Handed to the ui slice [[59fa9072c63f]], minted beside the shell record at the design pages record's finish (plan [[0bc88eaf5493]], decision 40abdb2f222a): Chakra v2's value written in the ui recipe or wrapper in ../ui, the one ui slice the record's split (call 7) and the applet components slice named for the open form items on shell, blocking the bump plan [[99f2fe62c62f]]. The state stays open until the slice moves it to upstream with the sibling commit; no verdict is written.
