---
title: "Accordion indicator: Chakra v2's 20px filled chevron in the text color to v3's 2px stroke chevron at fg.subtle"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/Accordion.tsx` re-exports Chakra v2's `AccordionIcon` and themes nothing on it: v2 renders a filled chevron (`<path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z">`) at `fontSize: 1.25em` in the trigger's own color. Live legacy `/faq` at 1280 and 375: `.chakra-accordion__icon` is 20px by 20px, `color` and `fill` `rgb(26, 32, 44)` (gray.800, the body text color), the dark heavy chevron at the right edge of every row in `audit/faq/1280/legacy.png`.

## Current

`node_modules/@chakra-ui/react/dist/esm/theme/recipes/accordion.js:49-57`: v3's `itemIndicator` base writes `color: "fg.subtle"` and the icon at `1.2em`, and the `Accordion.ItemIndicator` renders a stroked chevron (`<path d="m6 9 6 6 6-6">`, `stroke-width` 2px, no fill); the ui recipe at `1.2.0` and the sibling's `../ui/src/components/Accordion.recipe.ts` at 8f85a7c write nothing for the slot. `pnpm dev` `/faq`: `.chakra-accordion__itemIndicator` is 19.19px, `color` `rgb(161, 161, 170)` (gray.400), the thin pale chevron in `audit/faq/1280/current.png` (`audit/faq/{1280,375}/probe.json`, `indicator`).

## Verdict

## Log

- 2026-09-26: Filed by the Parity review of the faq page re-port (plan [[bba2bb35f208]]): the route renders the accordion as legacy did (Accordion.ItemIndicator in place of AccordionIcon is the sanctioned slot API, [[2ed11f164573]]), and the indicator's color, weight and size are the ui recipe's. No rule covers the paler, thinner glyph: rule 4 forces the slot rename, not the recipe's color. Regression on shell; the fix belongs in ../ui's Accordion.recipe.ts (the itemIndicator slot: color inherit and the icon at 1.25em, with legacy's filled glyph if the ui wraps the indicator), a ui slice beside the shell record, not the faq route's.
