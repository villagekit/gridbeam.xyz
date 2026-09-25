---
title: Become a supplier button
status: regression
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:158-160` `<LinkButton as={NextLink} href="/contact">Become a supplier</LinkButton>`.

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q5). The "How to be listed" section is removed; the decision names no such section, and Contact is in the footer.
