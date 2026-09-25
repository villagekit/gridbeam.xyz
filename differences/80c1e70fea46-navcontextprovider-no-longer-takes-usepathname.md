---
title: NavContextProvider no longer takes usePathname
status: upstream
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

- 2026-09-26: Fixed in ../ui at commit 4e11d57 (plan 1c74a465996d): src/components/nav/context.tsx, NavContextProvider({ items, usePathname?, linkComponent? }), the hook and the link component read by NavBar and NavList from the framework context the provider fills. The site half, a client wrapper passing usePathname from next/navigation and NextLink, lands at the bump (the note on 99f2fe62c62f names the edits). Waits on the operator's publish.
