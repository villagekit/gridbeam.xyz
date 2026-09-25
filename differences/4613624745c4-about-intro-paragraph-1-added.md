---
title: About intro paragraph 1 added
status: regression
route: /about
axis: copy
kind: added
---
## Legacy

No intro: the first block after the heading is the caption "Grid Kit is a modular system based on a 40mm grid." (`apps/gridkit/pages/about.tsx:18-24`).

## Current

`app/about/page.tsx:51-56` "Grid beam is a beam — wood, aluminium, or steel — drilled with regularly-spaced holes along its length. Bolt the beams together with a hex key and you have a reconfigurable structure: shelves, desks, beds, kitchens, market stalls, even bicycles and trailers."

## Verdict

## Log

- 2026-09-25: Regression (about grilling A2). The intro block is removed; legacy opens with the first caption.
