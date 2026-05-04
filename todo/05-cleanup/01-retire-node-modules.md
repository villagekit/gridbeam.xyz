# 01 — Retire `./node-modules` submodule

**Status:** BLOCKED — awaiting Stream 06 (design parity uplift).

The submodule has zero remaining *code* dependencies (verified 2026-05-04: no `@villagekit-private/*` imports, no `workspace:*` deps inside `node-modules/`, no scripts touching it; only a port-citation comment in `app/tools/cutting-planner/algorithm.ts` and ignore-array entries in `biome.json` / `tsconfig.json`). However, `./node-modules/apps/gridkit/` is still the **design reference** for the page-by-page parity work in Stream 06. Don't retire until that stream is done — losing the reference would make parity work much harder.

## Why
Once the website doesn't depend on anything inside `./node-modules` anymore, it's dead weight. Keep the `villagekit/node-modules` GitHub repo (it still hosts villagekit.com and supplykit.com), but unhook it from this repo.

## What
The `./node-modules` submodule removed from this repo. `.gitmodules` updated. The repo itself still exists on GitHub.

## Steps
- [ ] Verify NO files in this repo (other than `node-modules/` itself) reference anything inside `node-modules/`:
  - `grep -r "node-modules" . --exclude-dir=node-modules --exclude-dir=.git`
  - Look for workspace path imports `@villagekit-private/...`, package.json deps with `workspace:*` resolving inside node-modules, etc.
- [ ] Verify NO website code imports `@villagekit-private/*` packages — these all live inside `node-modules/packages/` and are private.
- [ ] If anything still references node-modules, fold it into the website / `./ui` / `./gridkit` first. Common holdouts:
  - `applet-cutting-planner` — should have been lifted into the website (Stream 01 task 07)
  - `applet-contact`, `applet-subscribe` — should be replaced with native implementations (Stream 01 task 09)
  - `ui-brand`, `ui-cookies` — should not be needed (skipped intentionally per Stream 02)
  - `dev-next-config`, `dev-code-style` — replace with local config
- [ ] Once clear, remove the submodule:
  ```sh
  git submodule deinit node-modules
  git rm node-modules
  rm -rf .git/modules/node-modules
  ```
- [ ] Edit `.gitmodules` to remove the `node-modules` entry.
- [ ] Drop `"node-modules"` from `biome.json` `files.ignore` and `tsconfig.json` `exclude`.
- [ ] Rewrite the port-citation comment at the top of `app/tools/cutting-planner/algorithm.ts` to a SHA-pinned GitHub URL (per CLAUDE.md "Citing copied code"), so the reference doesn't rot.
- [ ] Update CLAUDE.md to reflect that the repo now has four submodules (`./ui`, `./gridkit`, `./gridkit-products`, `./villagekit-media`) — drop the `./node-modules` row from the table and the "temporarily depends on a private legacy submodule" sentence.
- [ ] Commit: `Retire node-modules submodule; site no longer depends on legacy monorepo`.

## Notes
- The `villagekit/node-modules` GitHub repo stays alive — it hosts villagekit.com and supplykit.com which are unrelated projects. Don't archive or delete it.
- Once retired, anyone cloning gridbeam.xyz no longer needs access to the private `villagekit/node-modules` repo. That's the goal — the open-source story works.

## Depends on
- All of Stream 01 (no website code depending on node-modules) — ✅ verified 2026-05-04
- All of Stream 02 (UI lib is self-contained) — ✅
- All of Stream 03 (engine is self-contained) — ✅
- Stream 04 task 03 (stories are ported out) — ✅
- **All of Stream 06 (design parity uplift)** — `./node-modules/apps/gridkit/` is the visual reference; retiring before parity is reached would make Stream 06 work much harder.
