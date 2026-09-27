---
title: "Design pages: the console error memo received undefined diagnosed and closed"
status: todo
parent: 0bc88eaf5493
derived_from: 0bc88eaf5493
blocked_by:
  - 3c448a379ad7
  - target: 4f55a829c726
    strength: soft
    note: the gridkit commit and CLAUDE.md's override sentence, written once
worker: fable
---
The design pages log `memo: The first argument must be a component. Instead received: %s undefined` on load, intermittently on `pnpm dev`, where the live legacy page logs nothing; the cause was never traced, and the scene still lights and shadows. This slice runs `/diagnosing-bugs` on the re-ported page: reproduce, find the `memo()` call that receives `undefined` and why, fix it where it lives, or record what could not be reproduced. Where the fix lands in `../gridkit` it follows decision `28c1a536` (committed there by pathspec, seen here through an uncommitted override reverted before the commit, the item parked `upstream` with the sibling commit, the bump plan `99f2fe62c62f` `blocked_by` this slice by an edge this slice writes); where it is the site's, it is fixed here. One item, [[505a856301b8]]. A diagnosis decides its shape, so Fable. Record `0bc88eaf5493`; decisions `ee86d68a`, `28c1a536`.

## Work

- Reproduce first, on the page as the page re-port leaves it (`Design page re-ported from the legacy design page, catalogue item, design components and loading component`), with a Playwright `page.on('console')` listener recording each message's text, `location()` and stack: a fresh `pnpm dev`, the first load of `/designs/shelf-tower` and of `/designs/bed-frame`, a hard reload of each, and a soft navigation from `/designs` to a design; the item's log says one run at the committed config printed it and two did not, so at least three fresh loads per path. Then a production build (`pnpm build` and `next start` on another port, stopped by pid) on the same paths: a line that prints in development alone is recorded as such.
- The candidates, read before guessing: the engine's two `memo` calls, `node_modules/@villagekit/sandbox/dist/scenery/lights.js:5` (`memo(Lights)` over a hoisted function) and `node_modules/@villagekit/part-fastener/dist/gl.js:40` (an inline function), neither of which can receive `undefined` by itself, so an `undefined` there needs a module cycle or a bundler's evaluation order; the site's own two in `app/_components/logo/gl.tsx:96,171` (inline); `@react-three/drei`, `r3f-perf` and `its-fine` under `node_modules/.pnpm`; the `next/dynamic` boundary (`DesignViewDynamic`) and Turbopack's chunking of a package that is both statically and dynamically imported. The React error's component stack, captured with the message, names the caller.
- The fix: in the site, the smallest change that removes the line with a comment naming the constraint; in `../gridkit`, in the package's `src/`, verified by the sibling's own checks (`pnpm` in `../gridkit`: lint, types, the package's build), committed by pathspec on top of the sibling's HEAD (which the sandbox slice and the tooltip portal slice beside the shell record may have moved; where the paths hold changes that are not yours, stop and ask) and seen here through `pnpm.overrides` of that `@villagekit/*` package to `file:../gridkit/<its path>` after its build (the package's `.` resolves to `dist/`, so no `transpilePackages`; the form the sandbox slice records in CLAUDE.md's gridkit row, or, if that slice has not landed, the form that works, recorded in the Outcome and written into the row), reverted by path (`git restore -- package.json pnpm-lock.yaml`, `pnpm install --frozen-lockfile`) before the commit. A cause in a third-party package (drei, r3f-perf) is not ours to patch: the item gets a note naming the package, the version and the line, and stays `regression` for the operator.
- Verify first: `grep -Rn "memo(" node_modules/@villagekit/*/dist --include='*.js' | grep -v useMemo` prints the two engine lines above and nothing else.
- Docs: CLAUDE.md's gridkit row, if the override form differs from the ui row's.
- Not this slice: the sandbox's hover selector ([[941bd045b043]], the sandbox slice beside the shell record); any other console line.

## Seams under test

None pure; the proof is the console listener over the loads above, on both the development and the production server.

## Done when

- The Outcome records the reproduction (or its absence over the loads above), the component stack, the cause and where the fix landed
- On `pnpm dev` (under the override, for a sibling fix), three fresh loads each of `/designs/bed-frame`, `/designs/shelf-tower` and `/designs/5-12-13-triangle-desk` print no `memo` line in the console, and the same on `next start` after `pnpm build` with the dev server stopped by pid first (CLAUDE.md's Gotchas); for a third-party cause the line is recorded instead
- [[505a856301b8]] is `fixed` (a site fix, or a reproduction that cannot be made and a production console that is clean, with the note), `upstream` with the sibling commit and the bump plan `blocked_by` this slice, or `regression` with the third-party note, checked after
- The override, if used, is reverted by path; `timeout 900 just check` is green

## Outcome

## Log
