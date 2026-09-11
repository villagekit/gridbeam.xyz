---
title: "Hero CTA: Buy a Grid Kit to Browse designs"
status: open
route: /
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:101-103` `<LinkButton as={NextLink} href="/store/starter_kit" size={buttonSize}>Buy a Grid Kit</LinkButton>`.

## Current

`app/page.tsx:127-129` `<LinkButton as={NextLink} href="/designs" size="lg">Browse designs</LinkButton>`.

## Verdict

## Log

- 2026-09-12: Rule 2 (no e-commerce) covers the store link's removal; the replacement label and target are new copy for the operator.
