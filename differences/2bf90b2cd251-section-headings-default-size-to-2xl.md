---
title: "Section headings: default size to 2xl"
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:186,320,343` `<Heading>` with no `size` (Chakra v2 default `xl`).

## Current

`app/page.tsx:184,291,316` `<Heading as="h2" size="2xl">`; larger in `audit/_root/1280/current.png`.

## Verdict

## Log
