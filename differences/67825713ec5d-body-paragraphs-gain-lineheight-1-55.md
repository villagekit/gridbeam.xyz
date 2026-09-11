---
title: Body paragraphs gain lineHeight 1.55
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:90,96,189,323,346,427` `<Text fontSize={textSize}>` with no `lineHeight`.

## Current

`app/page.tsx:119,187,294,319` and `app/_components/landing/TypingDesignSection.tsx:61` `<Text fontSize={{ base: 'lg', md: 'xl' }} lineHeight="1.55">`.

## Verdict

## Log
