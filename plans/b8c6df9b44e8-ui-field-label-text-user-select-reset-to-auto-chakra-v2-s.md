---
title: "ui field label text and row alignment: user-select reset to auto and the vertical root's align-items back to normal, Chakra v2's FormLabel and FormControl, for every field"
status: todo
parent: 337e35d86920
derived_from: a78b167170b8
blocked_by: 42f6738b9658
worker: sonnet
priority: medium
---
The ui's field label is selectable with the pointer again, as Chakra v2's `FormLabel` was: the ui `fieldRecipe` resets the label's `user-select` to `auto`, the initial value, where Chakra v3's field recipe writes `userSelect: none`; and a field a caller lays out as a flex row stretches its items again, as Chakra v2's `FormControl` did: the recipe's `vertical` root writes `alignItems: normal`, the initial value, where v3's writes `flex-start`, which the block root leaves inert and a caller's `display: flex` revives. Closes on `shell` [[a29dab52268f]] (interaction, `open`) and [[01f445a34cc9]] (interaction, `open`), read by the ui field root and label box slice `42f6738b9658` on its probe and by its Parity review, each filed with its mechanism named as the ui field recipe's, which CLAUDE.md's Principles say is fought by a change in `../ui`; the badge's selectable text slice `a4f938a27428` is the precedent. Minted beside the shell record `a78b167170b8` by that slice (decision `40abdb2f222a`). A fix in `../ui`, so it follows decision `28c1a536`: committed in the sibling by pathspec, never pushed from here; seen here through the uncommitted `file:../ui` override and `transpilePackages` entry (CLAUDE.md's ui row), both reverted by path before the commit; the item moved to `upstream` with a note citing the sibling commit; the bump plan `99f2fe62c62f` is `blocked_by` this slice. The diff is stated (two properties, each an initial value), so Sonnet.

## Work

Legacy is Chakra v2's `FormLabel`, which wrote no `user-select` (the packed theme at 3.3.1, `components/form-label.js`, and the component, `form-control/dist/chunk-H46NUPBZ.mjs`, under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`); current is `../ui/src/components/FormLabel.recipe.ts` (`fieldRecipe`) after the field root and label box slice, whose label base replaces v3's keys one by one. Deep merge cannot delete v3's `userSelect: none`, so the base writes `userSelect: 'auto'` over it, the way `badgeRecipe` resets the badge's.

- [[a29dab52268f]]: `label.userSelect: 'auto'` in the `fieldRecipe` base, the doc comment saying why.
- [[01f445a34cc9]]: `root.alignItems: 'normal'` under the `fieldRecipe`'s `orientation.vertical` variant beside its `display: block` (a variant value beats v3's `flex-start` there), the doc comment saying why; v3's `horizontal` variant keeps its `center`.
- Docs: `../ui/CHANGELOG.md`, the field label entry under Unreleased Fixed.

## Seams under test

None pure; the proof is a Playwright probe of the label's computed `user-select` on `pnpm dev` under the override, and the screenshot pairs.

## Done when

- A Playwright probe on `pnpm dev` under the override reads `user-select: auto` on the `Preset` and `Controls` labels of `/designs/bed-frame` at 1280, legacy's reading in `audit/_probe42f6/legacy.json`, and a drag across a label's text selects it
- The same probe, with the Parts tab open, reads the `Group same size parts` row's switch label 34 by 29 with the root at `align-items: normal`, legacy's reading in `audit/_parity42f6/legacy.json`, and the switch's track at the same place as before
- `pnpm audit:pages` over `/designs/bed-frame` and `/tools/cutting-planner` at 375, 768 and 1280 under the override, looked at, nothing moved
- In `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` green; the change committed by pathspec on its `main`, not pushed
- [[a29dab52268f]] and [[01f445a34cc9]] are `upstream`, each with a note citing the sibling commit; `99f2fe62c62f` is `blocked_by` this slice (checked at the finish)
- The override and the `transpilePackages` entry reverted by path, `pnpm install --frozen-lockfile`; `timeout 900 just check` is green

## Outcome

## Log
