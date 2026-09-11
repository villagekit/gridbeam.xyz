---
title: "@villagekit/ui declares Next an optional peer but imports next/* unconditionally"
status: regression
route: shell
axis: code
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0` `package.json`: `peerDependencies: { react: '^18.3.1' }`, no `next`; no `from 'next` anywhere in its `src/`. The Next-bound pieces lived in the private `packages/ui-{nav,page,media,mdx}`.

## Current

`node_modules/@villagekit/ui/package.json`: `peerDependencies.next: '^15.0.0'` with `peerDependenciesMeta.next.optional: true`; unconditional imports in `src/mdx/link.tsx:3`, `src/components/layouts/Footer.tsx:4`, `src/components/nav/NavBar.tsx:4-5`, `src/components/nav/NavList.tsx:4-5`, `src/components/media/Image.tsx:10` (`next/link`, `next/navigation`, `next/image`).

## Verdict

## Log

- 2026-09-12: Fix lands upstream in `../ui` (note `526d5330`).
