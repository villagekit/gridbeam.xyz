---
title: "About heading size: 2xl to the default xl"
status: regression
route: /about
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/about.tsx:14` `<Title size="2xl">`; `audit/about/1280/legacy.png`.

## Current

`app/about/page.tsx:44` `<Title>` with no `size`, so the `xl` default (`node_modules/@villagekit/ui/src/components/Heading.tsx:61-63`); smaller in `audit/about/1280/current.png`.

## Verdict

## Log
