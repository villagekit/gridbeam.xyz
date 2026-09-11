---
title: "Add button: Add beam to Add row"
status: open
route: /tools/cutting-planner
axis: copy
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-table.tsx:88-95` `<Button leftIcon={<Icon as={FaRegPlusSquare} />} ... variant="secondary" size="sm">Add beam</Button>`.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:339-346` `<Button ... variant="secondary" size="sm"><PlusIcon /> Add row</Button>`.

## Verdict

## Log
