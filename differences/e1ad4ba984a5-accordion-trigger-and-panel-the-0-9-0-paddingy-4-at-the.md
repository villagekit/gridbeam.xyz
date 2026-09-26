---
title: "Accordion trigger and panel: the 0.9.0 paddingY 4 at the inherited weight to Chakra v3's md size padding 2 at weight medium"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/Accordion.tsx:12-17,26-29`: the accordion theme gives the button and the panel `paddingY: 4` and sets no weight of its own, so the trigger inherits the surrounding weight. Live legacy `/faq`: the trigger (`.css-4xyf51`) reads 16px of padding above and below at weight 400, and the open panel 16px.

## Current

`@villagekit/ui@1.2.0 dist/components/Accordion.recipe.js` writes `paddingY: "4"` on `itemTrigger` and `itemContent` in its `base`, but the site's `createSystem(defaultConfig, config)` (`app/theme.ts:12`) merges it over Chakra's accordion recipe, whose `md` size variant (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/accordion.js:115-122`) writes `py: var(--accordion-padding-y)` on the trigger with the variable at `spacing.2`, after the base, and whose base gives the trigger `fontWeight: "medium"` (`:23`) and the `itemBody` `pt: var(--accordion-padding-y)` and `pb: calc(var(--accordion-padding-y) * 2)` (`:33-35`). The built `/faq` (`.next/server/app/faq.html`) reads `--accordion-padding-y: var(--chakra-spacing-2)` on the root. Without a route's own `paddingY` props the trigger renders 8px above and below at weight 500, and the body 8px above and 16px below the content's padding. On `/faq` today the route's `paddingY="3"` props override the trigger and stack on the panel (`6c31193ec773`), and the label is a bold span (`55b8453f7512`), so the residue is hidden there until the page re-port removes both.

## Verdict

## Log

- 2026-09-26: Filed at the faq split (plan [[7f0b60d948c5]]) from the review of the page re-port slice [[bba2bb35f208]], which removes the route's paddingY props ([[6c31193ec773]]) and the bold span ([[55b8453f7512]]) and would otherwise read the published recipe's residue as its own. No rule covers a shorter, heavier trigger, so regression. Fixed already in ../ui by the recipes and provider slice [[45d6f5634a11]], commit 540e9c3, src/components/Accordion.recipe.ts: fontWeight inherit on the trigger, the md size's --accordion-padding-y at spacing.4, the itemBody padded 4 above and below; that slice's items named only the separator ([[cb9dce13acba]]) and the hover fill ([[cb528cbc05e6]]). Moved to upstream on that commit; the bump plan [[99f2fe62c62f]] checks on /faq at 1280, after the re-port, the trigger's computed padding 16px above and below at weight 400 and the open panel's body 16px above and below, legacy's readings, then moves this to fixed.
