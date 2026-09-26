---
title: FAQ section Sustainability to Lifespan and reuse
status: fixed
route: /faq
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:149-209` category "Sustainability" (4 questions).

## Current

`app/faq/page.tsx:149-176` `heading: 'Lifespan and reuse'`, `slug: 'lifespan'` (2 questions: recycling and sustainability); the other two moved to The system.

## Verdict

plan 241b65da8226

## Log

- 2026-09-25: Regression (faq grilling F2). Legacy's "Sustainability" heading returns with its four questions. The two surviving Returns & Support questions (contact support, custom design) sit under "Support": rule 2 removes the returns, and the word with them (operator, F2).

- 2026-09-26: From the faq split (plan [[7f0b60d948c5]]): the verdict's premise misplaces one question. Legacy had the custom design question under Other (apps/gridkit/pages/faq.tsx:304-329 at fce357d), not under Returns & Support; only the contact support question was there. The verdict's letter still names both questions and the section, [[62ebc1fe6962]] agrees, and Other's other question is the sanctioned removal [[805d395bccce]], so the copy slice [[241b65da8226]] ships a Support section with the two and no Other section. The operator may correct it by a note here before that slice runs.
