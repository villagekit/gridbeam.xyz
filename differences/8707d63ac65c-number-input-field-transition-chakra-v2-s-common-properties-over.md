---
title: "Number input field transition: Chakra v2's common properties over 0.2s removed"
status: open
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
