---
title: "Accordion indicator: Chakra v2's 20px filled chevron in the text color to v3's 2px stroke chevron at fg.subtle"
status: upstream
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

- 2026-09-26: Handed to the ui slice [[aff1c5f9a5f2]] minted beside the shell record [[a78b167170b8]] at the finish of the faq record [[7f0b60d948c5]] (decision 40abdb2f222a): an itemIndicator slot in ../ui/src/components/Accordion.recipe.ts (color inherit, the icon at 1.25em) and, for the filled glyph, the ui wrapping ItemIndicator with legacy's path as its default child, the slice deciding that shape; one slice with [[c7ffae735176]], the same recipe; the state stays regression until the sibling commit moves it to upstream.

- 2026-09-26: Fixed in ../ui at commit 8a3b1a2 by the ui slice [[aff1c5f9a5f2]]: an itemIndicator slot in src/components/Accordion.recipe.ts (color inherit, the icon at 1.25em) and Accordion.ItemIndicator wrapped in src/components/Accordion.tsx to render Chakra v2's filled chevron (the AccordionIcon path, fill currentColor, focusable false, aria-hidden true) as its default child, the plan's default shape taken; a child passed in still replaces it. Under the file override on pnpm dev, /faq at 375 and 1280 reads every indicator svg 20x20 in rgb(26, 32, 44), the path's fill rgb(26, 32, 44) and stroke none, and rotate 180deg when open, legacy's readings. Moved to upstream; the bump plan [[99f2fe62c62f]] repeats the probe on the published package and moves this to fixed.
