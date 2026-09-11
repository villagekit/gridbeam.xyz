---
title: "About column gap: 8 to 8/10"
status: regression
route: /about
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/about.tsx:17` `<VStack spacing="8">`.

## Current

`app/about/page.tsx:49` `<VStack alignItems="stretch" gap={{ base: 8, md: 10 }}>`.

## Verdict

## Log
