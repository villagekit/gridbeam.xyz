---
title: "Contact card: the list role around the card dropped"
status: regression
route: /contact
axis: accessibility
kind: changed
---
## Legacy

`packages/ui-page/src/components/layouts/CardsLayout.tsx:24` `<Wrap ...>` renders a `<ul class="chakra-wrap__list">` around the card: `audit/contact/dom/legacy.aria.yaml:23-28` a `list` holding the img, heading, paragraph and link (no `listitem`, since the card does not pass `as="li"`).

## Current

`app/contact/page.tsx:52-104` two `VStack`s in a `VStack`: no `list` or `listitem` under `main` in `audit/contact/dom/current.aria.yaml:22-35`.

## Verdict

## Log

- 2026-09-12: The shell cause is the CardsLayout item 8a3babf21c3c; this item is the route's outcome.

- 2026-09-28: From the tools and resources split (plan a0b4d829f7a9): the shell cause is 2417fc2e82e5 (Chakra v3's Wrap renders a div, not v2's ul), filed at the split; 8a3babf21c3c is the width and the consumption. The ui slice minted at that split fixes the ul, and this route's record consumes CardsLayout.
