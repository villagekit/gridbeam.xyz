---
title: Become a supplier button to /contact
status: open
route: /suppliers
axis: interaction
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:157-160` `Flex justifyContent="center"` > `LinkButton as={NextLink} href="/contact"` in the default `primary` variant (`@villagekit/ui@1.2.0 src/components/Button.tsx:66-67`: white on `primary.400`, `primary.500` and `scale(1.08)` on hover).

## Verdict

## Log
