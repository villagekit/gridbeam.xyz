---
title: "Option pill radius: Badge default lg to md"
status: regression
route: /designs
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/option.tsx:32-70` a `Badge` with no `borderRadius`, inheriting `@villagekit/ui@0.9.0`'s Badge `borderRadius: 'lg'`.

## Current

`app/_components/catalogue/Catalogue.tsx:327-379` `borderRadius="md"`.

## Verdict

## Log
