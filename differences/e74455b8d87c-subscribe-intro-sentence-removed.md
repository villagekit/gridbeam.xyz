---
title: Subscribe intro sentence removed
status: fixed
route: /subscribe
axis: copy
kind: removed
---
## Legacy

`packages/applet-subscribe/src/page.tsx:48-53` "Subscribe to stay tuned for news and updates, we have a journey ahead! " followed by `<span role="img" aria-label="seedling">🌱</span>`, centered.

## Current

No equivalent sentence in `app/subscribe/page.tsx`; the three paragraphs that replace it are their own items.

## Verdict

plan eb43bbfbe5f2

## Log

- 2026-09-25: Regression (subscribe grilling S2). Ships as legacy verbatim, centered: "Subscribe to stay tuned for news and updates, we have a journey ahead! " followed by the seedling emoji with its aria-label.
