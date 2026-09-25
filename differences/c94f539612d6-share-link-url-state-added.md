---
title: Share-link URL state added
status: regression
route: /tools/cutting-planner
axis: code
kind: added
---
## Legacy

No URL state: `packages/applet-cutting-planner/src/components/cutting-planner.tsx:46-51` initialises the tables from literals; planning changes nothing in the address bar.

## Current

`app/tools/cutting-planner/url-codec.ts` (155 lines: `decodeUrlState`, `encodeUrlState`, `?r=`, `?s=`, `?u=`, `?d=`, `MAX_ROWS`, the `dropped` flag) with `url-codec.test.ts`; `app/_lib/url-state.ts` `replaceUrl`; `CuttingPlanner.tsx:69-71` `useSearchParams` and `:80-88` a plan computed on load when the URL carries state; `:98` `replaceUrl(...)` on Plan; `:119-123` the "Some beams in that link were out of range and have been left out." warning; `page.tsx:50-52` a `Suspense` boundary. The shell mechanism is [[43c1babc2051]].

## Verdict

## Log

- 2026-09-25: Regression (cutting planner grilling C6). The share-link URL state, its row cap and its warning are removed; legacy keeps no URL state. Shareable plans would return only as an operator-approved improvement with its own decision.

- 2026-09-26: The layout slice [[a7bf623f885c]] did not mount QueryParamProvider (the shell slice [[531b810f2dbd]] chooses the adapter and mounts it). This route keeps no URL state in legacy, so its slice deletes the CuttingPlanner.tsx consumer of app/_lib/url-state.ts rather than migrating it; whichever of the four consumers (Catalogue.tsx, DesignViewer.tsx, StoriesBrowser.tsx, CuttingPlanner.tsx) goes last deletes app/_lib/url-state.ts.

- 2026-09-26: The shell mechanism this Current names, [[43c1babc2051]], is fixed by plan [[531b810f2dbd]]: `QueryParamProvider` is mounted in the shell with a site-written adapter ([[1eddda919812]]). The consumer here, `CuttingPlanner.tsx` over `app/_lib/url-state.ts`, is unchanged and still this item's.
