# 05 — DesignViewer: shallow URL updates, popstate sync, fullscreen params

**Status:** DONE

## Why

Three legacy interaction behaviors were dropped from the design page, and one of them is a real performance bug on Cloudflare Workers:

1. **Every parameter tick is a server round-trip.** `app/_components/design/DesignViewer.tsx:28-33` (2026-08-03) calls `router.replace(...)` from `onLocationUpdate`. In the App Router, `router.replace` refetches the RSC payload from the server — so each slider/choice change hits the worker. Legacy (`../node-modules/apps/gridkit/pages/designs/[id].tsx`) used shallow `Router.push`: URL updates with **no** data fetch. The same problem exists in `app/_components/catalogue/Catalogue.tsx` (~line 100): `router.replace` fires on every debounced search keystroke / filter / sort change.
2. **Back/forward no longer syncs parameter state.** Legacy wired `Router.beforePopState` → `useReloadQueryParams()` so history navigation reloaded parameter values into the params machine, and used `push` so each change was a history entry (back = undo a param change). The new viewer has neither. `useReloadQueryParams` still exists in the engine — `@villagekit/parameters` (`gridkit/core/parameters/src/context.tsx:83` in the sibling checkout).
3. **Fullscreen 3D lost parameter controls.** Legacy passed `showParamControls={hasParams}` to `ProductView`; the sandbox then renders in-canvas ParamControls + the rotate-to-landscape affordance in fullscreen (`@villagekit/sandbox`, `controls/index.tsx:197`). New code renders bare `<ProductView />` — the prop defaults to false. `DesignViewerContent` already computes `hasParams`.

## What

Param and catalogue URL updates that don't refetch from the server; back/forward restoring param state (matching legacy's push-per-change history semantics, or a stated reason for replace semantics); fullscreen param controls back.

## Steps

- [x] Reproduce first: run the site (`pnpm dev`), open a parametric design, watch the network tab while dragging a slider — confirm RSC fetches fire per change. Do the same while typing in the catalogue search box.
- [x] Replace `router.replace` with `window.history.replaceState(null, '', url)` for param updates. Next keeps `useSearchParams` in sync with native history API calls since 14.1 (verify against the Next 15 docs — this is the officially recommended shallow-routing pattern in the App Router).
- [x] Decide push vs replace for param changes: ~~legacy pushed (back = undo)~~ — legacy used **replace**; see Notes. Kept replace, reasoned in `app/_lib/url-state.ts`.
- [x] ~~Wire popstate~~ — skipped, unnecessary with replace semantics; verified empirically. See Notes.
- [x] Pass `showParamControls={hasParams}` through to `ProductView` in `DesignViewer.tsx` (~line 63). Verify in fullscreen that the controls overlay appears and works.
- [x] Apply the same `history.replaceState` fix to `Catalogue.tsx` URL updates. Note: with the navigation cost gone, the new 250 ms debounce (legacy: 1000 ms) is fine to keep.
- [x] Manual test matrix: slider drag (smooth, no network), choice param, share URL → reload restores state, back/forward restores state, fullscreen params, catalogue search/filter/sort URL round-trip.

## Notes

### What the reproduce step actually found (2026-08-03, Playwright against `pnpm dev`)

- **Finding 1 holds, with a correction.** `router.replace` does fire an RSC fetch
  (`GET /designs/shelving-unit?w=55&…&_rsc=…`) — but *not* per tick: the params machine
  debounces `onLocationUpdate` at 1000 ms trailing (`@villagekit/parameters`,
  `src/machine.ts`), so it's one round-trip per settled change. The user-visible symptom was
  worse than the request count suggests: because the App Router only commits the URL after the
  payload lands, **the address bar lagged the slider by seconds** (>4 s in dev). After the fix
  the URL updates synchronously and no request is made at all. Same for catalogue search,
  catalogue filter/sort, the stories filter, and the cutting planner's "Plan" button.
- **Finding 2 does not hold as filed.** The task said legacy pushed a history entry per param
  change. It didn't — legacy `pages/designs/[id].tsx` called
  `Router.replace(urlObject, urlObject, { shallow: true })`. Replace is the legacy behaviour,
  so the rebuild was already right; kept it, reasoned in `app/_lib/url-state.ts`.
  (The legacy *catalogue* is the one that pushed — `use-query-params`' default `pushIn` via
  `next-query-params`. Mikey chose replace everywhere on 2026-08-03: with the 250 ms search
  debounce, push would strand users behind an entry per typed word.)
- **The popstate wiring is unnecessary and was skipped.** With replace semantics no history
  entry ever shares a pathname with a different query, so a same-page popstate can't happen.
  Back/forward across a real navigation unmounts and remounts the viewer, and the params
  machine reads `location.search` on mount. Verified: `/designs/shelving-unit` → drag to
  `?w=55` → back to `/designs` → forward restores both the URL and the slider at 55.
  `useReloadQueryParams` does still exist in the installed `@villagekit/parameters` if a future
  change reintroduces push semantics.
- **Finding 3 holds.** `showParamControls={hasParams}` now reaches `Sandbox` and the in-canvas
  param panel renders in fullscreen (verified in real Chrome fullscreen: the panel switches
  from `display: none` to `display: block`, the sliders work, and the URL updates from inside
  fullscreen).
- Scope note: the identical one-line fix was applied to `app/stories/StoriesBrowser.tsx` and
  `app/tools/cutting-planner/CuttingPlanner.tsx` — same call, same cost, and leaving two of
  four sites on `router.replace` would have made the shared helper a lie.
- Related but separate: `useDeferredValue` already keeps the 3D render smooth during drags —
  don't remove it.

### Discovered while verifying — see [`./17-sandbox-chakra-v3-css.md`](./17-sandbox-chakra-v3-css.md)

The fullscreen verification surfaced a pre-existing upstream regression: **every sandbox
control is stuck at `opacity: 0`** because `@villagekit/sandbox`'s `':hover, :focus-within'`
nested selector doesn't compile under Chakra v3. Zoom, auto-rotate, grid, reset, fullscreen,
the info panel, and the param panel this task restored are all invisible (though still
clickable). Filed as task 17; it needs a `villagekit/gridkit` release.

## Depends on

- Nothing in this stream. Coordinate with `./08-tests.md` if you want regression coverage for the URL codec.

## Files

- `app/_lib/url-state.ts` (new — shared `replaceUrl` / `withSearchParams`)
- `app/_components/design/DesignViewer.tsx`, `app/_components/catalogue/Catalogue.tsx`,
  `app/stories/StoriesBrowser.tsx`, `app/tools/cutting-planner/CuttingPlanner.tsx`
- Legacy: `../node-modules/apps/gridkit/pages/designs/[id].tsx`, `../node-modules/apps/gridkit/components/design/view.tsx`
- Engine reference: `../gridkit/core/parameters/src/context.tsx`, `../gridkit/core/sandbox/src/controls/index.tsx`
