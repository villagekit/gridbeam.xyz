---
title: "Tools and resources cards: a ul of li cards to grid divs"
status: regression
route: /tools-and-resources
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/pages/tools-and-resources.tsx:12` `<LinkCard as="li" ...>` inside `CardsLayout`'s `Wrap` (`<ul class="chakra-wrap__list">`): `audit/tools-and-resources/dom/legacy.aria.yaml` `list: - listitem "Cutting planner"` (the `li` named by the HoverCard `aria-label`).

## Current

No `as="li"` on any of the eight `LinkCard`s and no list around them (`app/tools-and-resources/page.tsx:131-161` `SimpleGrid`): no `list` or `listitem` under `main` in `audit/tools-and-resources/dom/current.aria.yaml`.

## Verdict

## Log

- 2026-09-12: The shell cause is the CardsLayout item 8a3babf21c3c; this item is the route's outcome.
