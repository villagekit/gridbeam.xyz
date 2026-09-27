---
title: "Parts tab settings rows: Chakra v2's stretched switch label in the site's flex-row field to a 20px label under Chakra v3's flex-start"
status: open
route: shell
axis: interaction
kind: changed
---
## Legacy

Chakra v2's `FormControl` wrote no `align-items`, so where the legacy site makes the control a flex row (`../node-modules/apps/gridkit/components/design/parts-breakdown.tsx` and `../node-modules/packages/applet-cutting-planner/src/components/display-unit-toggle.tsx` at `fce357d`, whose `display: flex` the site's `app/_components/design/PartsBreakdown.tsx:35` and `app/tools/cutting-planner/components/DisplayUnitToggle.tsx:18` port as `css`), its items stretch: on the live `/designs/bed-frame` at 1280 with the Parts tab open, the `Group same size parts` row is 29px tall with `align-items: normal` and its switch label 34 by 29, the track 20px inside it (the ui field root and label box slice's Parity review, `audit/_parity42f6/legacy.json`).

## Current

Chakra v3's field recipe writes `alignItems: flex-start` on the root under its `vertical` orientation, the default (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/field.js`), which the ui `fieldRecipe`'s block root leaves inert but a caller's `display: flex` revives: on `pnpm dev` under the `file:../ui` override the same row is 29px with `align-items: flex-start` and its switch label 34 by 20 (`audit/_parity42f6/current.json`), so the label's click target is 9px shorter; the track sits at the same place and no pixel moves. Predates the ui field root and label box slice `42f6738b9658`, whose Parity review read it; the ui field recipe's, for a `../ui` slice beside the shell record.

## Verdict

## Log
