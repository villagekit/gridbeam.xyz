---
title: "Accordion trigger: blackAlpha.50 hover fill removed"
status: regression
route: shell
axis: interaction
kind: removed
---
## Legacy

Chakra v2's accordion theme (`@chakra-ui/theme`, `baseStyleButton`) sets `_hover: { bg: 'blackAlpha.50' }` with `transitionProperty: 'common'` on `AccordionButton`; `@villagekit/ui@0.9.0 src/components/Accordion.tsx:12-17` overrides only `display`, `justifyContent`, `paddingX` and `paddingY`, so the fill stays. Consumed by `apps/gridkit/pages/faq.tsx:350`.

## Current

`@villagekit/ui@1.2.0 src/components/Accordion.recipe.ts:1-24` defines no `_hover` on `itemTrigger`, and Chakra v3's `accordionSlotRecipe` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/accordion.js`) has only `_focusVisible` and `_disabled` there. The question rows on `/faq` (`app/faq/page.tsx:308`) have no hover fill. Not visible in a static screenshot; read from the theme source.

## Verdict

## Log

- 2026-09-12: Filed on shell from plan 848b026f: the Accordion is a `@villagekit/ui` component; only `/faq` consumes it on both sides.
