---
title: Mobile menu list padding 4 to 2
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`packages/ui-nav/src/components/NavMobileMenu.tsx:51-56`: `containerProps={{ alignItems: 'flex-start', sx: { paddingY: 4 } }}` on the list.

## Current

`@villagekit/ui@1.2.0 src/components/nav/NavMobileMenu.tsx:66`: `containerProps={{ alignItems: 'flex-start', py: 2 }}`.

## Verdict

## Log
