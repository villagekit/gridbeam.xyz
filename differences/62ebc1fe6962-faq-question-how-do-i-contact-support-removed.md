---
title: FAQ question How do I contact support? removed
status: regression
route: /faq
axis: copy
kind: removed
---
## Legacy

`apps/gridkit/pages/faq.tsx:292-299` in "Returns & Support": "How do I contact support?" ("Find our contact details here . We’re here to help!", link "here" to `/contact`).

## Current

No equivalent question in `app/faq/page.tsx`; the closing line "Question not answered here? Send us an email..." (`:332-345`) is the nearest text and has its own item.

## Verdict

## Log

- 2026-09-12: Copy: the section it sat in was mostly e-commerce (rule 2), but a support contact question is not, so the operator judges it.

- 2026-09-25: Regression (faq grilling F5). Restored under Support: "How do I contact support?" / "Find our contact details here. We're here to help!" (link on "here" to /contact; legacy's stray space before the period dropped).
