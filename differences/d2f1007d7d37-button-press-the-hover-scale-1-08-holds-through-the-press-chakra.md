---
title: "Button press: the hover scale 1.08 holds through the press, Chakra v3 emits the hover rule after the active rule"
status: regression
route: shell
axis: interaction
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/Button.tsx:41-48`: the button base style scales to `1.08` under `_hover` and back to `1` under `_active`, both inside `&:not(:disabled)`. Chakra v2 emits the active rule after the hover rule, so a pressed button drops back to its size while the pointer is still over it: on the live site at 375, the mobile menu toggle's computed transform on press is `matrix(1, 0, 0, 1, 0, 0)` (hover `matrix(1.08, 0, 0, 1.08, 0, 0)`), read by the scratchpad's `toggle-probe.mjs` on 2026-09-26.

## Current

`../ui/src/components/Button.tsx:32-33` carries the same two lines in the recipe's base. Chakra v3 emits the active rule (`.x:not(:disabled):is(:active, [data-active]):not(:disabled, [data-disabled], [data-state="open"])`) before the hover rule (`@media (hover: hover) .x:not(:disabled):is(:hover, [data-hover]):not(:disabled, [data-disabled])`), at equal specificity, so while the pointer is down and over the button the hover transform wins: the toggle's computed transform on press is `matrix(1.08, 0, 0, 1.08, 0, 0)` on `pnpm dev`, under the `file:../ui` override before and after the toggle color slice `61a42a0adbc8` and on the published 1.2.0 alike (the probe's `toggle-override-before.json` and `toggle-override-after.json`); the press crop `toggle-press-current.png` shows the larger ring beside `toggle-press-legacy.png`. Every ui `Button`, `IconButton`, `LinkButton` and `LinkIconButton` on every route presses this way. Found by the Spec and Parity reviews of `61a42a0adbc8`; the fix is the recipe's, in `../ui`.

## Verdict

## Log
