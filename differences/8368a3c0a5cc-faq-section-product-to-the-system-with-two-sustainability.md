---
title: FAQ section Product to The system, with two Sustainability questions moved in
status: fixed
route: /faq
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:30-148` category "Product" (11 questions, "What is Grid Kit?" to "What add-ons are compatible with Grid Kit?"); "What can I make with Grid Kit?" and "What do you mean by modular?" sit under "Sustainability" (`:151,166`).

## Current

`app/faq/page.tsx:44-147` `heading: 'The system'`, `slug: 'system'` (11 questions): the nine kept Product questions plus "What can I make with it?" and "What does "modular" actually mean here?" (`:137,142`).

## Verdict

plan 241b65da8226

## Log

- 2026-09-25: Regression (faq grilling F2). Legacy's "Product" heading and question order return; "What can I make with grid beam?" and "What do you mean by modular?" go back under Sustainability.
