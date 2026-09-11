---
title: NavContextProvider no longer takes usePathname
status: regression
route: shell
axis: code
kind: changed
---
## Legacy

`packages/ui-nav/src/context.ts:5-8,16-24`: `NavContextProvider({ items, usePathname })`; `apps/gridkit/pages/_app.tsx:96,108-112` passes a `usePathname` built on `next/router`.

## Current

`@villagekit/ui@1.2.0 src/components/nav/context.tsx:16-19`: `{ items, children }` only; `NavBar.tsx:4-5` and `NavList.tsx:4-5` import `usePathname` from `next/navigation` themselves. `app/layout.tsx:72` passes `items` only.

## Verdict

## Log
