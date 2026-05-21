# 01 — Retire `./node-modules` submodule

**Status:** DONE — folded into the Cloudflare migration that switched gridbeam.xyz to npm-only deps.

The `./node-modules` submodule was removed alongside `./ui`, `./gridkit`, `./gridkit-products`, and `./villagekit-media` when this repo dropped its submodule story in favour of `@villagekit/ui` + `@villagekit/*` engine packages from npm. The constraint behind the change was "no submodules in the repo" (matching `villagekit.com`'s pattern); the sibling checkouts at `../ui`, `../gridkit`, `../products`, `../media`, and `../node-modules` stay around as dev-only references for parallel work and parity audits.

## What was done

- `.gitmodules` deleted; the five submodule directories removed via `git submodule deinit` + `git rm`.
- `@villagekit/ui` and the `@villagekit/*` engine packages now installed from npm.
- The design catalogue at `./products/` is vendored (was `./gridkit-products/products/*` via submodule; upstream is `villagekit/products`).
- Port-citation comments referencing `node-modules/` now use SHA-pinned GitHub URLs.
- CLAUDE.md updated to reflect the new repo shape.

## Notes

- The `villagekit/node-modules` GitHub repo stays alive — it hosts villagekit.com and supplykit.com which are unrelated projects. Don't archive or delete it.
- Anyone cloning gridbeam.xyz can build the site from `pnpm install` alone. The open-source story works.
