---
title: "FAQ question text: tertiary regular to secondary bold"
status: regression
route: /faq
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:351` `<Text variant="tertiary">{question}</Text>` inside `AccordionButton`: light, regular weight (`audit/faq/1280/legacy.png`).

## Current

`app/faq/page.tsx:309-317` `<Text as="span" variant="secondary" fontWeight="bold" textAlign="left" flex="1">`: bold, near-black (`audit/faq/1280/current.png`).

## Verdict

## Log
