---
title: Visit website link label
status: regression
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:200-202` `<LinkButton href={supplier.website} variant="secondary" size="sm" isExternal>Visit website</LinkButton>`, the same label on every card (`https://gridkit.nz`, `https://gridbeamsupply.com` from `content/suppliers.ts:26,38`).

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q3). The "Visit website" button goes; the supplier's name is the link to its site (rules 2 + 5: the decision's page exists to link out).
