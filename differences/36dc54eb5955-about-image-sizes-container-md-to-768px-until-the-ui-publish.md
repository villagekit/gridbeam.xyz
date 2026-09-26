---
title: "About image sizes: container.md to 768px until the ui publish restores the name"
status: upstream
route: /about
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/about.tsx:30,39,56,72,88,104` `sizes={{ base: 'container.md' }}` on the six ui-media `Image`s; `@villagekit/ui@0.9.0` `src/hooks/useSizeWidths.ts` holds `container.md` as 768, and `packages/ui-media/src/hooks.ts:86-96` at `fce357d` renders it as `sizes="768.00px"`.

## Current

`app/about/page.tsx:24,33,47,61,74,88` `sizes={{ base: '768px' }}`: the published `@villagekit/ui@1.2.0` `useSizeWidths` names `3xs` to `8xl` only (`node_modules/@villagekit/ui/dist/hooks/useSizeWidths.js:4-19`), so `container.md` throws `Unexpected size value` (`dist/components/media/hooks.js:52`), and `768px` is the width legacy's own hook resolved `container.md` to. The rendered attribute is identical on both sides, `sizes="768.00px"` six times (a curl of the legacy site and of `pnpm dev`, 2026-09-26). The mechanism of [[152511f71ef4]] on `/`.

## Verdict

## Log

- 2026-09-26: Filed by the page re-port (plan [[97e702d40df5]]), regression at the mint. Fixed in ../ui commit 1c3e3e8 (plan [[bc0407533650]]): src/hooks/useSizeWidths.ts reads container.md from sizes.breakpoint-md again, the shell item [[252edab16c7a]]. Waits on the operator's publish; the bump plan [[99f2fe62c62f]] swaps the six call sites back to container.md and moves this to fixed.
