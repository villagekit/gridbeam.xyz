---
title: Chakra v2 primitives to v3 compound components
status: sanctioned
route: /tools/cutting-planner
axis: code
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-row.tsx:1-11` `NumberInput`, `NumberInputField`, `NumberInputStepper`, `NumberIncrementStepper`, `NumberDecrementStepper` with `onChange={(_, value: number) => ...}`; `cutting-planner.tsx:7,139-147` `Select` with `option` children; `display-unit-toggle.tsx:5,29-34` `Switch` with `isChecked`/`onChange`; `beam-table.tsx:1-16` `Table`, `Thead`, `Tbody`, `Tr`, `Th`, `Td`.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:366-388,400-420` `NumberInput.Root/Control/IncrementTrigger/DecrementTrigger/Input` with `onValueChange={({ valueAsNumber }) => ...}`; `:158-170` `Select.Root/Field/Indicator`; `:439-455` `Switch.Root/HiddenInput/Control/Thumb/Label` with `checked`/`onCheckedChange`; `:290-352` `Table.Root/Header/Body/Row/ColumnHeader/Cell`.

## Verdict

rule: upgrade (Chakra v3 ships these as compound components; only the primitive shapes changed here)

## Log
