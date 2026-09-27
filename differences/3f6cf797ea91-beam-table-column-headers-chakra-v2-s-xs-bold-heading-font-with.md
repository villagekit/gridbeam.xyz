---
title: "Beam table column headers: Chakra v2's xs bold heading font with wider letter spacing to v3's sm medium body font"
status: open
route: /tools/cutting-planner
axis: visual
kind: changed
---
## Legacy

Chakra v2's table theme writes the `th` in the heading font, bold, `letterSpacing: wider` and, at `size="sm"`, `fontSize: xs` padded `px: 4, py: 1` (`@chakra-ui/theme` `components/table.ts`, the `sm` size), and the `td` at `sm` padded `px: 4, py: 2`: on the live `/tools/cutting-planner` the `Length` and `Quantity` headers of `packages/applet-cutting-planner/src/components/beam-table.tsx:58-63` read 12px Fredoka at weight 700 with 0.6px letter spacing on a 16px line, padded 4px 16px, and the cells padded 8px 16px (the Parity review of plan 55d567074c71, `scratchpad/review/55d5/leg-1280.txt`).

## Current

Chakra v3's table recipe writes the `columnHeader` at `fontWeight: medium` in the body font (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/table.js:25-29`) with the `sm` size's `textStyle: sm` on the root and `px: 2, py: 2` on the header and the cells (`:117-128`), and the ui's `tableRecipe` adds `textTransform: none` alone (`../ui/src/components/Table.recipe.ts`): the re-ported `app/tools/cutting-planner/components/BeamsTable.tsx:61-71` headers read 14px Bitter at weight 500 on a 20px line, padded 8px (`cur-1280.txt`). Read on the slice's throwaway route; it reaches the route when the planner record's split consumes the component. The borders, the row background and the widths are [[075400f53a97]]; a `../ui` fix in the `tableRecipe`, for the same ui slice.

## Verdict

## Log

- 2026-09-28: The recipe half is taken by the ui slice [[59fa9072c63f]], minted beside the shell record at the design pages record's finish (plan [[0bc88eaf5493]]): the ui tableRecipe writes v2's column header font (the heading family, bold, wider letter spacing, the 0.9.0 textTransform none) in ../ui, which reaches the planner's monolith table on the live route, so the slice reads it there under the override and moves this to upstream with the sibling commit if the header reads v2's font; the planner record [[396c9af0cbd1]] re-ports the page on top of it.
