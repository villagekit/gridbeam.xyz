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
