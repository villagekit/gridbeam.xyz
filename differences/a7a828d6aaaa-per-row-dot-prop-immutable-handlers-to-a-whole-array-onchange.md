---
title: Per-row dot-prop-immutable handlers to a whole-array onChange
status: regression
route: /tools/cutting-planner
axis: code
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-planner.tsx:13` `import dotProp from 'dot-prop-immutable'`; `:53-79` six `useCallback` handlers (`handleCreate*`, `handleChange*`, `handleDelete*` per table) using `dotProp.set` and `dotProp.delete`, passed as `onCreateBeam`, `onChangeBeam`, `onDeleteBeam` (`beam-table.tsx:27-29`).

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:253` one `onChange?: (beams: Array<BeamQuota>) => void` per table, with `handleAdd`, `handleChange`, `handleDelete` closures inside `BeamsTable` (`:260-270`) using `map`, `filter` and spread. No `dot-prop-immutable` dependency.

## Verdict

## Log
