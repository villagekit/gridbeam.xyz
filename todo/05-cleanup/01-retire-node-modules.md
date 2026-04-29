# 01 — Retire `./node-modules` submodule

**Status:** TODO

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
- [ ] Update CLAUDE.md to reflect that the repo now has only two submodules (`./ui`, `./gridkit`).
- [ ] Commit: `Retire node-modules submodule; site no longer depends on legacy monorepo`.

## Notes
- The `villagekit/node-modules` GitHub repo stays alive — it hosts villagekit.com and supplykit.com which are unrelated projects. Don't archive or delete it.
- Once retired, anyone cloning gridbeam.xyz no longer needs access to the private `villagekit/node-modules` repo. That's the goal — the open-source story works.

## Depends on
- All of Stream 01 (no website code depending on node-modules)
- All of Stream 02 (UI lib is self-contained)
- All of Stream 03 (engine is self-contained)
- Stream 04 task 03 (stories are ported out)
