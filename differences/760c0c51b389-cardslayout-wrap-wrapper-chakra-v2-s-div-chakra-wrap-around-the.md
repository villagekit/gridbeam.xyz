---
title: "CardsLayout wrap wrapper: Chakra v2's div.chakra-wrap around the ul removed"
status: open
route: shell
axis: code
kind: removed
---
## Legacy

Chakra v2's `Wrap` renders two elements, `div.chakra-wrap` around `ul.chakra-wrap__list`, the outer div carrying the consumer's `sx` (`overflow: visible`) and the list carrying `listStyleType: none`, `padding: 0` and the gap: on the live legacy `/tools-and-resources` the card's chain reads `li[aria-label=Cutting planner]`, `div`, `ul.chakra-wrap__list`, `div.chakra-wrap`, `div.chakra-container` (`audit/_probe4a78/ul-probe-readings.txt`, the `parentTag` and `parentClass` fields), from `packages/ui-page/src/components/layouts/CardsLayout.tsx:24` at `fce357d`.

## Current

Chakra v3's `Wrap` is one `chakra.div` with the flex styles on itself (`node_modules/@chakra-ui/react/dist/esm/components/wrap/wrap.js:9-27`, 3.35.0), so `../ui/src/components/layouts/CardsLayout.tsx:24` at `ca72207` (`Wrap as="ul" gap="8" justify="center" overflow="visible"`) renders `ul.chakra-wrap` as a direct child of `div.chakra-container`: the outer div and the `chakra-wrap__list` class are gone, and the overflow sits on the `ul`. No visible effect: the `ul` reads the same padding, margin, list style, gap and width as legacy's list at 1280 and 375, and nothing on the site or in the package selects either class. A code reading of the upgrade, filed by the reviews of plan 4a780ccf1f6a and not judged.

## Verdict

## Log

- 2026-09-28: Filed by the Standards, Spec and Parity reviews of the ui CardsLayout wrap slice (plan 4a780ccf1f6a), which no rule of 2032533f sanctions by an agent's hand; likely rule 4, upgrade-forced, for the operator on the shell verdicts plan 77cf83a1285a. The list role itself is 2417fc2e82e5, upstream at ui ca72207.
