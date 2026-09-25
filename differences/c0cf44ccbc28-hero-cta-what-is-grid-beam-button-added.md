---
title: "Hero CTA: What is grid beam? button added"
status: regression
route: /
axis: copy
kind: added
---
## Legacy

One hero button (`apps/gridkit/pages/index.tsx:101-103`).

## Current

`app/page.tsx:130-132` `<LinkButton as={NextLink} href="/about" variant="secondary" size="lg">What is grid beam?</LinkButton>`, second in an `HStack` (`:126`).

## Verdict

## Log

- 2026-09-25: Regression (grilling Q2). The second hero button is removed; legacy has one.
