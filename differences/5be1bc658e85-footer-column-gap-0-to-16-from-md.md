---
title: "Footer column gap: 0 to 16 from md"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`packages/ui-page/src/components/Footer.tsx:46`: `spacing={{ base: 8, md: 0 }}`.

## Current

`@villagekit/ui@1.2.0 src/components/layouts/Footer.tsx:46`: `gap={{ base: '8', md: '16' }}`.

## Verdict

## Log
