---
title: "twitter:site @villagekit removed"
status: regression
route: shell
axis: code
kind: removed
---
## Legacy

`apps/gridkit/pages/_app.tsx:70`: `twitter={{ cardType: 'summary_large_image', site: '@villagekit' }}`.

## Current

`app/layout.tsx:44-48`: `twitter: { card, title, description }`, no `site`.

## Verdict

## Log
