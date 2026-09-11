---
title: "LinkCard heading: h2 to h3"
status: regression
route: shell
axis: accessibility
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/LinkCard.tsx:52` `<Heading size="md" sx={{ textAlign: 'center' }}>` with no `as`, so Chakra v2's default `h2`: `audit/legal/dom/legacy.aria.yaml:25,30,35` `heading "Return policy" [level=2]` etc.; `audit/tools-and-resources/dom/legacy.aria.yaml` `heading "Cutting planner" [level=2]`.

## Current

`@villagekit/ui@1.2.0 src/components/LinkCard.tsx:40` `<Heading as="h3" size="md" textAlign="center">`: `audit/legal/dom/current.aria.yaml:28,32` `heading "Privacy policy" [level=3]`, `heading "Site licence" [level=3]`; every card on `/tools-and-resources` and `/subscribe` is `[level=3]` too.

## Verdict

## Log

- 2026-09-12: Filed on shell from plan 848b026f. The routes that now put an h2 section heading above the cards have their own heading-outline items.
