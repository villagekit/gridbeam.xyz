---
title: "Card dates: numeric d/m/y to short month on every card"
status: regression
route: /stories
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/stories/item.tsx:90-94` `toLocaleDateString('en-NZ', { day: 'numeric', month: 'numeric', year: 'numeric' })`: "29/11/2024", "17/9/2017" on all ten cards (`audit/stories/dom/legacy.txt`).

## Current

`app/_components/StoryCard.tsx:42-46` `month: 'short'`: "29 Nov 2024", "17 Sept 2017" (`audit/stories/dom/current.txt`).

## Verdict

## Log

- 2026-09-12: On `/` the same card only gains a date (2a6f442cbd7f, `added`); on /stories both sides show one, so the format is its own `changed` difference.
