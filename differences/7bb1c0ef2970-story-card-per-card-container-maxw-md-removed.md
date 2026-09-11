---
title: "Story card: per-card Container maxW md removed"
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/stories/item.tsx:39-40` each card's content in `<Container maxW="md">`.

## Current

`app/_components/StoryCard.tsx:48-61` the grid column sets the width; no per-card cap. From code.

## Verdict

## Log

- 2026-09-12: A `StoryCard` difference, filed on `/` where first met; the stories ledger cites it.
