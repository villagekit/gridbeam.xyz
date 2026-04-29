# 01 — Add EUPL-1.2 LICENSE file + fix `UNLICENSED` in every package.json

**Status:** TODO

## Why
The `./gridkit` README says EUPL-1.2 but there's no LICENSE file at the repo root, and **every** publishable package's `package.json` says `"license": "UNLICENSED"`. This is the contradiction blocking external use — npm will refuse some operations against UNLICENSED packages, and downstream users have no legal certainty.

## What
A real `LICENSE` file at `./gridkit/LICENSE` with the EUPL-1.2 text. Every public package's `license` field set to `"EUPL-1.2"`. README updated where it mentions the license.

## Steps
- [ ] Add `./gridkit/LICENSE` with the canonical EUPL-1.2 text from https://choosealicense.com/licenses/eupl-1.2/ (or the raw text from the EU's website). The same text already lives in `./ui/LICENSE` — copy from there for consistency.
- [ ] Update `package.json` for each public package:
  - `core/design`, `core/parameters`, `core/part`, `core/product`, `core/sandbox`, `core/ui`
  - `parts/gridbeam`, `parts/gridpanel`, `parts/fastener`
  - `products/kit`
  - `kit-plugins/smart-fasteners`
  - `util/math`, `util/units`
  - Set `"license": "EUPL-1.2"`.
- [ ] Leave private packages alone:
  - Root `package.json` (private)
  - `apps/studio` (private)
  - `apps/storybook` (private)
  - `dev/tsconfig` (private workspace package)
  - `commands/screenshot` (utility)
- [ ] Update the README's "License" section to point at the LICENSE file and clarify which packages are EUPL-1.2 (the public ones).
- [ ] Verify with `pnpm run publint` — should no longer warn about missing license.
- [ ] Commit with a clear message: `Add EUPL-1.2 license; fix UNLICENSED package fields`.

## Notes
- EUPL-1.2 is GPL-compatible and is approved by OSI as an open-source license.
- Some npm tooling treats `UNLICENSED` as "all rights reserved", which is the OPPOSITE of what we want. Fixing this is essential before any publish.

## Depends on
None — this is the entry point of the stream.
