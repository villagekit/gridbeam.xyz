---
title: "Number input stepper glyph: Chakra v2's Icon class chakra-icon removed"
status: open
route: shell
axis: code
kind: removed
---
## Legacy

Chakra v2's stepper glyphs were `TriangleUpIcon` and `TriangleDownIcon`, each an `Icon` (`@chakra-ui/icon`, `dist/chunk-2GBDXOMA.mjs:44` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`), which wrote `class="chakra-icon"` beside its Emotion class: on the live `/tools/cutting-planner` at 1280 each stepper's `svg` reads `className: chakra-icon css-onkibi` (the ui form recipes slice's probe, `scratchpad/s59fa/legacy.json`, `editable.rest.steppers[0].svg`).

## Current

The ui `NumberInput` triggers render the same paths as a bare `svg` with `viewBox`, `focusable="false"` and the path alone (`../ui/src/components/NumberInput.tsx`, `triangleUp` and `triangleDown`), so the `svg` reads no class (`after.json`, the same key). Every other attribute, the box, the fill and the color are legacy's. No style hangs on the class on either side; a code reading with no visible effect, the twin of the `Select` and `Accordion` glyphs, which the ui Select slice `6bc0d3ba08dc` and the accordion slice rendered as bare `svg`s too.

## Verdict

## Log

- 2026-09-28: For the operator, on the shell's verdicts plan [[77cf83a1285a]] (the ui form recipes slice [[59fa9072c63f]], its Parity review): a code reading with no visible effect, Chakra v2's Icon class on the stepper svg, which the Select and Accordion glyphs dropped too without an item; whether rule 4 of 2032533f covers it. Not judged here; the state stays open.
