---
title: "Default top-up option: 30 gu to 60 gu"
status: regression
route: /tools/cutting-planner
axis: interaction
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-planner.tsx:81` `useState<false | 30 | 60>(30)`; live, "30gu" is selected on load (`audit/tools__cutting-planner/dom/legacy.aria.yaml`: `option "30gu" [selected]`), so the default plan tops up with 1200 mm beams.

## Current

`app/tools/cutting-planner/url-codec.ts:41` `const DEFAULT_UNLIMITED: UnlimitedStock = 60`; live, "2400 mm (60 gu)" is selected on load (`current.aria.yaml`), so the same default rows plan onto 2400 mm beams. Carried forward from note [[526d5330ef4e]] ("its default rows and stock": the rows are identical, the top-up is not).

## Verdict

## Log
