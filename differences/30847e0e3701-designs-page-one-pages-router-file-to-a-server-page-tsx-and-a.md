---
title: "Designs page: one pages-router file to a server page.tsx and a client DesignsPage.tsx"
status: open
route: /designs
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/designs/index.tsx:1-100` at `fce357d`: one file holding `<NextSeo title="Designs" />`, the `filterOptions` table, the `useMemo` mapping the designs to catalog items and the `<Catalogue>` call, with `getStaticProps` below it.

## Current

Today `app/designs/page.tsx` (a server component exporting `metadata` and reading the design index) and `app/_components/design/DesignsBrowser.tsx` (`'use client'`, two `useMemo`s and the `<Catalogue>` call). After the catalog re-port, `app/designs/page.tsx` (the `metadata` and `getDesignIndexes()`) and `app/designs/DesignsPage.tsx` (legacy's page body line for line under `'use client'`), the shape of `091a47cb93e7` on `/` and `e3a2d4d66691` on `/stories`: the app router exports `metadata` from a server component only, and the page's `useMemo` needs a client one.

## Verdict

## Log

- 2026-09-27: Filed open at the designs index record's split (plan f901cf9f724d) for rule 4 of 2032533f, put to the operator on the verdicts plan [[549ec777422c]]; the catalog re-port [[8417428fd88a]] meets it and ships the two-file shape unless a verdict names another.

- 2026-09-27: From the catalog re-port (plan 8417428fd88a): the two files shipped are app/designs/page.tsx (the server file: metadata and getDesignIndexes, rendering DesignsPage) and app/designs/DesignsPage.tsx (the client file: legacy's filter table, useMemo and the Catalogue call, under the ported-from header). The item stays open for the operator on the verdicts plan 549ec777422c.
