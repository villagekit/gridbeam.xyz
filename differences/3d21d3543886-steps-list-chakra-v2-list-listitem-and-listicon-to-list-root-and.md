---
title: "Steps list: Chakra v2 List, ListItem and ListIcon to List.Root and List.Item"
status: sanctioned
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:217-274` `<List>`, `<ListItem>`, `<ListIcon as={...} />` from `@villagekit/ui@0.9.0`.

## Current

`app/page.tsx:212-263` `<List.Root variant="plain">` and `<List.Item>` (Chakra v3's namespace, `node_modules/@chakra-ui/react/dist/esm/components/list/namespace.js`).

## Verdict

rule: upgrade (Chakra v3 replaces List, ListItem and ListIcon with List.Root, List.Item and List.Indicator)

## Log

- 2026-09-12: The `Step` helper the page adds on top has its own item.

- 2026-09-12: The verdict describes what Chakra v3 forces for the list API; the page does not use List.Indicator but a Step helper, which is its own item ([[2fe1d4706b82]]).

- 2026-09-26: The page re-port (plan [[159c621d8a1a]]) writes the list as app/HomePage.tsx:218-274: List.Root with listStyleType="none" and no variant, since v3's default marker variant reverts the list style to the browser's disc where Chakra v2's List defaulted to none, and the plain variant makes each item inline-flex, which collapses the spaces around the inline links; each List.Item holds List.Indicator asChild around Icon as={...} and its text inline, the Step helper gone ([[2fe1d4706b82]]).
