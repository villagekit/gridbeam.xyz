---
title: Legal meta description added where legacy inherited the site default
status: open
route: /legal
axis: copy
kind: added
---
## Legacy

No `description` anywhere in the chain (`packages/applet-legal/src/pages/legal.tsx`, `CardsLayout.tsx:9-12`); the live page carries the site default from `apps/gridkit/pages/_app.tsx:49`.

## Current

`app/legal/page.tsx:21,25` `description = 'Privacy policy and licensing information for gridbeam.xyz.'`, also as `openGraph.description` and `twitter.description`.

## Verdict

## Log
