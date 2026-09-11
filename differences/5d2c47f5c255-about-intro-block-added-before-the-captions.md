---
title: About intro block added before the captions
status: open
route: /about
axis: visual
kind: added
---
## Legacy

`apps/gridkit/pages/about.tsx:16-24` the `Container` opens with the first centered caption; `audit/about/1280/legacy.png`.

## Current

`app/about/page.tsx:50-67` a left-aligned `VStack gap="5"` of three `fontSize="lg"` paragraphs above the centered captions; `audit/about/1280/current.png`.

## Verdict

## Log
