---
title: "Body text size breakpoint: lg to md"
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:61-70` `textSize = isWideScreen ? 'xl' : 'lg'` with `isWideScreen` true from `lg`, used by every paragraph on the page.

## Current

`app/page.tsx:119,187,294,319` `fontSize={{ base: 'lg', md: 'xl' }}`: `xl` from `md`. From code; `audit/_root/768/current.png` paragraphs are `xl` where legacy's are `lg`.

## Verdict

## Log
