---
title: "Accordion item separator: a uniform 2 px dashed rule to a rule merged with the outline variant"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/Accordion.tsx:19-25` `borderStyle: 'dashed', borderTopWidth: 2`, `&:last-of-type { borderBottomWidth: 2 }`, one rule for every item. `audit/faq/1280/legacy.png` around y=233: thicker, darker dashes about 735 px wide.

## Current

`@villagekit/ui@1.2.0 src/components/Accordion.recipe.ts:6-12` merges with Chakra v3's default `variant: 'outline'` (`item: { borderBottomWidth: '1px' }`), so two border-width declarations land on the item. `audit/faq/1280/current.png` around y=555: thinner, lighter dashes about 703 px wide (the width is the route's container item).

## Verdict

## Log

- 2026-09-12: Filed on shell from plan 848b026f; only `/faq` consumes the Accordion.

- 2026-09-26: Fixed in ../ui by the recipes and provider slice [[45d6f5634a11]], commit 540e9c3: src/components/Accordion.recipe.ts: the recipe defaults to the plain variant, so the item's 2px dashed top rule and the last item's bottom rule are its only borders; measured 2px top and 0 bottom (2px on the last) on /faq at 1280 on both sides. Waits in upstream for the bump plan [[99f2fe62c62f]].
