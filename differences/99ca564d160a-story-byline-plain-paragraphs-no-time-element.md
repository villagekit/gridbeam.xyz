---
title: "Story byline: plain paragraphs, no time element"
status: fixed
route: /stories/whats-a-grid-unit
axis: accessibility
kind: added
---
## Legacy

No date on the page.

## Current

`app/stories/[slug]/page.tsx:88-97` two `Text` (`p`) nodes; `audit/stories__whats-a-grid-unit/dom/current.aria.yaml:70` `paragraph: 10 October 2024`; on the three "originally on" routes a second `paragraph: · originally on gridkit.nz` whose middle dot is read out. No `<time datetime>`.

## Verdict

plan 9f174b0d4c72

## Log

- 2026-09-12: Story page template, six routes; filed where first met.

- 2026-09-25: Regression (story grilling P2). No publish date on the page, as legacy ([[dcd8df79a843]]).
