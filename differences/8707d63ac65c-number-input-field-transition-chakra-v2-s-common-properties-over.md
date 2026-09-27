---
title: "Number input field transition: Chakra v2's common properties over 0.2s removed"
status: upstream
route: shell
axis: visual
kind: removed
---
## Legacy

Chakra v2's number input field wrote `transitionProperty: common` and `transitionDuration: normal` (the packed v2 theme at 3.3.1, `components/number-input.js:119-120`, its own copy of the input field base, under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/theme/dist/`), and the 0.9.0 `NumberInput` wrapper passed it through: on the live site `/tools/cutting-planner` at 1280, each of the four beam inputs (`../node-modules/packages/applet-cutting-planner/src/components/beam-row.tsx:72-73` at `fce357d`, `variant="flushed"`) reads `transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform` at `0.2s`, so the focus ring fades in (the Spec review's probe of plan 6bc0d3ba08dc, `scratchpad/input-review-probe.mjs`, `input-review.json`).

## Current

Chakra v3's number input recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/number-input.js`) writes no transition on the input, and the ui `numberInputRecipe` (`../ui/src/components/NumberInput.tsx:36-59`) copies the `inputRecipe`'s focus and sizes, which write none: on `pnpm dev` under the `file:../ui` override, `/tools/cutting-planner` at 1280, the four number inputs (`app/tools/cutting-planner/CuttingPlanner.tsx:366-387`) read `transition: all` at `0s`. The same on the published `@villagekit/ui@1.2.0`. The planner's inputs on the current side are on the default `outline` variant where legacy's are `flushed`, the planner record's (`396c9af0cbd1`); the transition is the recipe's at every variant.

## Verdict

## Log

- 2026-09-27: Filed by the Spec review of the ui Select slice [[6bc0d3ba08dc]], which asked whether the `Input` and `NumberInput` recipes lack the hover and transition v2's input base gave the select; not from that change. Not judged. The number input's hover is not a reading on any route, legacy's planner inputs being `flushed`, so no hover item is filed for it. The mechanism is the package's number input recipe, so a fix is a ui slice beside the shell record, with [[e9d8202a3201]] and [[ade1ef76566c]].

- 2026-09-28: Handed to the ui slice [[59fa9072c63f]], minted beside the shell record at the design pages record's finish (plan [[0bc88eaf5493]], decision 40abdb2f222a): Chakra v2's value written in the ui recipe or wrapper in ../ui, the one ui slice the record's split (call 7) and the applet components slice named for the open form items on shell, blocking the bump plan [[99f2fe62c62f]]. The state stays open until the slice moves it to upstream with the sibling commit; no verdict is written.

- 2026-09-28: Moved to upstream by the ui form recipes slice [[59fa9072c63f]] (decision 28c1a536): fixed in ../ui at commit ae6e4ae on its main (the fieldRecipe, inputRecipe, numberInputRecipe, tableRecipe and Section), read on pnpm dev under the file:../ui override against the live legacy site (the slice's Outcome, its probe's legacy.json and after.json); waits on the operator's publish, which the bump plan [[99f2fe62c62f]] consumes and moves this to fixed.
