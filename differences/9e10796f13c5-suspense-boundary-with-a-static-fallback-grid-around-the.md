---
title: Suspense boundary with a static fallback grid around the filterable list
status: fixed
route: /stories
axis: code
kind: added
---
## Legacy

`apps/gridkit/pages/stories.tsx:24-32` renders `<Filters />` and `<List />` directly.

## Current

`app/stories/page.tsx:42-48` `<Suspense fallback={<StoriesStatic stories={stories} />}><StoriesBrowser .../></Suspense>`; `app/stories/StoriesStatic.tsx:1-24` the unfiltered grid.

## Verdict

rule: upgrade (useSearchParams bails out of static rendering without a Suspense boundary in the app router, node_modules/next/dist/client/components/navigation.js:92-111)

plan 278fb531

## Log

- 2026-09-12: Note 48c33db3 verified the pattern in August 2026.

- 2026-09-26: The rule 4 force lapsed with the page re-port (plan [[278fb531e229]]): the filterable list now reads the filter through use-query-params useQueryParams under the shell's QueryParamProvider and its app-router adapter (plan [[531b810f2dbd]]), whose query is empty until hydration, so the page calls useSearchParams nowhere and the static prerender needs no Suspense boundary; the boundary and the StoriesStatic fallback grid are deleted, and the addition this item sanctioned is gone. The server HTML still holds every card unfiltered, as legacy's SSR did, with one BAILOUT_TO_CLIENT_SIDE_RENDERING template, the footer cube's.
