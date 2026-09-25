---
title: FAQ section Sustainability to Lifespan and reuse
status: regression
route: /faq
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:149-209` category "Sustainability" (4 questions).

## Current

`app/faq/page.tsx:149-176` `heading: 'Lifespan and reuse'`, `slug: 'lifespan'` (2 questions: recycling and sustainability); the other two moved to The system.

## Verdict

## Log

- 2026-09-25: Regression (faq grilling F2). Legacy's "Sustainability" heading returns with its four questions. The two surviving Returns & Support questions (contact support, custom design) sit under "Support": rule 2 removes the returns, and the word with them (operator, F2).
