---
title: FAQ A supplier near me isn't listed. Can I add them? added
status: fixed
route: /faq
axis: copy
kind: added
---
## Legacy

No such question.

## Current

`app/faq/page.tsx:207,209-212` in Suppliers: "A supplier near me isn't listed. Can I add them?": "Yes — the suppliers page explains the submission process. We're keen to add any legitimate supplier of 40 mm grid beam or panels.".

## Verdict

plan b52b62e2

## Log

- 2026-09-25: Regression (faq grilling F6). The added question is removed; legacy's FAQ had no such question.
