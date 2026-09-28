---
title: Become a supplier button
status: fixed
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:158-160` `<LinkButton as={NextLink} href="/contact">Become a supplier</LinkButton>`.

## Verdict

plan 3ba33b316c3c

## Log

- 2026-09-25: Regression (suppliers grilling Q5). The "How to be listed" section is removed; the decision names no such section, and Contact is in the footer.
