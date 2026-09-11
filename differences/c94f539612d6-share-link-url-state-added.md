---
title: Share-link URL state added
status: open
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
