---
title: "Open Graph title: the title template applied by NextSeo to a bare openGraph.title"
status: regression
route: shell
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/_app.tsx` `DefaultSeo` with `titleTemplate="Grid Kit: %s"`; `NextSeo title` applies it to `og:title` too (live `/designs/shelf-tower`: `<meta property="og:title" content="Grid Kit: Shelf Tower">`).

## Current

`app/layout.tsx:36-40` sets `openGraph.title: 'gridbeam.xyz'` as a bare string, so Next has no Open Graph title template (`node_modules/next/dist/lib/metadata/resolvers/resolve-opengraph.js:150` applies one only when the layout's `openGraph.title` is a template object); routes that set `openGraph.title` (`app/designs/[id]/page.tsx:30`, `app/designs/page.tsx:19`) emit it untemplated (`og:title` `Shelf Tower`).

## Verdict

## Log

- 2026-09-12: Found by the designs ledger (plan cf52c388). The document title template is [[1c8b7461acb1]]; the openGraph objects are [[f46533a8ae54]].
