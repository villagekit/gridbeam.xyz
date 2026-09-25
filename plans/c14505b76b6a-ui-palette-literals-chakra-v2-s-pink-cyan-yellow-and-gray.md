---
title: "ui palette literals: Chakra v2's pink, cyan, yellow and gray"
status: todo
parent: a78b167170b8
derived_from: a78b167170b8
tags:
  - "worker:fable"
priority: medium
---
`@villagekit/ui`'s colour tokens carry Chakra v2's literal palettes for the roles the site reads (`primary` pink, `accentA` cyan, `accentB` yellow, and `gray`), so text and accents render the legacy values, with the v3 semantic slots kept on top. Record `a78b167170b8`; decisions `ee86d68a`, `2032533f` (rule 4 covers the `colorPalette` mechanism, not the literals), `28c1a536`.

## Work

- Legacy source: `@villagekit/ui@0.9.0 src/theme/colors.ts` (`npm pack @villagekit/ui@0.9.0` into the scratchpad: the tarball is the legacy ui source the ledger cites) and Chakra v2's palette values from `@chakra-ui/theme@3.3.1`, the version the legacy lockfile pins (`../node-modules/pnpm-lock.yaml`): read them from that package, or from the legacy live site's inline `--chakra-colors-*` CSS, never from memory. Current: `../ui/src/theme/colors.ts`, `src/theme/index.ts`, `stories/colors.stories.tsx`.
- `72b776cb0d3f`: define `pink`, `cyan`, `yellow` and `gray` as colour tokens with v2's hex values (50 to 900; a 950 shade, which v3's recipes reference, derived and stated) in `colorTokens`, so `definePalette` and every `gray.*` reference resolve to them; `outlineColor` and the semantic slots stay. Which other v2 palettes the site's rendered CSS reads (`blackAlpha`, `whiteAlpha`, `white`): compare both sides' inline CSS and say in the Outcome which were carried and why the rest were not.
- Sibling steps (decision `28c1a536`): the change lands in `../ui` (`src/...`, and `stories/` where a story renders the component), verified there by `pnpm lint`, `pnpm types` and `pnpm build:pkg`, committed there by pathspec (`git -C ../ui add <paths>` then `git -C ../ui commit -- <paths>`, the message citing the legacy source by its SHA-pinned URL where code is ported) and not pushed; seen on this site through an uncommitted override (`pnpm.overrides` `"@villagekit/ui": "link:../ui"` in `package.json`, then `pnpm install`; the sibling's top-level `exports` point at `src/`, so no build is needed for the override), reverted by path before the commit here (`git restore -- package.json pnpm-lock.yaml`, then `pnpm install --frozen-lockfile`) so the commit never carries it; each item this slice closes moves to `upstream` (`kipu move <id> upstream --from regression`) with a note citing the sibling commit; then `kipu relate 99f2fe62c62f blocked_by <this slice>`. The package version stays: the publish is the operator's.
- Verify on this site through the override: `audit/_root/1280/current.png` beside `legacy.png`, the body text and the accents.
- Closes (to `upstream`) `72b776cb0d3f`.
- Docs: the theme's comment in `../ui/src/theme/colors.ts` and `../ui/README.md` if it documents the palette.

## Seams under test

None pure.

## Done when

- with the override in place, `curl -s localhost:3000/ | grep -o -- '--chakra-colors-gray-700:[^;]*'` prints `#2D3748`, and `pink-400` `#ED64A6`, `cyan-400` `#0BC5EA`, `yellow-400` `#ECC94B`; the override then reverted, and `git status --porcelain` shows only this slice's own files
- in `../ui`: `pnpm lint`, `pnpm types` and `pnpm build:pkg` are green and the commit there is by pathspec, its hash in the item's note
- `72b776cb0d3f` is `upstream` and `99f2fe62c62f` is `blocked_by` this slice, checked after the moves
- `timeout 900 just check` is green on this site, without the override

## Outcome

## Log

- 2026-09-26: From the framework boundary slice (plan 1c74a465996d, ui commit 4e11d57): the mechanism to follow is the framework context in ../ui/src/framework.tsx, filled by NavContextProvider({ items, usePathname?, linkComponent? }) and read through useFramework() by every composite that renders its own anchors; the leaf link components keep the explicit `as`. The override that shows a sibling change on this site is pnpm.overrides["@villagekit/ui"] = "file:../ui" (link: fails under next dev --turbopack), with pnpm install after each sibling edit, reverted by `git restore -- package.json pnpm-lock.yaml` and `pnpm install --frozen-lockfile` before the commit.
