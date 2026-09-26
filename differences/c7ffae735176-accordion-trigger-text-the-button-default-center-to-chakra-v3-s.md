---
title: "Accordion trigger text: the button default center to Chakra v3's textAlign start, so a wrapped question left-aligns"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/Accordion.tsx:12-17` (the theme as the sibling's first commit a5cbe36 carries it): the accordion button's base style writes `display: flex`, `justifyContent: space-between` and the paddings, and no `textAlign`, so the button keeps the browser's default `text-align: center`, which the `<p>` label inherits. Live legacy `/faq` at 375: the trigger and its label read `text-align: center`, and the two questions that wrap onto two lines (`Do I need any special tools to assemble my Grid Kit?`, the custom design question) render centered, `audit/faq/375/legacy.png`; at 1280 every question fits one line and the difference is invisible.

## Current

`node_modules/@chakra-ui/react/dist/esm/theme/recipes/accordion.js:19`: Chakra v3's `itemTrigger` base writes `textAlign: "start"`, which the site's `createSystem(defaultConfig, config)` (`app/theme.ts`) keeps, the ui recipe at `1.2.0` (`dist/components/Accordion.recipe.js`) and the sibling's `../ui/src/components/Accordion.recipe.ts` at 8f85a7c writing no `textAlign` of their own. `pnpm dev` `/faq` at 375: the trigger and its `<p>` read `text-align: start`, and the two wrapped questions render left-aligned, `audit/faq/375/current.png` (`audit/faq/375/probe.json`, `wrappedLabel`). Until the faq page re-port the route's own `textAlign="left"` on the span label (`55b8453f7512`) hid this behind a route difference.

## Verdict

## Log

- 2026-09-26: Filed by the Parity review of the faq page re-port (plan [[bba2bb35f208]]), which removed the route's textAlign on the label ([[55b8453f7512]]) and uncovered the recipe's value. No rule covers a left-aligned wrapped question where legacy centered it: Chakra v3 writes the value, but the ui recipe can reset it, so it is not upgrade-forced. Regression on shell; the fix is a line in ../ui's Accordion.recipe.ts (itemTrigger textAlign center, or the button default), a ui slice beside the shell record, not the faq route's.
