---
title: "Field label box: Chakra v2's block label across its column to Chakra v3's flex label shrunk to its text"
status: upstream
route: shell
axis: interaction
kind: changed
---
## Legacy

Chakra v2's `FormLabel` is a block label inside a block `FormControl`, so it spans its column: on the live `/designs/bed-frame` at 1280 the `Preset` label is 296px wide (239px at 375) and the engine's label rows 400px, so a click in the empty strip beside the word reaches the control the label names (the ui NumberInput and field label slice's Parity and Spec reviews, `audit/_probe1b47/legacy.json`, `audit/_review1b47/fields-legacy.json`).

## Current

Chakra v3's field root is a flex column with `alignItems: flex-start` and its label `display: flex` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/field.js`), so the label shrinks to its text: on `pnpm dev` under the `file:../ui` override the `Preset` label reads 48px wide at 1280 and 375 and the engine's label rows 100px to 152px (`audit/_probe1b47/after.json`, `audit/_review1b47/fields-current.json`). No pixel moves; the label's click target is the text alone. The ui field recipe's, for a `../ui` slice beside the shell record.

## Verdict

## Log

- 2026-09-28: Fixed in ../ui commit 3f59037 (plan [[42f6738b9658]]): the label is display block in a block root, Chakra v2's FormLabel; on pnpm dev under the file:../ui override the Preset label reads 296px wide at 1280 and 239px at 375 and the engine's label rows 400px and 343px (audit/_probe42f6/after.json against legacy.json). Waits on the operator's publish for the bump plan [[99f2fe62c62f]] to move it to fixed (decision 28c1a536).
