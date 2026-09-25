---
title: "Testimonial row gap: 16/8 to 10/6"
status: fixed
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:147-151` `<Stack direction={isWideScreen ? 'row' : 'column'} spacing={isWideScreen ? '16' : '8'}>`.

## Current

`app/page.tsx:146-150` `<Stack direction={{ base: 'column', lg: 'row' }} gap={{ base: 6, lg: 10 }}>`.

## Verdict

plan 159c621d8a1a

## Log
