---
title: "QueryParamProvider: an app-router adapter that keeps every route's static HTML"
status: todo
parent: a78b167170b8
priority: medium
tags:
  - "worker:fable"
---
Legacy's `_app.tsx` wraps every page in `QueryParamProvider` from `use-query-params` with `next-query-params`'s adapter (difference `43c1babc2051`, regression on `shell`). The layout slice `a7bf623f885c` verified that the port's obvious translation does not hold: `next-query-params/app` (5.1.0) calls `useSearchParams()` in its adapter, so mounted in the root layout it fails `next build` on every static route (`useSearchParams() should be wrapped in a suspense boundary`), and wrapped in `Suspense` at the root it bails every route out to client-side rendering, the static HTML holding only `<template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING">` and no `<main>`. This slice closes that open unknown by Phase 0 (CLAUDE.md, Plans vs. reality): research and an adversarial review on Opus, the simplest design that survives, then the provider mounted once in the shell. Record `a78b167170b8`; decisions `ee86d68a`, `2032533f`.

## Work

- The open unknown: how the app router mounts one `QueryParamProvider` for every route without losing the static HTML. Candidates found by `a7bf623f885c`, none chosen: a site-written adapter with the pages adapter's semantics (the query empty on the server, read from `window.location` after hydration through `useSyncExternalStore`, written through Next's patched `history.replaceState`, which keeps `useSearchParams` in sync); `next-query-params/app` mounted inside each consumer's own client-only boundary (the `Suspense` in `app/designs/page.tsx`, `app/stories/page.tsx` and `app/tools/cutting-planner/page.tsx`; `app/_components/design/DesignViewerDynamic.tsx`, a `next/dynamic` import with `ssr: false`, has none), four providers where legacy had one; another library. A design that changes the shape of the code against legacy's is filed as a `difference` on `shell` (code axis) and judged by rule, never sanctioned by the agent; rule 4 (upgrade-forced) is the one to test it against.
- The provider mounts in `app/_components/SiteProvider.tsx`, inside `ChakraProvider`, as `_app.tsx` nests them; the routes then migrate their consumers to `useQueryParams` in their own slices (notes on `2a723807e7dc`, `1fc20938eb70`, `a693e2f34e13`, `cbe45596b840`, `c94f539612d6`), and the last one deletes `app/_lib/url-state.ts`; each of those consumer slices is minted `blocked_by` this one, since the sequence lives in edges (`plans/README.md`).
- Closes `43c1babc2051`.
- Interfaces: produces the mounted `QueryParamProvider`; the routes consume `useQueryParams` from `use-query-params`.
- Verify first: `next-query-params@5.1.0 dist/app.cjs.development.js:12` calls `useSearchParams()`; `.next/server/app/about.html` after a root `Suspense` build holds the bailout template and no `<main`.
- Docs: CLAUDE.md, Structure, if the adapter earns a word in the shell's list.
- Not this slice: the consumers' migration (the route slices); `MediaProvider` (`0efe45924dbe` stands).

## Seams under test

A site-written adapter, if chosen, is pure at its codec edge and tested under Vitest beside it; the provider's mounting is held by the screenshot pairs.

## Done when

- `grep -rc QueryParamProvider app/layout.tsx app/_components/*.tsx | grep -v ':0'` names one file
- `pnpm build` is green and `.next/server/app/about.html` holds `<main` and no `BAILOUT_TO_CLIENT_SIDE_RENDERING`
- `curl -s localhost:3000/about | grep -o '<main' | wc -l` prints 1
- `43c1babc2051` is `fixed`, and any shape deviation is a `difference` on `shell` with its Verdict by rule, checked after the fix
- `timeout 900 just check` is green

## Outcome

## Log
