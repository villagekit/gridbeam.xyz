---
title: "Section default width: legacy's container.md, 768px, to the ui's 2xl, 672px"
status: upstream
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

- 2026-09-28: Handed to the ui slice [[59fa9072c63f]], minted beside the shell record at the design pages record's finish (plan [[0bc88eaf5493]], decision 40abdb2f222a): Chakra v2's value written in the ui recipe or wrapper in ../ui, the one ui slice the record's split (call 7) and the applet components slice named for the open form items on shell, blocking the bump plan [[99f2fe62c62f]]. The state stays open until the slice moves it to upstream with the sibling commit; no verdict is written.

- 2026-09-28: Moved to upstream by the ui form recipes slice [[59fa9072c63f]] (decision 28c1a536): fixed in ../ui at commit ae6e4ae on its main (the fieldRecipe, inputRecipe, numberInputRecipe, tableRecipe and Section), read on pnpm dev under the file:../ui override against the live legacy site (the slice's Outcome, its probe's legacy.json and after.json); waits on the operator's publish, which the bump plan [[99f2fe62c62f]] consumes and moves this to fixed.
