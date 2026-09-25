---
title: FAQ outdoors question and answer rewritten
status: regression
route: /faq
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:118,121-122` "Is the wood suitable for outdoors?": "Grid Kit is designed primarily for indoor use. If you want to use it outdoors, consider treating the wood with a suitable finish for added protection."

## Current

`app/faq/page.tsx:108,110` "Can I use grid beam outdoors?": "With a finish applied, yes. Untreated indoor-grade wood will degrade outdoors quickly. Aluminium beams (where available from a supplier) handle weather without treatment."

## Verdict

## Log

- 2026-09-25: Regression (faq grilling F3). Ships as legacy with the swap: "Is the wood suitable for outdoors?" / "Grid beam is designed primarily for indoor use. If you want to use it outdoors, consider treating the wood with a suitable finish for added protection."
