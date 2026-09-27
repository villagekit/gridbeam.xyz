---
title: "Viewer and controls gap: Chakra v2 Stack spacing 12 from lg, 48px, to a Flex gap of 10, 40px, the controls column 408px wide against legacy's 400"
status: fixed
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue-item/catalogue-item.tsx:91-93` at `fce357d`: the viewer and the controls sit in a `Stack` with `spacing={{ base: 8, lg: 12 }}`, 48px between the columns from `lg`, so on the live `/designs/5-12-13-triangle-desk` at 1280 the controls column, and each number slider's root under the `Custom` preset, runs from 800 to 1200, 400px wide (plan eba62a497d77's probe, the scratchpad's `legacy.json`).

## Current

`app/_components/catalogue/CatalogueItem.tsx:91-93`: a `Flex` with `gap={{ base: 6, lg: 10 }}`, 40px between the columns from `lg`, so the controls column and each slider root run from 792 to 1200, 408px wide (`after.json`). Read by the Spec review of plan eba62a497d77 against its slider width line; the slider fills its field on both sides (`b8eb35a5578e` and `80946bbc84ba` read the slider itself), and the 8px is the page's, for the page re-port slice `3c448a379ad7`, which re-ports this file from legacy's.

## Verdict

plan 3c448a379ad7

## Log
