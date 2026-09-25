---
title: FAQ section heading Suppliers added
status: regression
route: /faq
axis: copy
kind: added
---
## Legacy

No such section.

## Current

`app/faq/page.tsx:178-215` `heading: 'Suppliers'`, `slug: 'suppliers'`, a new category of four questions; each question and answer is its own item on this route.

## Verdict

## Log

- 2026-09-25: Regression (faq grilling F6). The added question is removed; legacy's FAQ had no such question.
