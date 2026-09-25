---
title: "How to be listed paragraph: How to apply"
status: regression
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:150-156` "How to apply. Contact us with your shop URL and a short blurb about what you make." "How to apply." is a bold `Span` (`:151`); "Contact us" links to `/contact` (`:152-154`).

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q5). The "How to be listed" section is removed; the decision names no such section, and Contact is in the footer.
