---
title: Contact heading description added
status: open
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
