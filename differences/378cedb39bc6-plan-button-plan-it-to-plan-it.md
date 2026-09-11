---
title: "Plan button: Plan it! to Plan it"
status: open
route: /tools/cutting-planner
axis: copy
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-planner.tsx:153-155` `<Button onClick={handlePlanClick} isDisabled={requiredBeams.length === 0}>Plan it!</Button>`.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:175-182` `<Button ... variant="primary">Plan it</Button>`. Carried forward from note [[526d5330ef4e]].

## Verdict

## Log
