---
title: "Logo barrel no longer re-exports gl: three, drei and the polyfill stay out of the header bundle"
status: regression
route: shell
axis: code
kind: removed
---
## Legacy

`apps/gridkit/components/logo/index.tsx:1-2` at `fce357d` re-exports both files, `export * from './gl'` and `export * from './svg'`; `components/layouts/main.tsx:10` imports `LogoSvg` from the barrel for the header, and `components/footer.tsx:19` imports the cube by path, `dynamic(() => import('@/components/logo/gl'), { ssr: false })`.

## Current

`app/_components/logo/index.tsx:2` re-exports `./svg` alone. `app/_components/SiteBrand.tsx:6` imports the barrel from the layout of every route, and `app/_components/SiteFooter.tsx:34` imports `./logo/gl` by path with `ssr: false`, as legacy's footer did. Re-exporting `gl` from the barrel would evaluate `three`, `@react-three/drei` and `@juggle/resize-observer` in every route's server render (the Cloudflare Worker) and put them in every route's client bundle through the header, against the client-only import the footer writes for the cube. Not visible: the cube renders the same either way.

## Verdict

## Log

- 2026-09-26: Filed by plan 93ef1234 at its Parity review. The cube slice kept the brand slice's barrel on a stated reason (the server render and the bundle of every route), which none of the five rules covers, so the item is a regression by default: the fix is the one-line re-export, or the operator's sanction under rule 5. Not decided by an agent.
