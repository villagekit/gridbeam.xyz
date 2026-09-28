---
title: "Toasts: Chakra v2 solid alert at 310px with a bold 16px title and a filled icon to Chakra v3 toast at 384px with a sm title and an outline icon"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's alert-based toast (`@chakra-ui/toast`, the `solid` alert): on the live `/subscribe`, the `Error!` toast is a 310px box in `red.600`, `rgb(197, 48, 48)`, with a bold 16px title, the description below and a filled icon (`audit/_probe/r244-legacy-500-crop.png` at the Parity review of plan 244b962caae9).

## Current

Chakra v3's toast recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/toast.js`, the root and the `sm` title) under the stand-in's markup (`app/_components/Toaster.tsx`, `Toast.Root width={{ md: 'sm' }}`, `Toast.Indicator`): a 384px box in `rgb(220, 38, 38)` with a smaller title and an outline icon (`audit/_probe/r244-current-500-crop.png`). The sibling's `../ui/src/Toaster.tsx` at `540e9c3` carries the same markup, so the publish does not close this; the code stand-in is [[9ad6681c1e21]].

## Verdict

## Log

- 2026-09-28: Filed regression by the Parity review of the subscribe re-port (plan 244b962caae9), measured on both sides: no rule of 2032533f covers a Chakra v3 recipe's box, and the sibling at ca72207 does not write it. A ui recipe fix in ../ui for a slice the shell verdicts plan 77cf83a1285a mints beside the shell record, blocking the bump plan 99f2fe62c62f.
