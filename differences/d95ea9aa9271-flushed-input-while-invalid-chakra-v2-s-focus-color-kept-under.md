---
title: "Flushed input while invalid: Chakra v2's focus color kept under focus to v3's error red on the underline and shadow"
status: open
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's input theme (`@chakra-ui/theme` `components/input.ts`, the `flushed` variant): `_invalid` writes the error color on the border and shadow, and `_focusVisible` after it writes the focus color, so a focused field that is out of range shows the focus color: on the live `/tools/cutting-planner`, `70` typed into a `Beams you want` length (`packages/applet-cutting-planner/src/components/beam-row.tsx:72-87`, `max={60}`) reads `aria-invalid="true"` with the underline and shadow `rgba(0, 163, 196, 0.5)`, the focus teal, until the blur clamps it to `60` (the Parity review of plan 55d567074c71, `scratchpad/review2/t4.mjs`, `typed70`).

## Current

Chakra v3's input recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/input.js:21-23`, the base `_invalid` setting `--error-color` on the border and the focus ring, and `:85-91`, the `flushed` variant's `_focusVisible._invalid` writing the error color on the border and the shadow over the focus color): the same `70` in the re-ported `app/tools/cutting-planner/components/BeamRow.tsx:70-84` reads the underline and shadow `rgb(239, 68, 68)` while focused, red, until the blur clamps it to `60` (`t4.mjs`, `current.typed70`). Every `flushed` `Input` and `NumberInput` on the site renders this; the planner's monolith carries the same. Read on the slice's throwaway route. A ui recipe fix, for the ui slice beside the shell record that takes the number input's other readings ([[a902f3221f1b]], [[d6c18389048d]]).

## Verdict

## Log
