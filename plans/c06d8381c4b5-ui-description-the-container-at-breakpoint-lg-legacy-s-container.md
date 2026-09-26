---
title: "ui Description: the container at breakpoint-lg, legacy's container.lg width"
status: todo
parent: 337e35d86920
derived_from: a78b167170b8
tags:
  - "worker:fable"
priority: medium
---
The ui `Description` bounds its sentence at legacy's width again: its `Container` is `maxW="breakpoint-lg"` (1024px, Chakra v3's size token for the `lg` breakpoint), where `@villagekit/ui@1.2.0` and the sibling write `3xl` (768px) and legacy's `ui-page` `Description` wrote `container.lg`. Closes [[c325dd0181d9]] on `shell` for the shell record `a78b167170b8`, filed by the Parity review of the Title slice `728a36aedc8c` (decision `40abdb2f222a`, a slice beside the record). A fix in `../ui`, so it follows decision `28c1a536`: committed in the sibling by pathspec, never pushed from here; seen on this site through the uncommitted `pnpm.overrides["@villagekit/ui"] = "file:../ui"` (`pnpm install` after each sibling edit) beside the uncommitted `transpilePackages: ['@villagekit/ui']` in `next.config.ts` that the `src/` copy needs (CLAUDE.md's ui row), both reverted by path before the commit; the item moved to `upstream` with a note citing the sibling commit; the bump plan `99f2fe62c62f` is `blocked_by` this slice (the edge written at the mint).

## Work

In `../ui/src/components/layouts/Description.tsx:18` `Description` writes `<Container maxW="3xl">` around its `Text` (the published `@villagekit/ui@1.2.0 dist/components/layouts/Description.js` the same), where legacy's `packages/ui-page/src/components/Description.tsx:23` at `fce357d` wrote `<Container maxW="container.lg">`, Chakra v2's 1024px token. Chakra v3 has no `container.*` size: `expandBreakpoints` registers `sizes.breakpoint-lg` from the `lg` breakpoint (`node_modules/@chakra-ui/react/dist/esm/styled-system/token-dictionary.js:21-29`), 1024px, and `sizes.3xl` is 48rem, 768px (`node_modules/@chakra-ui/react/dist/esm/theme/tokens/sizes.js:14`). Write `maxW="breakpoint-lg"`, the name `../ui/src/hooks/useSizeWidths.ts:50` maps `container.lg` to and the form the Title slice's ui commit `5c5cd1e` wrote on `Title`'s container; nothing else in `Description` changes (the `fontSize` breakpoint value, the centered `Text`, `textAs`). The TSDoc on `Title` (`../ui/src/components/layouts/Title.tsx`, written by `5c5cd1e`) names the description's bound as `3xl`; it says `lg` breakpoint's width after this. Every route that passes `description` to `Title`, or renders `Description` itself, takes it: on this site `/faq`, `/contact`, `/legal`, `/legal/privacy-policy`, `/tools-and-resources`, `/tools/cutting-planner`, `/subscribe` and `/stories/[slug]` (`grep -rln 'description=' app` with `Title`), several of them added descriptions their route records remove; on legacy `/stories`, the story pages and `/tools/cutting-planner`, and the two newsletters' closing `Description`. A description narrower than 768px does not move; a wider one (the story page's, at 1280) is one line again, as on legacy. The reading is the container's computed `max-width`, on every route.
Verify first: on `pnpm dev` with the published 1.2.0, a probe at 1280 on `/stories/how-to-furniture-bolts` reads the description paragraph's parent `max-width` as `768px` and the paragraph two lines tall; the live legacy site's reads `1024px` and one line (Chakra v2 emits `var(--chakra-sizes-container-lg)`).
Docs: `../ui/CHANGELOG.md`, an entry under Fixed.
Not this slice: the heading recipe's sizes ([[0369f14e4df4]], [[77cd1426ac65]], `upstream`); the story page's own `3xl` container ([[69e3e2447813]], the story pages' record), which caps the description at 736px there until that record re-ports the page; the routes' own `Title` descriptions (added copy, each route record's).

## Seams under test

None pure; the proof is a Playwright probe of the computed style on `pnpm dev` under the override, against the live legacy site, and the screenshot pairs.

## Done when

- A Playwright probe at 1280 on `pnpm dev` under the override reads the description's `Container` `max-width` as `1024px` on `/tools/cutting-planner`, `/stories/how-to-furniture-bolts` and `/faq`, the live legacy site's reading on the routes it renders a description on; at 375 and 768 the same element reads `1024px` on both sides too (the declared maximum does not change with the viewport), saved beside the probe
- `pnpm audit:pages --routes <a file naming the routes that render a description>` at 375, 768 and 1280 under the override, looked at: no description narrower than 768px moves, a wider one is one line as legacy's is, and every remaining difference on the pairs is ledgered (the `upstream` items' residuals, the shell's `c9ea22823a23` at 768, the routes' own open and regression items)
- In `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` green; the change committed by pathspec on its `main`, not pushed
- [[c325dd0181d9]] is `upstream` with a note citing the sibling commit; `99f2fe62c62f` is `blocked_by` this slice (checked at the finish) and carries a note that the bump makes no site edit for it and that the bump repeats the probe on the published package
- The override and the `transpilePackages` entry reverted by path (`git restore -- package.json pnpm-lock.yaml next.config.ts`, `pnpm install --frozen-lockfile`); `timeout 900 just check` is green

## Outcome

## Log
