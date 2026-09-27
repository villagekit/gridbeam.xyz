---
title: "Section default width: legacy's container.md, 768px, to the ui's 2xl, 672px"
status: open
route: shell
axis: visual
kind: changed
---
## Legacy

`packages/ui-page/src/components/Section.tsx:36` `maxW = 'container.md'`, 768px, the container width of every `Section` given no `maxW`: on the live `/tools/cutting-planner` the `Uncut beams` section's container reads `max-width: 768px` (the Parity review of plan 55d567074c71, `scratchpad/review/55d5/leg-1280.txt`), so its two tables are 352px wide and their captions fit one line (`legacy-uncut-1280.png`).

## Current

`@villagekit/ui@1.2.0` `dist/components/layouts/Section.js` `maxW = "2xl"`, 672px, and the sibling `../ui/src/components/layouts/Section.tsx:38` the same: the re-ported `CuttingPlannerResult`'s `Uncut beams` section (`app/tools/cutting-planner/components/CuttingPlannerResult.tsx:37`, legacy's call with no `maxW`) reads `max-width: 672px`, its tables 288px wide and both captions wrapped to two lines (`current-uncut-1280.png`, `cur-1280.txt`). Every `Section` on the site given no `maxW` takes the narrower width. The `Title` and `CardsLayout` containers carry their own items ([[318456ddabc6]], [[8a3babf21c3c]], `upstream`); the `Section` default has none until this one. A `../ui` fix, for a ui slice beside the shell record.

## Verdict

## Log
