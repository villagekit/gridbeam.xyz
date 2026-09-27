---
title: "ui field root and label box: Chakra v2's block FormControl with its line box around the switch and slider, the block label across its column and the disabled label at 0.4, for the design pages"
status: todo
derived_from: a78b167170b8
worker: fable
priority: medium
blocked_by: 1b4708347ae9
parent: 337e35d86920
---
The ui's field reads as Chakra v2's `FormControl` again on the three readings the ui NumberInput and field label slice's reviews filed: the field root's layout, so the engine's parameter fields on `/designs/bed-frame` stand as tall as legacy's and a switch or slider sits in legacy's line box under its label; the label's box across its column; and the disabled label's opacity. Closes on `shell` [[d185151e1fb8]] (visual, `open`), [[3ac091f72e48]] (interaction, `open`) and [[dac653ff8e33]] (visual, `open`), each filed `open` with its mechanism named as the ui field recipe's, which CLAUDE.md's Principles say is fought by a change in `../ui`. Minted beside the shell record `a78b167170b8` by the ui NumberInput and field label slice `1b4708347ae9` (decision `40abdb2f222a`). A fix in `../ui`, so it follows decision `28c1a536`: committed in the sibling by pathspec, never pushed from here; seen here through the uncommitted `file:../ui` override and `transpilePackages` entry (CLAUDE.md's ui row), both reverted by path before the commit; each item moved to `upstream` with a note citing the sibling commit; the bump plan `99f2fe62c62f` is `blocked_by` this slice. The root's shape is not given (v3's flex column against v2's block, which v3's `orientation` variants and the root's slots both lean on), so Fable.

## Work

Legacy is Chakra v2's form control, label, switch and slider themes (the packed theme at 3.3.1 under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/theme/dist/components/`); current is `../ui/src/components/FormLabel.recipe.ts` (`fieldRecipe`) after `../ui` 486ef24, which gave the root no gap and the label v2's margins. Read the reviews' probes first: `audit/_review1b47/fields.mjs`, `bool.mjs` and `disp.mjs`.

- [[d185151e1fb8]]: the field root's display against v2's block control with inline-block switch and slider roots; read the engine's value fields (choice, number, boolean) and the presets at 1280 and 375 against the live site.
- [[3ac091f72e48]]: the label's box across its column, legacy's block label.
- [[dac653ff8e33]]: the label's `_disabled` opacity at v2's 0.4.
- Docs: `../ui/CHANGELOG.md`, the field label entry under Unreleased Fixed.
- Not this slice: the label's `translate` in v3's `common` list ([[335a8932c646]], the operator's).

## Seams under test

None pure; the proof is a Playwright probe of computed styles and boxes on `pnpm dev` under the override against the live legacy site, and the screenshot pairs.

## Done when

- A Playwright probe on `pnpm dev` under the override reads, beside the live legacy readings, the engine's height field 63px tall and each boolean field 59px with its switch 11px under its label row, the `Preset` label 296px wide at 1280, the `Preset` select still 8px under its label and the `Controls` switch 18px under its label
- `pnpm audit:pages` over `/designs/bed-frame` and `/tools/cutting-planner` at 375, 768 and 1280 under the override, looked at, every remaining difference ledgered
- In `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` green; the change committed by pathspec on its `main`, not pushed
- The three items are `upstream`, each with a note citing the sibling commit; `99f2fe62c62f` is `blocked_by` this slice (checked at the finish)
- The override and the `transpilePackages` entry reverted by path, `pnpm install --frozen-lockfile`; `timeout 900 just check` is green

## Outcome

## Log
