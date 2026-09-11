---
title: "Tools and resources heading outline: h1, h2 to h1, h2, three h3, h2, five h3"
status: regression
route: /tools-and-resources
axis: accessibility
kind: changed
---
## Legacy

`audit/tools-and-resources/dom/legacy.aria.yaml:22` `heading "Tools and resources" [level=1]` then `heading "Cutting planner" [level=2]`.

## Current

`audit/tools-and-resources/dom/current.aria.yaml:23,26,40` `heading "Tools & resources" [level=1]`, `heading "Tools" [level=2]` with three `[level=3]` cards, `heading "Resources" [level=2]` with five `[level=3]` cards (`app/tools-and-resources/page.tsx:116,128,147`; the card level is the shell LinkCard heading item).

## Verdict

## Log
