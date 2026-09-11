---
title: Captions gain lineHeight 1.4
status: regression
route: /about
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/about.tsx:128-130` `<Text fontSize={['xl', null, '2xl']} sx={{ textAlign: 'center' }}>`.

## Current

`app/about/page.tsx:245-250` `<Text fontSize={{ base: 'xl', md: '2xl' }} lineHeight="1.4" textAlign="center">`.

## Verdict

## Log
