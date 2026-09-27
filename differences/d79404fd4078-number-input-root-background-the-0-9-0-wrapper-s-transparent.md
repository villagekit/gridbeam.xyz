---
title: "Number input root background: the 0.9.0 wrapper's transparent root under the flushed variant to the ui wrapper's white at every variant"
status: open
route: shell
axis: visual
kind: changed
---
## Legacy

The 0.9.0 `NumberInput` wrapper passed `background={variant === 'flushed' ? 'transparent' : 'white'}` to Chakra v2's number input (`../ui` at `a5cbe36`, `src/components/NumberInput.tsx:45`): on the live `/tools/cutting-planner` at 1280 each `flushed` input's root (`div.chakra-numberinput`) reads `background-color: rgba(0, 0, 0, 0)`, so the gray `Controls` band shows through the `Beams you want` and `Beams you have` tables (the ui form recipes slice's probe, `scratchpad/s59fa/legacy.json`, `editable.rest.root`).

## Current

The ui `NumberInput.Root` passes `bg="white"` at every variant (`../ui/src/components/NumberInput.tsx`, the `Root` wrapper): on `pnpm dev` under the `file:../ui` override the `flushed` inputs of the re-ported `BeamRow` read a root of `rgb(255, 255, 255)` (`after.json`, `editable.rest.root`). Not visible on any route today: the design pages' Plan tab and the throwaway route render the flushed inputs on a white page, and the planner's monolith inputs are `outline`, white on both sides; it shows once the planner record's re-port renders `BeamsTable` on the gray band. A ui wrapper reading, for a `../ui` slice beside the shell record.

## Verdict

## Log
