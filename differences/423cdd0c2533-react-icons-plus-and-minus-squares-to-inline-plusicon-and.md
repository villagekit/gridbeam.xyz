---
title: react-icons plus and minus squares to inline PlusIcon and MinusIcon
status: regression
route: /tools/cutting-planner
axis: code
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-table.tsx:18` `import { FaRegPlusSquare } from 'react-icons/fa'`, `:89` `leftIcon={<Icon as={FaRegPlusSquare} />}`; `beam-row.tsx:13` `import { FaRegMinusSquare } from 'react-icons/fa'`, `:113` `icon={<FaRegMinusSquare />}`.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:497-514` hand-written `MinusIcon` and `PlusIcon` SVGs (a bar and a cross, not the outlined squares), used at `:326` and `:345`. `react-icons` is still a dependency (`package.json`).

## Verdict

## Log
