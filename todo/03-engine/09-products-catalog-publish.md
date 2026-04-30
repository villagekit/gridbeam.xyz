# 09 — `@villagekit/products` distribution decision

**Status:** TODO

## Why
The website's designs catalog (Stream 01 task 06) plans to consume `@villagekit/products` from npm in production. But `gridkit-products/package.json` says `"private": true` and `"license": "BlueOak-1.0.0"` — different from the rest of the open-source surface (EUPL-1.2). The repo URL inside the package.json also mismatches reality: it says `villagekit/products` but the submodule path here is `gridkit-products` (and the GitHub repo presumably should match). None of this is captured in any other task, so the catalog's distribution story is undefined.

## What
A logged decision (in this task and the engine README) on:
1. Whether `@villagekit/products` is published to npm or kept private.
2. What license it carries (BlueOak vs EUPL-1.2).
3. How the website actually consumes it (workspace path, npm, both).

Plus any follow-on cleanup (private→public flip, license alignment, repo URL fix, README addition).

## Steps
- [ ] Decide license: keep BlueOak-1.0.0, or align to EUPL-1.2? BlueOak is permissive (fine for a catalog of designs) but inconsistent with the rest of the open-source surface. Recommend EUPL-1.2 unless there's a specific BlueOak reason.
- [ ] Decide distribution shape:
  - **A**: Publish to npm. Consumers do `pnpm add @villagekit/products`. Catalog updates require a version bump + publish.
  - **B**: Keep private; the website only consumes via workspace path.
  - **C**: Publish to npm; the website also workspace-links during dev.
  - Recommend **C** — same pattern as the engine packages (Stream 03 task 05).
- [ ] Confirm the upstream GitHub repo name. The submodule is at `gridkit-products` locally; the package.json `repository.url` says `villagekit/products`. Pick one canonical name and align both.
- [ ] If publishing: flip `"private": false`. Add a build pipeline (likely `tsup` or `tsc`) so consumers get a buildable artefact, not 37 raw `.ts` files.
- [ ] Add a `LICENSE` file at the repo root if missing.
- [ ] Add a README explaining how the catalog is structured (parameters shape, creator pattern) and how to consume it. None exists today.
- [ ] If going workspace-during-dev: add `gridkit-products` to the gridbeam.xyz top-level `pnpm-workspace.yaml`.
- [ ] If publishing: hook into the same release pipeline as the engine (Stream 03 task 05).

## Notes
- 37 products at the time of writing (verified via `ls gridkit-products/products/`).
- The `package.json` `repository.url` mismatch (`products` vs `gridkit-products`) likely dates from a rename that didn't get propagated.
- Stream 01 task 06 (designs catalog) blocks on this — without a clear consumption story, the website can't render designs.
- BlueOak-1.0.0 is GPL-compatible and EUPL-compatible; relicensing forward to EUPL-1.2 is straightforward if Mikey is the sole contributor. If there are external contributors, get sign-off first.

## Depends on
- [./01-license-cleanup.md](./01-license-cleanup.md) — for license consistency across the open-source surface
