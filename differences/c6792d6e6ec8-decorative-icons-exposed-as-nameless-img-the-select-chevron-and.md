---
title: Select chevron exposed as a nameless img
status: regression
route: /tools/cutting-planner
axis: accessibility
kind: changed
---
## Legacy

The native Chakra v2 `Select` (`packages/applet-cutting-planner/src/components/cutting-planner.tsx:139-147`) adds no icon node; the `react-icons` glyphs render `aria-hidden="true" focusable="false"` with no title (`beam-table.tsx:89`, `beam-row.tsx:113`), so the buttons carry only their names.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:169` `<Select.Indicator />` renders Chakra's `ChevronDownIcon` without `aria-hidden`: a bare `img` beside the combobox (`audit/tools__cutting-planner/dom/current.aria.yaml`). The `MinusIcon`/`PlusIcon` glyphs (`:497-514`) are `aria-hidden` and leave no node in the Remove and Add buttons; the only other `img` nodes are the steppers', [[46efc6a1c050]].

## Verdict

## Log
