# 05 — DesignViewer: shallow URL updates, popstate sync, fullscreen params

**Status:** TODO

## Why

Three legacy interaction behaviors were dropped from the design page, and one of them is a real performance bug on Cloudflare Workers:

1. **Every parameter tick is a server round-trip.** `app/_components/design/DesignViewer.tsx:28-33` (2026-08-03) calls `router.replace(...)` from `onLocationUpdate`. In the App Router, `router.replace` refetches the RSC payload from the server — so each slider/choice change hits the worker. Legacy (`../node-modules/apps/gridkit/pages/designs/[id].tsx`) used shallow `Router.push`: URL updates with **no** data fetch. The same problem exists in `app/_components/catalogue/Catalogue.tsx` (~line 100): `router.replace` fires on every debounced search keystroke / filter / sort change.
2. **Back/forward no longer syncs parameter state.** Legacy wired `Router.beforePopState` → `useReloadQueryParams()` so history navigation reloaded parameter values into the params machine, and used `push` so each change was a history entry (back = undo a param change). The new viewer has neither. `useReloadQueryParams` still exists in the engine — `@villagekit/parameters` (`gridkit/core/parameters/src/context.tsx:83` in the sibling checkout).
3. **Fullscreen 3D lost parameter controls.** Legacy passed `showParamControls={hasParams}` to `ProductView`; the sandbox then renders in-canvas ParamControls + the rotate-to-landscape affordance in fullscreen (`@villagekit/sandbox`, `controls/index.tsx:197`). New code renders bare `<ProductView />` — the prop defaults to false. `DesignViewerContent` already computes `hasParams`.

## What

Param and catalogue URL updates that don't refetch from the server; back/forward restoring param state (matching legacy's push-per-change history semantics, or a stated reason for replace semantics); fullscreen param controls back.

## Steps

- [ ] Reproduce first: run the site (`pnpm dev`), open a parametric design, watch the network tab while dragging a slider — confirm RSC fetches fire per change. Do the same while typing in the catalogue search box.
- [ ] Replace `router.replace` with `window.history.replaceState(null, '', url)` for param updates. Next keeps `useSearchParams` in sync with native history API calls since 14.1 (verify against the Next 15 docs — this is the officially recommended shallow-routing pattern in the App Router).
- [ ] Decide push vs replace for param changes: legacy pushed (back = undo). If restoring push, use `window.history.pushState`. If keeping replace semantics, state the reason in the code (`// Note(cc):`).
- [ ] Wire popstate: on back/forward, feed the URL's params back into the params machine via `useReloadQueryParams` from `@villagekit/parameters` — mirror how legacy's `beforePopState` usage worked (read the legacy `[id].tsx` first; port the pattern, not a reinvention). Verify the export still exists in the installed package version before designing around it.
- [ ] Pass `showParamControls={hasParams}` through to `ProductView` in `DesignViewer.tsx` (~line 63). Verify in fullscreen that the controls overlay appears and works.
- [ ] Apply the same `history.replaceState` fix to `Catalogue.tsx` URL updates. Note: with the navigation cost gone, the new 250 ms debounce (legacy: 1000 ms) is fine to keep.
- [ ] Manual test matrix: slider drag (smooth, no network), choice param, share URL → reload restores state, back/forward restores state, fullscreen params, catalogue search/filter/sort URL round-trip.

## Notes

- Wiggle room: the reviewer inferred the RSC-refetch cost from App Router semantics and code reading, not a profiler run — hence the reproduce-first step. If `router.replace` turns out to be cached/cheap in practice, the popstate and fullscreen findings still stand on their own.
- The params machine fires `onLocationUpdate` per update tick — whatever lands must be cheap enough to call at slider-drag frequency.
- Related but separate: `useDeferredValue` already keeps the 3D render smooth during drags — don't remove it.

## Depends on

- Nothing in this stream. Coordinate with `./08-tests.md` if you want regression coverage for the URL codec.

## Files

- `app/_components/design/DesignViewer.tsx`, `app/_components/catalogue/Catalogue.tsx`
- Legacy: `../node-modules/apps/gridkit/pages/designs/[id].tsx`, `../node-modules/apps/gridkit/components/design/view.tsx`
- Engine reference: `../gridkit/core/parameters/src/context.tsx`, `../gridkit/core/sandbox/src/controls/index.tsx`
