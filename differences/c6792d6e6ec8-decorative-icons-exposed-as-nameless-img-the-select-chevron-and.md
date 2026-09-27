---
title: Select chevron exposed as a nameless img
status: upstream
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

- 2026-09-12: The parameters package's own `Select.Indicator` exposes the same nameless img on the design pages; filed on `/designs/bed-frame` (plan cf52c388).

- 2026-09-27: Fixed in ../ui at commit e3acb25 (plan [[6bc0d3ba08dc]], the shell mechanism [[908deff18dff]]): the ui Select.Indicator's default chevron carries aria-hidden true, focusable false and role presentation; on /tools/cutting-planner at 375 and 1280 under the file:../ui override the one select's chevron reads the three attributes and leaves no img in the aria snapshot (scratchpad chevron-after.json). Moved to upstream by the Parity review's call, the state differences/README.md defines for a fix committed in ../ui; the bump plan [[99f2fe62c62f]] moves it to fixed once the published package renders it.
