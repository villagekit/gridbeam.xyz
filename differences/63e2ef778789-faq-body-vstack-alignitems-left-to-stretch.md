---
title: "FAQ body VStack: alignItems left to stretch"
status: regression
route: /faq
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:340` `alignItems="left"`: not a valid `align-items` keyword, so the declaration is dropped and the flex default applies.

## Current

`app/faq/page.tsx:293` `alignItems="stretch"`. No visible difference in `audit/faq/1280/{legacy,current}.png`: the children are full-width blocks either way.

## Verdict

## Log

- 2026-09-12: Regression by the rule's absence: Chakra v3 does not force the value. The rendered outcome is the same on both sides, which the operator may weigh under rule 5.
