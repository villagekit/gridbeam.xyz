---
title: "Toolbar variant colors: the theme's literal rest and focus colors under a consumer's sx merge to two CSS variables the recipe reads and a consumer sets"
status: open
route: shell
axis: code
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0`, the `toolbar` variant at `core/ui/src/components/Button.tsx:123,136` of `../gridkit` at the `v0.9.0` tag: the rest color and the `_focus` color are literals, `gray.700`. A consumer changes them through Chakra v2's `sx`, which merges into the variant's style object at the top level: the nav toggle writes `sx={{ color: 'gray.900' }}` (`packages/ui-nav/src/components/NavHeader.tsx:82-88` at `fce357d`), and the sandbox's off toggles write `sx={{ _focus: {}, color: 'gray.400' }}` (`gridkit@v0.9.0 core/sandbox/src/controls/index.tsx:169,178`), the empty `_focus` erasing the variant's focus mapping so the focus color falls to the rest color.

## Current

`../ui/src/components/Button.tsx:112,123`: the variant's rest color is `var(--toolbar-color, {colors.gray.700})` and its focus color `var(--toolbar-focus-color, {colors.gray.700})`; a consumer sets the variables through the `css` prop: the nav toggle `css={{ '--toolbar-color': 'colors.gray.900' }}` (`../ui/src/components/nav/NavHeader.tsx:84`), the sandbox's off toggles `{ _focus: {}, '--toolbar-color': 'colors.gray.400', '--toolbar-focus-color': 'colors.gray.400' }` (`../gridkit/core/sandbox/src/controls/index.tsx`, the two `IconButton`s after plan ea455fbe31c4's commit). The mechanism: Chakra v3 emits a recipe's styles inside the `recipes` cascade layer and the `css` prop and style props unlayered (`@chakra-ui/react` 3.35.0 `styled-system/cva.js:46`), so a consumer's `color` beats every state of the variant whatever their specificity, and an empty `_focus` in `css` emits no rule; a variable set unlayered reaches the layered rule that reads it and fights no state. The rendered colors match legacy on every consumer and state (plans 61a42a0adbc8, b574a94092bf and ea455fbe31c4, `audit/_probeea45/review-legacy.json` beside `review-current.json`); this item records the code shape alone, found by the Parity review of plan ea455fbe31c4, which the interaction items [[c440126f7064]], [[d09f95feb1b1]] and [[014c146699e5]] mention only in their mechanism prose.

## Verdict

## Log

- 2026-09-28: Filed by the implementing agent of plan ea455fbe31c4 on its Parity review's finding: a code-axis difference no item recorded, for the ui and sandbox variable shape that the two earlier toolbar slices and this one wrote. Left open for the operator's judgment, likely rule 4 (upgrade-forced by Chakra v3's cascade layers), which the agent does not sanction (decision 2032533f).
