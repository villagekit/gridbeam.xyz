---
title: Originally on gridkit.nz byline added
status: fixed
route: /stories/building-with-grid-kit
axis: copy
kind: added
---
## Legacy

No such line; the legacy metadata has no `originallyPublishedOn` (`apps/gridkit/pages/stories/building-with-grid-kit.mdx:16-17`).

## Current

`content/stories/building-with-grid-kit.mdx:22` `originallyPublishedOn: 'gridkit.nz'`; `app/stories/[slug]/page.tsx:92-96` renders "· originally on gridkit.nz" after the date (`audit/stories__building-with-grid-kit/dom/current.txt:22`); the same on /stories/2021-winter-newsletter and /stories/2022-newsletter.

## Verdict

plan 9f174b0d4c72

## Log

- 2026-09-12: Note 526d5330 names the byline; filed where first met in the plan's route order.

- 2026-09-25: Regression (story grilling P3, [[dcd8df79a843]]). The editorial note, the originally-on byline and the note component are removed; the historical posts keep "Grid Kit" in their text as legacy published it.
