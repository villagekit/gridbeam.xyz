---
title: "Privacy policy emphasis: strong to a bold span"
status: regression
route: /legal/privacy-policy
axis: accessibility
kind: changed
---
## Legacy

`packages/applet-legal/src/mdx/privacy-policy.mdx:49,53` `**Buttondown**`, `**Stripe**` compile to `<strong>`: `audit/legal__privacy-policy/dom/legacy.aria.yaml` `paragraph: - strong: Buttondown`.

## Current

`app/legal/privacy-policy/page.tsx:45,134,144,153,154` `<Span fontWeight="bold">` (Chakra v3's `Span`, a plain `<span>`): no `strong` node in `audit/legal__privacy-policy/dom/current.aria.yaml`.

## Verdict

## Log
