# 03 — Rename GitHub repo from `gridkit-legacy`

**Status:** TODO

## Why
The submodule's URL is `git@github.com:villagekit/gridkit-legacy`. The "-legacy" suffix locks in a self-deprecating framing that no longer matches reality. Renaming to a clean name ("gridkit", "engine", or similar) signals this is the real engine.

## What
A renamed GitHub repo, the submodule URL updated in this repo's `.gitmodules`, and any references inside the engine repo updated.

## Steps
- [ ] Decide the new name. Check what's available under `villagekit/`:
  - `villagekit/gridkit` — clean, but check if the existing `villagekit/villagekit` repo (referenced in current README) is conflicting.
  - `villagekit/engine` — generic.
  - `villagekit/gridkit-engine` — explicit.
  - Recommend `villagekit/gridkit` if available (matches the npm package vibe and the local directory name).
- [ ] Verify the destination name is free or owned. If `villagekit/villagekit` is the conflicting one and isn't actually used, archive it first.
- [ ] Rename via GitHub UI: Settings → Rename repository. GitHub auto-redirects old URLs.
- [ ] Update this repo's `.gitmodules`:
  ```diff
  - url = git@github.com:villagekit/gridkit-legacy
  + url = git@github.com:villagekit/gridkit
  ```
- [ ] Run `git submodule sync` and verify.
- [ ] Inside `./gridkit`, update any internal references:
  - README links, CHANGELOG (if any), CI workflows.
  - `package.json` `repository.url` fields across all public packages.
- [ ] Update CLAUDE.md in this repo to reflect the new URL.

## Notes
- GitHub's redirect from old → new URLs is automatic for `git clone`. But explicit references in package.json should be updated for cleanliness.
- After the rename, the old "gridkit-legacy" URL still works for years (GitHub redirects), so this is not destructive.

## Depends on
- [./02-readme-and-positioning.md](./02-readme-and-positioning.md) — rename + README update should ship together to avoid mid-state weirdness
