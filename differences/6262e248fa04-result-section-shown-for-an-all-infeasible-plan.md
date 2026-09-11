---
title: Result section shown for an all-infeasible plan
status: regression
route: /tools/cutting-planner
axis: interaction
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-planner.tsx:174-178` `{result.cutBeams.length > 0 && (<Section index={1} aria-label="Cut beams" ...>` so a plan with no cut beams renders only the uncut tables.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:187` `{result != null && (` gates the section, `:202` gates only the drawings, so a plan whose every cut is infeasible still shows the "Cutting plan" heading, "0 stock beams used — 0 gu." and the Print button above the infeasible table.

## Verdict

## Log
