---
title: "Hero subhead: two paragraphs merged into one"
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:90-98` two `<Text fontSize={textSize}>` blocks stacked in the column; `audit/_root/1280/legacy.png` hero.

## Current

`app/page.tsx:119-125` one `<Text>` holding both sentences; `audit/_root/1280/current.png` hero.

## Verdict

## Log
