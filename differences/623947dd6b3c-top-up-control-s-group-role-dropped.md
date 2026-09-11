---
title: Top-up control's group role dropped
status: regression
route: /tools/cutting-planner
axis: accessibility
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-planner.tsx:126-148` `FormControl` around the label and the select renders `role="group"` (`audit/tools__cutting-planner/dom/legacy.aria.yaml`: `group: - paragraph ... - combobox`).

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:149-171` an `HStack` of a bare `chakra.label` and `Select.Root`: no group in the tree (`current.aria.yaml`: `text`, `combobox`, flat). The label association survives (`htmlFor`). Chakra v3's `Field.Root` would render the group; the code item [[6db1fb31e995]] chose `chakra.label`.

## Verdict

## Log
