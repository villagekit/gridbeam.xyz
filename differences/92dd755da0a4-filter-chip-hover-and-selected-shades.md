---
title: Filter chip hover and selected shades
status: regression
route: /stories
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/option.tsx:37-41,64-69` hover `backgroundColor: ${colorScheme}.100`, `borderColor: ${colorScheme}.300`; selected `.50` and `.200`.

## Current

`app/stories/StoriesBrowser.tsx:104-105,120-124` selected `bg: 'colorPalette.50'`, `borderColor: 'colorPalette.300'`; hover the same `.50` and `.300`. From code.

## Verdict

## Log
