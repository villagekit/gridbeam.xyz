---
title: "Delete button name: Delete to Remove row N"
status: open
route: /tools/cutting-planner
axis: copy
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-row.tsx:112` `<IconButton title="Delete" ...>` on every row (`audit/tools__cutting-planner/dom/legacy.aria.yaml`: `button "Delete"`).

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:321` `title={`Remove row ${index + 1}`}` (`current.aria.yaml`: `button "Remove row 1"`, `button "Remove row 2"`).

## Verdict

## Log
