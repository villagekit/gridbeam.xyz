---
title: "SEO metadata: next-seo DefaultSeo to the Metadata export"
status: sanctioned
route: shell
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/_app.tsx:46-72`: `<DefaultSeo titleTemplate defaultTitle description openGraph twitter />` from `next-seo`, plus `<Head>` links `:73-87`.

## Current

`app/layout.tsx:28-59`: `export const metadata: Metadata` and `export const viewport: Viewport`; icons by file convention (`app/icon.svg`, `app/apple-icon.png`, `app/opengraph-image.tsx`).

## Verdict

rule: upgrade (the app router has no pages/_app; the Metadata export is its mechanism). The fields that changed or went missing in the move are their own items.

## Log
