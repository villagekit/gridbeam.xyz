---
title: "Story cards: separate heading and named link to a heading wrapping the link"
status: regression
route: /
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/stories/item.tsx:70,102-106` `<Heading size="md">{title}</Heading>` plus an empty `<LinkOverlay ... aria-label={title} />`; a `heading` and a `link` each named by the title in `audit/_root/dom/legacy.aria.yaml`.

## Current

`app/_components/StoryCard.tsx:79-89` `<Heading as="h2" size="md">` wrapping `<LinkOverlay>` with the title as its text; one nested `heading` > `link` in `audit/_root/dom/current.aria.yaml`.

## Verdict

## Log

- 2026-09-12: A `StoryCard` difference, filed on `/` where first met; the stories ledger cites it.
