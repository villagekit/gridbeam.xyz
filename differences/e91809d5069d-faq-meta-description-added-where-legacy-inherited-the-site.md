---
title: FAQ meta description added where legacy inherited the site default
status: open
route: /faq
axis: copy
kind: added
---
## Legacy

No `description` on the `NextSeo` (`apps/gridkit/pages/faq.tsx:335`); the site default from `apps/gridkit/pages/_app.tsx:49` renders.

## Current

`app/faq/page.tsx:18-19,22` `description = 'Frequently asked questions about grid beam — what it is, how to build with it, where to find parts.'`, also as `openGraph.description` and `twitter.description`.

## Verdict

## Log
