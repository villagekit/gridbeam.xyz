---
title: Beam tables wrapped in white cards
status: regression
route: /tools/cutting-planner
axis: visual
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-table.tsx:46` `<VStack as="section" aria-label={title} spacing="4" sx={{ width: '100%', ...sx }}>`, flush on the section background (`audit/tools__cutting-planner/1280/legacy.png`).

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:273-282` `<VStack as="section" aria-label={title} gap="3" flex="1" p="4" bg="white" borderRadius="xl" boxShadow="sm">` (`audit/tools__cutting-planner/1280/current.png`).

## Verdict

## Log
