---
title: "Two LinkCards added: an in-page contact link and an external GitHub link"
status: open
route: /subscribe
axis: interaction
kind: added
---
## Legacy

No cards or links in the route body (`packages/applet-subscribe/src/page.tsx:32-64`).

## Current

`app/subscribe/page.tsx:63-78` a `SimpleGrid` of two `LinkCard`s: "Email the maintainer" routes client-side to `/contact` via `linkComponent={NextLink}`; "Watch the repository" sets `isExternal`, which `@villagekit/ui@1.2.0 src/components/LinkCard.tsx:53-54` turns into `target="_blank" rel="noopener noreferrer"`. Whole-card click targets.

## Verdict

## Log
