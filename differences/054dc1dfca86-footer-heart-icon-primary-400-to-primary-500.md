---
title: "Footer heart icon: primary.400 to primary.500"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`packages/ui-brand/src/components/Footer.tsx:57`: `<Icon as={FaHeart} title="love" sx={{ color: 'primary.400' }} />`.

## Current

`app/_components/SiteFooter.tsx:95`: `<Icon display="inline-block" verticalAlign="-0.125em" boxSize="3.5" color="primary.500">`.

## Verdict

## Log
