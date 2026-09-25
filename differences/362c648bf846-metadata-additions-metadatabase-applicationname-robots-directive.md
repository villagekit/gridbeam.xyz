---
title: "Metadata additions: metadataBase, applicationName, robots directive, twitter title, description and image"
status: sanctioned
route: shell
axis: code
kind: added
---
## Legacy

`apps/gridkit/pages/_app.tsx:46-72` sets none of these; `next-seo` rendered `twitter:card` and `twitter:site` only.

## Current

`app/layout.tsx:29,35,49-52`: `metadataBase`, `applicationName: 'gridbeam.xyz'`, `robots: { index: true, follow: true }`, `twitter.title` and `twitter.description`; `app/twitter-image.tsx` yields `twitter:image` and `twitter:image:alt`.

## Verdict

rule: upgrade (4).

## Log

- 2026-09-25: Current text is stale after plan ffe8e5d5: `applicationName` is `Grid Beam`, the layout's `twitter` is `card` and `site` only, and `app/twitter-image.tsx` is deleted; `twitter:title`, `twitter:description`, `twitter:image` and `twitter:image:alt` are now filled by Next from the resolved title, description and Open Graph image (`node_modules/next/dist/lib/metadata/resolve-metadata.js`, `postProcessMetadata`). The verdict's rule (upgrade) is unchanged.
