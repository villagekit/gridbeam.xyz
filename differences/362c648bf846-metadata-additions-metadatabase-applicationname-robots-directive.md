---
title: "Metadata additions: metadataBase, applicationName, robots directive, twitter title, description and image"
status: open
route: shell
axis: code
kind: added
---
## Legacy

`apps/gridkit/pages/_app.tsx:46-72` sets none of these; `next-seo` rendered `twitter:card` and `twitter:site` only.

## Current

`app/layout.tsx:29,35,49-52`: `metadataBase`, `applicationName: 'gridbeam.xyz'`, `robots: { index: true, follow: true }`, `twitter.title` and `twitter.description`; `app/twitter-image.tsx` yields `twitter:image` and `twitter:image:alt`.

## Verdict

## Log
