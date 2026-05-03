# 09 — `@villagekit/products` distribution decision

**Status:** DONE — decisions logged + non-publishing cleanup landed. Publishing deferred (see Decisions).

## Why
The website's designs catalog (Stream 01 task 06) plans to consume `@villagekit/products` from npm in production. But `gridkit-products/package.json` says `"private": true` and `"license": "BlueOak-1.0.0"` — different from the rest of the open-source surface (EUPL-1.2). The repo URL inside the package.json also mismatches reality: it says `villagekit/products` but the submodule path here is `gridkit-products` (and the GitHub repo presumably should match). None of this is captured in any other task, so the catalog's distribution story is undefined.

## What
A logged decision (in this task and the engine README) on:
1. Whether `@villagekit/products` is published to npm or kept private.
2. What license it carries (BlueOak vs EUPL-1.2).
3. How the website actually consumes it (workspace path, npm, both).

Plus any follow-on cleanup (private→public flip, license alignment, repo URL fix, README addition).

## Decisions (2026-05-04)

1. **License → keep BlueOak-1.0.0.** A previous pass relicensed to EUPL-1.2 to "align with the rest of the village-kit surface" — Mikey reverted that and made clear the task-file recommendation was guidance to discuss, not authorization. BlueOak's permissive posture is appropriate for a catalogue of designs that should be freely reusable; the share-alike posture of EUPL-1.2 makes more sense for the engine, the UI library, and the website. **A LICENSE file was missing at the repo root** even though `package.json` declared BlueOak-1.0.0 — that's now added (Blue Oak Model License 1.0.0 text, fetched from blueoakcouncil.org).
2. **Distribution → keep `"private": true`; consume via filesystem.** The website already reads the catalogue directly off the submodule via `app/_lib/designs.ts` (`process.cwd()/gridkit-products/products/<id>/...`) — no `@villagekit/products` import exists anywhere. That works because the engine's runtime sandbox needs the design `.ts` as raw source text, not a compiled module. Publishing 37 raw `.ts` files to npm without a thoughtful build pipeline would just confuse third parties. Defer publishing until: (a) Stream 03 task 05 unblocks (the engine packages this catalogue depends on need to be on npm first), and (b) a third-party consumer materialises that needs the catalogue as an installable package. Until then, the filesystem-via-submodule pattern is the consumption story.
3. **Repo URL → `villagekit/gridkit-products`.** That matches the actual GitHub repo name and the local submodule path. The package.json `repository.url` / `bugs.url` / `homepage` were pointing at `villagekit/products`, fixed.
4. **Don't add to top-level `pnpm-workspace.yaml`.** The workspace listing would only matter if the website imported via package name, which it doesn't.

## Steps
- [x] Decide license — kept **BlueOak-1.0.0** (see Decisions §1; recommendation in the original task notes was EUPL-1.2 but that was not authorisation to relicense).
- [x] Decide distribution shape — chose **B** (private + filesystem) instead of recommended **C**, because the publishing dependency chain (engine → @villagekit/ui first publish) is currently blocked, and the website's filesystem read already works (see Decisions §2).
- [x] Confirm the upstream GitHub repo name — `villagekit/gridkit-products` (see Decisions §3).
- [ ] **Deferred (only if/when publishing):** flip `"private": false`. Add a build pipeline (likely `tsup` or `tsc`).
- [x] Add a `LICENSE` file at the repo root — Blue Oak Model License 1.0.0 text from blueoakcouncil.org.
- [x] Add a README explaining how the catalogue is structured and how the website consumes it.
- [x] **Decided not to** add `gridkit-products` to the top-level `pnpm-workspace.yaml` — see Decisions §4.
- [ ] **Deferred (only if/when publishing):** hook into the same release pipeline as the engine (Stream 03 task 05).

## Notes
- 37 products at the time of writing (verified via `ls gridkit-products/products/`).
- The `package.json` `repository.url` mismatch (`products` vs `gridkit-products`) likely dated from a rename that never propagated; fixed.
- Stream 01 task 06 (designs catalog) is already DONE because the website found a working consumption path (filesystem read) without waiting on this task. This task formalises that choice and unblocks anyone wondering "how do I add a design and have the website pick it up" (just commit it under `gridkit-products/products/` and bump the submodule pointer).
- The original task notes recommended relicensing forward to EUPL-1.2 since Mikey is the sole contributor (verified via `git shortlog -sne` — only Michael Williams / Mikey across 51 commits). That recommendation stands as a future option if the team ever decides the catalogue should adopt the village-kit-wide licence — but it requires Mikey's explicit go-ahead, not just task-file recommendation.
- The catalogue's `tsconfig.json` and `biome.json` reference `../villagekit/` (the standalone-author layout where the engine repo is checked out as `villagekit`). Inside gridbeam.xyz the engine is at `../gridkit/`, so those paths don't resolve here. **Left as-is** because (a) the website doesn't typecheck or lint the catalogue (it reads `.ts` as raw text), (b) Mikey's standalone authoring workflow likely depends on the existing paths, (c) fixing them here would break that workflow.

## Depends on
- [./01-license-cleanup.md](./01-license-cleanup.md) — for license consistency across the open-source surface

## Follow-ups
- [./05-publish-npm.md](./05-publish-npm.md) — when that unblocks AND a third-party use case appears, revisit publishing this catalogue.
