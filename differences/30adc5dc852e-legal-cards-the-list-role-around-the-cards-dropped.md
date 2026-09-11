---
title: "Legal cards: the list role around the cards dropped"
status: regression
route: /legal
axis: accessibility
kind: changed
---
## Legacy

`CardsLayout.tsx:24` `Wrap` renders `<ul class="chakra-wrap__list">` around the three cards: `audit/legal/dom/legacy.aria.yaml:23` a `list` holding them.

## Current

`app/legal/page.tsx:52` `<SimpleGrid ...>`: no `list` node under `main` in `audit/legal/dom/current.aria.yaml`.

## Verdict

## Log

- 2026-09-12: The shell cause is the CardsLayout item 8a3babf21c3c; this item is the route's outcome.
