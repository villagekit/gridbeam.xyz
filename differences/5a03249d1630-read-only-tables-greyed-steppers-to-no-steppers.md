---
title: "Read-only tables: greyed steppers to no steppers"
status: regression
route: /tools/cutting-planner
axis: visual
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-row.tsx:80-86,99-105` the `NumberInputStepper` renders in the infeasible and unused tables too, `isDisabled={onChange == null}` greying it.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:380-385,412-417` `{!disabled && <NumberInput.Control>...}`: no stepper buttons at all in the read-only tables. From the code; the exercised default plan produced no infeasible or unused rows on either side.

## Verdict

## Log
