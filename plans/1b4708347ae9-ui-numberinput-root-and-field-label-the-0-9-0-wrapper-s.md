---
title: "ui NumberInput root and field label: the 0.9.0 wrapper's transparent root under the flushed variant, Chakra v2's label margins in place of the field gap and the label's transition, for the design pages and the planner"
status: todo
parent: 337e35d86920
worker: opus
priority: medium
derived_from: a78b167170b8
blocked_by: 59fa9072c63f
---
The ui's `NumberInput` root and the field label read as the 0.9.0 package's again: the root transparent under the `flushed` variant and white otherwise, the 0.9.0 wrapper's `background`, where the ui wrapper writes white at every variant; the field label carrying Chakra v2's `FormLabel` margins (`marginEnd: 3`, `mb: 2`) on a field root with no gap, where Chakra v3's field root lays its slots out under a 6px gap; and the label's colors fading over v2's `common` properties at 0.2s. Closes on `shell` [[d79404fd4078]] (visual, `open`), [[adda099a7cb9]] (visual, `open`) and [[95acd738a5c7]] (visual, `open`), read by the ui form recipes slice [[59fa9072c63f]] on the live `/tools/cutting-planner` and `/designs/bed-frame` against `pnpm dev` under the `file:../ui` override; each was filed `open` and is taken by a slice without a verdict because its filing note names the mechanism as the package's wrapper or recipe, which CLAUDE.md's Principles say is fought by a change in `../ui`. Minted beside the shell record `a78b167170b8` at that slice's finish (decision `40abdb2f222a`). A fix in `../ui`, so it follows decision `28c1a536`: committed in the sibling by pathspec, never pushed from here; seen here through the uncommitted `file:../ui` override and `transpilePackages` entry (CLAUDE.md's ui row), both reverted by path before the commit; each item moved to `upstream` with a note citing the sibling commit; the bump plan `99f2fe62c62f` is `blocked_by` this slice. The shapes are given (the 0.9.0 wrapper's prop and v2's theme values), so Opus.

## Work

Legacy is the 0.9.0 wrapper at `../ui` `a5cbe36` (`src/components/NumberInput.tsx:45`, `background={variant === 'flushed' ? 'transparent' : 'white'}`) and the packed Chakra v2 theme at 3.3.1 (`components/form-label.js:27-34` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/theme/dist/`); current is the sibling after the ui form recipes slice's commit. Read that slice's Outcome first: the theme merge replaces a key and never deletes one, and the engine's `Label` (`node_modules/@villagekit/parameters/dist/components/label.js`) zeroes the label's margin itself, so the design page's labels take the root gap alone.

- [[d79404fd4078]], `../ui/src/components/NumberInput.tsx` (`Root`): read `variant` from the props and pass `bg` as the 0.9.0 wrapper did, transparent under `flushed` and white otherwise; a caller's own `bg` still wins.
- [[adda099a7cb9]] and [[95acd738a5c7]], `../ui/src/components/FormLabel.recipe.ts` (`fieldRecipe`): write `root: { gap: '0' }` and `label: { marginEnd: '3', mb: '2', transitionProperty: 'common', transitionDuration: 'moderate' }`, v2's base; read the design page's controls against the live site, where the engine's zeroed margin means the labels' bottom gap comes from the engine's `HStack` and not the recipe, and file a `/designs/bed-frame` item for any residual the engine's call site holds, not fixed here. The subscribe form and the planner's unit toggle render `Field.Root` too; read both against the live site before and after.
- Docs: `../ui/CHANGELOG.md`, one Fixed entry per component under Unreleased.
- Not this slice: the planner's monolith inputs on the `outline` variant (the planner record `396c9af0cbd1`); the `translate` in v3's `common` list ([[335a8932c646]], the operator's).

## Seams under test

None pure; the proof is a Playwright probe of computed styles on `pnpm dev` under the override against the live legacy site, and the screenshot pairs.

## Done when

- A Playwright probe on `pnpm dev` under the override reads, with the live legacy readings saved beside: a `flushed` `NumberInput` root at `background-color: rgba(0, 0, 0, 0)` and an `outline` root at `rgb(255, 255, 255)`; on `/designs/bed-frame` at 1280 the `Preset` select 8px under its label and the `Controls` switch 18px under its label, the labels' `transition-property` the `common` list at `0.2s`; the subscribe form's field unchanged against its own pairs
- `pnpm audit:pages` over `/designs/bed-frame`, `/subscribe` and `/tools/cutting-planner` at 375, 768 and 1280 under the override, looked at, every remaining difference ledgered
- In `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` green; the change committed by pathspec on its `main`, not pushed
- The three items are `upstream`, each with a note citing the sibling commit; `99f2fe62c62f` is `blocked_by` this slice (checked at the finish)
- The override and the `transpilePackages` entry reverted by path, `pnpm install --frozen-lockfile`; `timeout 900 just check` is green

## Outcome

## Log
