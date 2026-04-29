# 02 — Rewrite README — drop "superseded" framing

**Status:** DONE

## Why
The current `./gridkit/README.md` opens with `_PROOF OF CONCEPT PROTOTYPE_, superseded by [@villagekit/villagekit]`. The decision to reclaim this codebase as the engine that powers gridbeam.xyz means that framing is now wrong for this repo's purpose — even though `villagekit/villagekit` is genuinely a newer/better engine in its own right.

## What
A rewritten `./gridkit/README.md` that introduces this codebase as a real, maintained project (used by gridbeam.xyz), without pretending its successor doesn't exist. Honest about scope: this engine is the one running gridbeam.xyz; `villagekit/villagekit` is a separate, newer engine effort.

## Steps
- [x] Open with a clean tagline: "A code-as-CAD engine for modular grid-beam designs. Powers [gridbeam.xyz](https://gridbeam.xyz)."
- [x] Drop the "PROOF OF CONCEPT PROTOTYPE" header — this codebase is past that.
- [x] Drop the "superseded by villagekit/villagekit" line as a *header* claim. Optionally keep an honest "See also" footnote near the bottom: "A separate, more ambitious engine effort lives at [villagekit/villagekit](https://github.com/villagekit/villagekit). The two projects share lineage but evolve independently for now."
- [x] Keep the "inspired by NopSCADlib" credit — that's good context.
- [x] Replace the "Get Started" section that links to `villagekit/villagekit` releases with an honest install / build-from-source flow:
  - For end users: visit gridbeam.xyz/designs to use the engine via the website.
  - For developers: clone, `pnpm install`, `pnpm dev:app:studio` to run the studio app locally.
  - For library consumers: `pnpm add @villagekit/sandbox @villagekit/parameters` etc.
- [x] Update the demo video link / screenshot — keep them; they're great.
- [x] Add a "Packages" section listing every public package with a one-line description. (Don't list `core/ui` — it's being removed in task 08.)
- [x] Add a "Status" section: "active development for gridbeam.xyz", or whatever is honest.
- [x] Add a "Contributing" pointer (`DEV.md` already has the dev setup).
- [ ] Verify all links work after the GitHub repo rename (Stream 03 task 03). *(Deferred — link still points at `gridkit-legacy`; task 03 will update the clone URL when it does the rename.)*

## Notes
- The README touch is meaningful — it tells everyone arriving at the repo that this is a real, maintained project. Don't undersell it.
- The "See also" footnote about `villagekit/villagekit` is courteous and accurate. Don't bury it; don't lead with it.
- Keep the EUPL-1.2 license callout at the bottom.
- Also added a "Commands" section to the package list for `@villagekit/screenshot` (publicly licensed CLI). `core/ui` excluded as planned for task 08.
- Deferred: clone URL in the README still references `villagekit/gridkit-legacy`; task 03 will rename the GitHub repo and update the URL in the same change.

## Depends on
- [./01-license-cleanup.md](./01-license-cleanup.md) — for the license section to point at a real LICENSE file
