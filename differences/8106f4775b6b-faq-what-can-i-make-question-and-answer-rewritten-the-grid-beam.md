---
title: FAQ What can I make question and answer rewritten, the Grid Beam link dropped
status: fixed
route: /faq
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:151,153-162` "What can I make with Grid Kit?": "More like, what can’t you make with it! Grid Kit is designed to adapt to almost any structure or furniture you can think of, from shelves and desks to beds and creative storage solutions." then "The original inventor of Grid Beam made bicycles, electrical vehicles, trailers, and more. Anything is possible." (link "Grid Beam" to `https://gridbeam.xyz`).

## Current

`app/faq/page.tsx:137,139` "What can I make with it?": "Practically anything that bolts together: beds, desks, shelves, kitchens, market stalls, even bicycles and trailers. The Jergensons' original grid beam covered that whole range." (no link).

## Verdict

plan 241b65da8226

## Log

- 2026-09-25: Regression (faq grilling F3). Ships as legacy with the swap, two paragraphs: "More like, what can't you make with it! Grid beam is designed to adapt to almost any structure or furniture you can think of, from shelves and desks to beds and creative storage solutions." then "The original inventor of grid beam made bicycles, electrical vehicles, trailers, and more. Anything is possible." Legacy's link on "Grid Beam" to gridbeam.xyz is this site now, so no link (rule 1).
