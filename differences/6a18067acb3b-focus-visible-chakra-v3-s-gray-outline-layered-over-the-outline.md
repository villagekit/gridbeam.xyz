---
title: "Focus-visible: Chakra v3's gray outline layered over the outline shadow"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/Button.tsx:50-51` `_focus: { boxShadow: theme.shadows.outline }` and nothing else: focused buttons, icon buttons, selects and inputs all show one cyan ring (measured on `/tools/cutting-planner`: `rgba(0,163,196,0.5) 0 0 0 2px` on buttons, `0 0 0 1px` on the select, `0 1px 0 0` under the flushed inputs; `outline` transparent).

## Current

`@villagekit/ui@1.2.0 src/components/Button.tsx:31` keeps `_focus: { boxShadow: 'outline' }`, and Chakra v3's global `:focus-visible` adds `outline: rgb(161,161,170) solid 2px` on top; the `NumberInput` and `Select` wrappers get only the gray `outline ... solid 1px` with `box-shadow: none` (measured on `/tools/cutting-planner` by Tab-focusing each control). Found on the cutting planner; filed on `shell` since it is the theme's. The dropped input focus colour is [[dc60b9b9c1bf]].

## Verdict

## Log
