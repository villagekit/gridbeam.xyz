---
title: Contact heading description added
status: regression
route: /contact
axis: copy
kind: added
---
## Legacy

`packages/ui-page/src/components/layouts/CardsLayout.tsx:21` `<Title>{title}</Title>` passes no `description`; nothing renders under the h1.

## Current

`app/contact/page.tsx:39` `description="How to reach the gridbeam.xyz maintainer."`.

## Verdict

## Log

- 2026-09-25: Regression (contact grilling K1). No description line under the heading, as legacy.
