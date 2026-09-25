---
title: Cutting planner intro paragraph 2 added
status: regression
route: /tools/cutting-planner
axis: copy
kind: added
---
## Legacy

No such paragraph (`apps/gridkit/pages/tools/cutting-planner.tsx:9-13`).

## Current

`app/tools/cutting-planner/page.tsx:40-44` "Lengths are in grid units (1 gu = 40 mm) by default. Toggle to mm if you prefer. Share the planned cut by copying the URL — your inputs encode into the query string when you press Plan it." ("grid units" in `em`), `Text variant="secondary"`.

## Verdict

## Log

- 2026-09-25: Regression (cutting planner grilling C2). The intro paragraph is removed; legacy has nothing between the title and the controls.
