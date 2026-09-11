---
title: Open Graph video removed
status: regression
route: shell
axis: code
kind: removed
---
## Legacy

`apps/gridkit/pages/_app.tsx:61-66`: `videos: [{ url: 'https://res.cloudinary.com/villagekit/video/upload/c_limit,dpr_auto,f_auto,w_1280,q_40/v1/gridkit.nz/gridkit-coffee-table-website_bqmjpv', alt: 'Assembly of a coffee table made from Grid Kit' }]`.

## Current

No `openGraph.videos` anywhere in `app/`.

## Verdict

## Log
