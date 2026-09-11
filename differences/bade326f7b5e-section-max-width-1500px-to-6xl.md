---
title: "Section max width: 1500px to 6xl"
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:472` `<Section ... maxW="1500px">` for every landing section.

## Current

`app/_components/landing/LandingSection.tsx:15` `maxW = '6xl'` (72rem) default; narrower content column at 1280 in `audit/_root/1280/current.png`.

## Verdict

## Log
