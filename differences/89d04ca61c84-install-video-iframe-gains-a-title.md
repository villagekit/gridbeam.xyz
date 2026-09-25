---
title: Install video iframe gains a title
status: regression
route: /stories/how-to-furniture-bolts
axis: accessibility
kind: added
---
## Legacy

`apps/gridkit/pages/stories/how-to-furniture-bolts.mdx:326` passes no title to `<YouTube>`.

## Current

`content/stories/how-to-furniture-bolts.mdx:337` `title="How to install furniture bolts"`. From code: the aria snapshots show an unnamed `iframe` on both sides.

## Verdict

## Log

- 2026-09-25: Regression (story grilling P5). Legacy's markup returns; waits for the accessibility pass after M2 ([[eeba2a65cee4]]).
