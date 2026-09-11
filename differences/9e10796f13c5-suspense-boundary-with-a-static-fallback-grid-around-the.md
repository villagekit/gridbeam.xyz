---
title: Suspense boundary with a static fallback grid around the filterable list
status: sanctioned
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

## Log

- 2026-09-12: Note 48c33db3 verified the pattern in August 2026.
