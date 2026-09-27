---
title: "Beam table: variant unstyled to line, column widths 40/40/20 to 45/35/20"
status: regression
route: /tools/cutting-planner
axis: visual
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-table.tsx:55` `<Table size="sm" variant="unstyled" sx={{ width: '100%' }}>`, no row rules; `:58,62,66` `Th` widths `40%`, `40%`, `20%`.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:290` `<Table.Root size="sm" variant="line" w="full">`, a rule under every row; `:293-295` widths `45%`, `35%`, `20%`.

## Verdict

## Log

- 2026-09-28: From the applet components slice (plan 55d567074c71): the re-ported BeamsTable (app/tools/cutting-planner/components/BeamsTable.tsx) writes legacy's 40%, 40%, 20% widths and Table.Root size=sm variant=line, Chakra v3's default, since v3's table recipe has line and outline only (node_modules/@chakra-ui/react/dist/esm/theme/recipes/table.js:84-118) and the ui's tableRecipe adds no unstyled variant (../ui/src/components/Table.recipe.ts). Read on the throwaway route against the live planner: the line variant draws a 1px rgb(228, 228, 231) bottom border on every column header and cell and a white row background where legacy's unstyled drew none (0px, transparent), and v3's sm pads the header and cells 8px where v2's sm padded them 4px 16px. The residual is the ui's, a tableRecipe unstyled variant and v2's sm paddings in ../ui, for this record's split to hand to a ui slice beside the shell record; the planner's page still renders the monolith, so this item stands until the split consumes the component.

- 2026-09-28: From the applet components slice (plan 55d567074c71), a second reading: Chakra v3's Table.Root also takes the unstyled prop, which drops every recipe style (node_modules/@chakra-ui/react/dist/esm/styled-system/create-slot-recipe-context.js, useRecipeResult returns the empty slot styles), the sm size's 8px paddings with the borders, so the cells would sit at 0 where legacy's unstyled kept v2's sm paddings, 4px 16px; the line variant was chosen over it, keeping the size and carrying the border and background residual above, since neither reaches legacy without a ui recipe change.

- 2026-09-28: From the applet components slice (plan 55d567074c71), a correction: v2's sm padded the header cells 4px 16px and the body cells 8px 16px (the Parity review's reading on the live planner), where the first note above wrote 4px 16px for both; v3's sm pads both 8px. The header font is its own item, filed by the same review.

- 2026-09-28: The recipe half is taken by the ui slice [[59fa9072c63f]], minted beside the shell record at the design pages record's finish (plan [[0bc88eaf5493]]): the ui tableRecipe gains an unstyled variant and v2's sm paddings in ../ui, verified on a throwaway route rendering the applet's BeamsTable. The state stays regression: the Current above is the monolith's own variant and widths, which the planner record [[396c9af0cbd1]]'s re-port closes by rendering the applet's BeamsTable, which may then take variant unstyled back.
