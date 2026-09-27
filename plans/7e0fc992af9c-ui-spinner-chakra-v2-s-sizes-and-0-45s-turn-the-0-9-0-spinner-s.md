---
title: "ui Spinner: Chakra v2's sizes and 0.45s turn, the 0.9.0 spinner's box and speed, for the design pages"
status: todo
parent: 337e35d86920
derived_from: a78b167170b8
tags:
  - "worker:fable"
priority: medium
---
The ui `Spinner` is Chakra v2's spinner again on its box and its turn: `xl` is 48px (`sizes.12`) and `md` 24px (`sizes.6`), and one turn takes `0.45s`, where `@villagekit/ui@1.2.0` and the sibling take Chakra v3's recipe, `xl` at 40px (`sizes.10`), `md` at 20px (`sizes.5`) and one turn at the `slowest` token, 500ms. Closes [[81a8aa31124a]] (visual) and [[d05d47f6048a]] (visual), both `open` on `/designs/bed-frame`, filed by the Parity review of the ui Spinner and InfoTooltip slice [[65ee8339cb1d]], which read them from the two themes beside the label it fixed; a slice beside the shell record `a78b167170b8` (decision `40abdb2f222a`), taken without a verdict because each item's mechanism is the package's spinner and CLAUDE.md's Principles say a gap in `@villagekit/ui` is fought by a change in `../ui`; the operator may still overturn either by a note and a new state. A fix in `../ui`, so it follows decision `28c1a536`: committed in the sibling by pathspec, never pushed from here; seen on this site through the uncommitted `pnpm.overrides["@villagekit/ui"] = "file:../ui"` (`pnpm install` after each sibling edit) beside the uncommitted `transpilePackages: ['@villagekit/ui']` in `next.config.ts` (CLAUDE.md's ui row), both reverted by path before the commit; the items moved to `upstream` with a note citing the sibling commit; the bump plan `99f2fe62c62f` is `blocked_by` this slice (the edge written at the mint). A change in `../ui` that decides a shape (a recipe over the wrapper's props), so Fable.

## Work

`../ui/src/components/Spinner.tsx` over the sibling's `1dbd172`: a `forwardRef` wrapper over Chakra v3's `Spinner` passing the color, the track color and the visually hidden label, with no size or duration of its own; the theme (`../ui/src/theme/index.ts`) registers recipes by key and `createSystem(defaultConfig, config)` deep-merges them over Chakra v3's, which replaces a key and cannot delete one. The legacy readings, from the packed v2 copies under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`: the spinner theme's sizes `xs` `sizes.3`, `sm` `sizes.4`, `md` `sizes.6`, `lg` `sizes.8`, `xl` `sizes.12` (`theme/dist/index.js:2339-2355`) and the component's `speed = "0.45s"` and `thickness = "2px"` (`spinner/dist/chunk-5PH6ULNP.mjs:24-28`). Chakra v3's: `xs` `sizes.3`, `sm` `sizes.4`, `md` `sizes.5`, `lg` `sizes.8`, `xl` `sizes.10`, `animationDuration: "slowest"` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/spinner.js`), so `md` and `xl` differ and the rest match.

- [[81a8aa31124a]]: a `spinner` recipe in the ui theme writing `md: { '--spinner-size': 'sizes.6' }` and `xl: { '--spinner-size': 'sizes.12' }`, v2's sizes, over v3's, the recipe form the button and select slices took (`../ui/src/components/Button.tsx`, `Select.tsx`), registered beside them in `../ui/src/theme/index.ts`; the other three sizes stay v3's, which are v2's.
- [[d05d47f6048a]]: the same recipe's base writing `animationDuration: '0.45s'`, v2's default `speed`, since Chakra v3's durations tokens hold no 450ms value (`theme/tokens/durations.js`); a literal duration, not a token, the worker saying so in the doc comment.
- Every ui `Spinner` on the site takes it: the design page's loading state (`app/_components/design/DesignViewerDynamic.tsx:10`, `size="xl"`) and the engine's (`@villagekit/product-kit` `view.tsx:33`, `size="xl"`, which resolves the override's copy under `pnpm.overrides`), read before and after; the package's `ui/Spinner` story.
- Verify first: `grep -rn "spinner" ../ui/src/theme/index.ts ../ui/src/components/Spinner.tsx` prints no recipe; on `pnpm dev` under the override at `1dbd172`, the `.chakra-spinner` on `/designs/bed-frame` during the viewer's loading state (a CDP-throttled network, the shape of the Spinner and InfoTooltip slice's `probe.mjs`) reads `width: 40px`, `height: 40px` and `animation-duration: 0.5s`, where the live legacy page reads 48px and 0.45s.
- Docs: `../ui/CHANGELOG.md`, one line under Unreleased Fixed.
- Not this slice: the spinner's element, `div` under v2 and `span` under v3 ([[a6f5528f74e3]], `open`, the operator's on the design pages' verdicts plan `8512c5e9cc98`); the tooltip portal's container ([[4f55a829c726]]).

## Seams under test

None pure; the proof is a Playwright read of the spinner's computed width, height and animation duration on `pnpm dev` under the override during the loading state, against the live legacy page, and the built Storybook.

## Done when

- A Playwright probe on `pnpm dev` under the override, `/designs/bed-frame` at 1280 during the viewer's loading state: the `.chakra-spinner` reads `width: 48px`, `height: 48px`, `border-width: 2px` and `animation-duration: 0.45s`, the live legacy page's readings saved beside it; the `Loading...` hidden span still inside it
- In `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` (the built theme carries the spinner recipe's two sizes and the duration) and `pnpm build:storybook` green, the `ui/Spinner` story read in the built Storybook at 24px (`md`); the change committed by pathspec on its `main` (`src/components/Spinner.tsx`, `src/theme/index.ts` or wherever the recipe lands, `CHANGELOG.md`), not pushed
- [[81a8aa31124a]] and [[d05d47f6048a]] are `upstream` with a note citing the sibling commit; `99f2fe62c62f` is `blocked_by` this slice (checked at the finish) and carries a note naming what the bump's repeat probe reads on the published package
- The override and the `transpilePackages` entry reverted by path (`git restore -- package.json pnpm-lock.yaml next.config.ts`, `pnpm install --frozen-lockfile`); `timeout 900 just check` is green

## Outcome

## Log
