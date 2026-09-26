---
title: "ui Badge: selectable text and proportional numerals, Chakra v2's badge again"
status: todo
parent: 337e35d86920
derived_from: a78b167170b8
tags:
  - "worker:fable"
priority: medium
---
A badge's text is selectable and its digits proportional again, as under `@villagekit/ui@0.9.0`: the package's `badgeRecipe` no longer keeps Chakra v3's `userSelect: none` and `fontVariantNumeric: tabular-nums`, which Chakra v2's badge never wrote. Closes [[a90ae9e6e022]] on `shell` for the shell record `a78b167170b8`, filed by the recipes slice [[2bd0169a6dda]] after the record and the shell's verdicts plan were written and owned by no slice until the about's finish found it (decision `40abdb2f222a`, a slice beside the record). A fix in `../ui`, so it follows decision `28c1a536`: committed in the sibling by pathspec, never pushed from here; seen on this site through the uncommitted `pnpm.overrides["@villagekit/ui"] = "file:../ui"` (`pnpm install` after each sibling edit) beside the uncommitted `transpilePackages: ['@villagekit/ui']` in `next.config.ts` that the `src/` copy needs (CLAUDE.md's ui row), both reverted by path before the commit; the item moved to `upstream` with a note citing the sibling commit; the bump plan `99f2fe62c62f` is `blocked_by` this slice (the edge written at the mint).

## Work

In `../ui/src/components/Badge.recipe.ts` `badgeRecipe` (ui commit `6603102`, the recipes slice) writes Chakra v2's box, type and 0.9.0's radius and text transform in its base and says in its doc comment that v3's `whiteSpace: nowrap`, `userSelect: none` and `fontVariantNumeric: tabular-nums` stay. Chakra v3's badge recipe base writes the three (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/badge.js:6-15`), and `createSystem(defaultConfig, config)` (`../ui/src/theme/index.ts:104`) deep-merges the package's recipe over it (`node_modules/@chakra-ui/react/dist/esm/styled-system/system.js:25`, `mergeConfigs`; the recipes slice's Outcome read the same merge on the container recipe), so a declaration the package does not override stands. Chakra v2's badge theme (`@chakra-ui/theme@3.3.1` `components/badge.js:31-35`) and the v2 `Badge` component's own css (`@chakra-ui/layout@2.3.1` `dist/chunk-Z6RXEUPO.mjs:21-25`) wrote `whiteSpace: nowrap` and neither of the other two, the item's readings on the live legacy site (`user-select: auto`, `font-variant-numeric: normal`). Write `userSelect: 'auto'` and `fontVariantNumeric: 'normal'` in the base, the initial values, as overrides the merge keeps, and take the two names out of the comment's list of what stays; `whiteSpace: nowrap` stays. The emitted CSS is read once to confirm the two declarations land in the badge's class.
Verify first: on `pnpm dev` with the published 1.2.0, the story card's `Guide` badge on `/stories` at 1280 reads `user-select: none` and `font-variant-numeric: tabular-nums`; the live legacy site's reads `auto` and `normal` (the item's probe, repeated by a new one in the scratchpad).
Docs: `../ui/CHANGELOG.md`, an entry under Fixed, beside the recipes slice's badge entry.
Not this slice: the badge's box, type and radius ([[2363cb52f9d8]], `upstream` by [[2bd0169a6dda]]); the radius token scale ([[f40107b60034]], the operator's on `77cf83a1285a`); the story card's and the suppliers page's own badge props.

## Seams under test

None pure; the proof is a Playwright probe of the computed styles and a selection on `pnpm dev` under the override, against the live legacy site, and the screenshot pairs.

## Done when

- A Playwright probe at 1280 on `pnpm dev` under the override reads, on the first story card's badge on `/stories`, on the suppliers page's badges (`app/suppliers/page.tsx:168,177`) and on a filter badge on `/designs` (`app/_components/catalogue/Catalogue.tsx:341`, the `role="radio"` option, where `user-select` reaches a visitor), `user-select: auto` and `font-variant-numeric: normal`, the live legacy site's readings on `/stories` and `/designs`; a mouse drag across the `/stories` badge's text then reads that text from `window.getSelection().toString()`, as on legacy, saved beside the probe
- The badge's `display`, padding, font size and weight, radius, minimum height and palettes are unchanged (the recipes slice's readings: `inline-block`, 4px horizontal padding, 21px tall on a 21px line, no minimum height)
- `pnpm audit:pages` for `/`, `/stories`, `/designs` and `/suppliers` (every route with a `Badge`: `grep -rn "<Badge" app` prints four call sites in those routes' files) at 375, 768 and 1280 under the override, looked at: nothing moves, and every remaining difference on the pairs is ledgered
- In `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` green; the change committed by pathspec on its `main`, not pushed
- [[a90ae9e6e022]] is `upstream` with a note citing the sibling commit; `99f2fe62c62f` is `blocked_by` this slice (checked at the finish) and carries a note that the bump makes no site edit for it and repeats the probe on the published package
- The override and the `transpilePackages` entry reverted by path (`git restore -- package.json pnpm-lock.yaml next.config.ts`, `pnpm install --frozen-lockfile`); `timeout 900 just check` is green

## Outcome

## Log
