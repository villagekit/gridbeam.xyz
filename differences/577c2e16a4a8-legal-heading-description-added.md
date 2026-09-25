---
title: Legal heading description added
status: regression
route: /legal
axis: copy
kind: added
---
## Legacy

`CardsLayout.tsx:21` `<Title>{title}</Title>` with no `description`: `audit/legal/dom/legacy.txt:8-9` goes from the heading straight to the first card.

## Current

`app/legal/page.tsx:40` `description="The legal small-print, kept as small as possible."` (`audit/legal/dom/current.txt:11`).

## Verdict

## Log

- 2026-09-25: Regression (legal grilling L1). No description line under the heading, as legacy.
