---
title: "Buy step icon: BsFillBox2HeartFill to FaShoppingBag"
status: fixed
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:238` `<ListIcon as={BsFillBox2HeartFill} />`.

## Current

`app/page.tsx:233` `<Step icon={FaShoppingBag}>`.

## Verdict

plan 159c621d8a1a

## Log

- 2026-09-12: The home lock names the step's text, not its icon.
