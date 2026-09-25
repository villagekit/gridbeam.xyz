---
title: "Layout composition: ContentMainLayout around every route and the QueryParamProvider"
status: todo
parent: a78b167170b8
derived_from: a78b167170b8
blocked_by:
  - target: 39b1a28bb0cc
    strength: soft
tags:
  - "worker:fable"
priority: medium
---
The root layout composes what legacy's `MainLayout` and `_app.tsx` composed: every route renders inside the ui's `ContentMainLayout` (one `<main>`, centred, with the bottom margin) and `QueryParamProvider` wraps the tree for the routes' URL state; the routes drop the `Main` and `SkipNavContent` wrappers they grew. Record `a78b167170b8`; decisions `ee86d68a`, `2032533f`, `9c1d2ab08b15` (the skip link).

## Work

- Legacy source: `../node-modules/apps/gridkit/components/layouts/main.tsx:16-25` and `pages/_app.tsx:6,11,94` at `fce357d`. Current: `app/layout.tsx:73-80`, `@villagekit/ui@1.2.0 src/components/layouts/ContentLayout.tsx` and `Main.tsx`, every route's `page.tsx` rendering `<Main><SkipNavContent />`.
- `a73e9678cd57`: `MainLayout`'s children are `<ContentMainLayout>{children}</ContentMainLayout>`, and the layout renders `<SkipNavContent />` once as the first child inside it so the sanctioned skip link keeps its target. Every route file that renders `Main` or `SkipNavContent` (`grep -rln "SkipNavContent\|<Main" app`) swaps `<Main ...>` for a fragment and drops `<SkipNavContent />`, nothing re-indented, and keeps its `Section`s and the rest of its composition untouched: a route's shape is its record's. `ContentMainLayout`'s `Main` asserts `vk-section` descendants by index (`useAssertChildIndexes`): the dev console on each route stays free of its warning.
- `43c1babc2051`: mount `QueryParamProvider` with `next-query-params`'s app-router adapter (`next-query-params` at `^5.1.0`, whose peers admit Next 15 and React 19, exporting `./app`, MIT; `use-query-params@2`, ISC; both pinned) in a client component the layout renders. The shell's half of the difference, the provider, is restored and the item is `fixed` by this slice; `app/_lib/url-state.ts` and its four consumers (`app/_components/catalogue/Catalogue.tsx`, `app/_components/design/DesignViewer.tsx`, `app/stories/StoriesBrowser.tsx`, `app/tools/cutting-planner/CuttingPlanner.tsx`) stay for the routes: on each route's URL-state item (`2a723807e7dc` and `1fc20938eb70` on `/designs`, `a693e2f34e13` on the design pages, and the cutting planner's and stories index's own, found with `kipu list --collection difference --filter route=<route>`) add a note that its slice migrates the consumer to `useQueryParams` and the last one deletes `app/_lib/url-state.ts`; where a route has no item covering its use of the helper, file one (`kipu new difference`, `code`, `added`, `regression`) on that route.
- `MediaProvider` is not mounted: `0efe45924dbe`'s verdict stands, and the ui mdx and media slice gives the media components legacy's default cloud name instead.
- Closes `a73e9678cd57`, `43c1babc2051`.
- Interfaces: produces the mounted `QueryParamProvider` (the routes consume `useQueryParams` from `use-query-params`) and the single `<main>` (no route renders `Main`).
- Verify first: `next-query-params@5.1`'s app adapter under Next 15's `useSearchParams` at build time (Next fails a static build on `useSearchParams` outside a Suspense boundary: wrap as Next requires and say so).
- Docs: CLAUDE.md, Structure, if a `Providers` component earns a word in the shell's list.
- Not this slice: the routes' own compositions; the site theme (before this one on `app/layout.tsx`).

## Seams under test

None pure.

## Done when

- `curl -s localhost:3000/<route> | grep -o '<main' | wc -l` prints 1 on `/`, `/about`, `/designs`, `/stories` and `/tools/cutting-planner`, and `grep -rln "SkipNavContent\|<Main" app --include='*.tsx' | grep -v '^app/layout.tsx$'` lists nothing but the layout's own client component
- the skip link still lands: `audit/_root/dom/current.aria.yaml` keeps `link "Skip to main content"` and `curl -s localhost:3000/ | grep -c 'id="skip-nav"'` prints 1
- the `pnpm dev` console on the five routes shows no `useAssertChildIndexes` warning
- `grep -rc QueryParamProvider app/layout.tsx app/_components/*.tsx | grep -v ':0'` names one file, and `/designs?q=shelf` still filters (the helper untouched)
- `a73e9678cd57` and `43c1babc2051` are `fixed`, and each route URL-state item carries its note, checked after the fixes
- `git diff --stat` for the commit stays under 500 lines
- `timeout 900 just check` is green

## Outcome

## Log
