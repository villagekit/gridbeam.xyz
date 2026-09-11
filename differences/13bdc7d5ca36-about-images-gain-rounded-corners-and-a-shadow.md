---
title: About images gain rounded corners and a shadow
status: regression
route: /about
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/about.tsx:26-107` plain ui-media `Image`; `packages/ui-media/src/image.tsx:183-202` adds no radius or shadow; flush corners in `audit/about/1280/legacy.png`.

## Current

`app/about/page.tsx:229-242` `AboutPhoto` `borderRadius="xl" overflow="hidden" boxShadow="md"`; `audit/about/1280/current.png`.

## Verdict

## Log
