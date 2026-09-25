---
title: "Story cards: named section region to article"
status: fixed
route: /
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/stories/item.tsx:37` `<HoverCardContainer as="section" aria-label={title}>`; `region "What's a Grid Unit"` in `audit/_root/dom/legacy.aria.yaml`.

## Current

`app/_components/StoryCard.tsx:49-51` `<LinkBox as="article" aria-label={title}>`; `article "What's a Grid Unit"` in `audit/_root/dom/current.aria.yaml`.

## Verdict

plan e332105c3b52

## Log

- 2026-09-12: A `StoryCard` difference, filed on `/` where first met; the stories ledger cites it.
