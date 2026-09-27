---
title: "Input field hover: Chakra v2's gray.300 border under the pointer removed"
status: open
route: shell
axis: interaction
kind: removed
---
## Legacy

Chakra v2's input field wrote `_hover: { borderColor: gray.300 }` in its `outline` variant, the default (the packed v2 theme at 3.3.1, the version legacy's `pnpm-lock.yaml` pins, `components/input.js:118-120`, under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/theme/dist/`), and the 0.9.0 `Input` wrapper passed it through: on the live site `/designs` at 1280, the search bar's `input[type="search"]` (`components/catalogue/search-bar.tsx:31` at `fce357d`) reads a border of `rgb(203, 213, 224)` under the pointer where at rest it reads `rgb(226, 232, 240)` (the Spec review's probe of plan 6bc0d3ba08dc, `scratchpad/input-review-probe.mjs`, `input-review.json`).

## Current

Chakra v3's input recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/input.js`) writes no `_hover` in any variant, and the ui `inputRecipe` (`../ui/src/components/Input.tsx:26-44`) writes the focus and the sizes alone: on `pnpm dev` under the `file:../ui` override, `/designs` at 1280, the same input (`app/_components/catalogue/SearchBar.tsx:54`) reads `rgb(226, 232, 240)` under the pointer, the rest color. The same on the published `@villagekit/ui@1.2.0`. The number inputs on `/tools/cutting-planner` show no hover on either side, legacy's being `variant="flushed"` (`../node-modules/packages/applet-cutting-planner/src/components/beam-row.tsx:73`), whose v2 variant wrote no `_hover`.

## Verdict

## Log

- 2026-09-27: Filed by the Spec review of the ui Select slice [[6bc0d3ba08dc]], which asked whether the `Input` and `NumberInput` recipes lack the hover and transition v2's input base gave the select; not from that change. Not judged. The mechanism is the package's input recipe, so a fix is a ui slice beside the shell record.
