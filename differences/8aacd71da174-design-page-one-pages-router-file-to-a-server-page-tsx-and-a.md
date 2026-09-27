---
title: "Design page: one pages-router file to a server page.tsx and a client DesignPage.tsx"
status: open
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx` at `fce357d`, one file of 301 lines: the seven part registrations, `DesignPage` (`:40-66`, `useCallback` for `onLocationUpdate`, `NextSeo`, `ProductProvider`), `Content` (`:70-122`, `useEffect`, `useRef`), `Overview`, `DesignCuttingPlan`, `getRequiredBeamsFromParts`, `getStaticProps`, `getStaticPaths` and `getLayout`.

## Current

The shape the design pages record `0bc88eaf5493`'s page re-port writes: a server `app/designs/[id]/page.tsx` holding `generateStaticParams`, `generateMetadata` and the `notFound` (the sanctioned `f97cae6ea3c8`) and rendering a client `app/designs/[id]/DesignPage.tsx` that holds legacy's page body line for line, because the app router exports metadata from a server component only and legacy's page calls `useCallback`, `useEffect` and `useRef`. Before the re-port the split is three files (`page.tsx`, `DesignViewerDynamic.tsx`, `DesignViewer.tsx`), the dynamic boundary [[c8f03816979a]] records. The twin of [[30847e0e3701]] on `/designs`, [[091a47cb93e7]] on `/` and [[e3a2d4d66691]] on `/stories`.

## Verdict

## Log

- 2026-09-27: Filed at the split of the design pages record (plan 0bc88eaf5493) for the operator's verdicts plan [[8512c5e9cc98]], the twin of 30847e0e3701 (/designs), 091a47cb93e7 (/) and e3a2d4d66691 (/stories), each open on its verdicts plan; the page re-port [[3c448a379ad7]] writes the shape, and a verdict before it runs shapes it. Not judged here.
