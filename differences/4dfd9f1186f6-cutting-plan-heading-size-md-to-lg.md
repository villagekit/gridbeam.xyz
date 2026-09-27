---
title: "Cutting plan heading: size md to lg"
status: fixed
route: /tools/cutting-planner
axis: visual
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-plan.tsx:19-21` `<Heading size="md" sx={{ textAlign: 'center' }}>Cutting plan</Heading>`.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:196-200` `<Center><Heading as="h2" size="lg">Cutting plan</Heading></Center>`.

## Verdict

plan 9c6e9dd981bd

## Log
