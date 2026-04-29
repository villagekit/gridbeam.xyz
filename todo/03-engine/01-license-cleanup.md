# 01 — Add EUPL-1.2 LICENSE file + fix `UNLICENSED` in every package.json

**Status:** DONE

## Why
The `./gridkit` README says EUPL-1.2 but there's no LICENSE file at the repo root, and **every** publishable package's `package.json` says `"license": "UNLICENSED"`. This is the contradiction blocking external use — npm will refuse some operations against UNLICENSED packages, and downstream users have no legal certainty.

## What
A real `LICENSE` file at `./gridkit/LICENSE` with the EUPL-1.2 text. Every public package's `license` field set to `"EUPL-1.2"`. README updated where it mentions the license.

## Steps
- [x] Add `./gridkit/LICENSE` with the canonical EUPL-1.2 text. Copied byte-identical from `./ui/LICENSE`.
- [x] Update `package.json` for each public package:
  - `core/design`, `core/parameters`, `core/part`, `core/product`, `core/sandbox`, `core/ui`
  - `parts/gridbeam`, `parts/gridpanel`, `parts/fastener`
  - `products/kit`
  - `kit-plugins/smart-fasteners`
  - `util/math`, `util/units`
  - `commands/screenshot` (also set; it's not marked private and is part of the open-source repo, contrary to the original task note)
  - Set `"license": "EUPL-1.2"`.
- [x] Leave private packages alone — verified by checking `git status` doesn't list them:
  - Root `package.json` (private)
  - `apps/studio` (private)
  - `apps/storybook` (private)
  - `dev/tsconfig` (private workspace package)
- [x] Update the README's "License" section to point at the LICENSE file and clarify which packages are EUPL-1.2 (the public ones).
- [ ] ~~Verify with `pnpm run publint`~~ — deferred. Requires a full `pnpm install` and the engine has unmigrated Chakra v2 / mismatched deps that would need addressing first. The license diff is mechanical; publint is a follow-up gate during task 04 (deps audit) or 05 (publish).
- [x] Commit with a clear message.

## Notes
- EUPL-1.2 is OSI-approved open source. The Appendix lists GPL/AGPL/LGPL/MPL/CeCILL/EPL/OSL/LiLiQ as compatible.
- Some npm tooling treats `UNLICENSED` as "all rights reserved", which is the OPPOSITE of what we want. Fixing this is essential before any publish.
- Commit `7e9aa14` in the gridkit submodule. Parent repo's submodule pointer bumped alongside.

## Depends on
None — this is the entry point of the stream.
