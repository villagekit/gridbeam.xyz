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

- 2026-09-28: From the tools and resources split (plan a0b4d829f7a9): the shell cause is 2417fc2e82e5 (Chakra v3's Wrap renders a div, not v2's ul), filed at the split; 8a3babf21c3c is the width and the consumption. The ui slice minted at that split fixes the ul, and this route's record consumes CardsLayout.
