---
title: "ui Title: the heading's container at breakpoint-md, legacy's container.md width"
status: todo
parent: 337e35d86920
derived_from: a78b167170b8
tags:
  - "worker:fable"
priority: medium
---
The ui `Title` wraps its heading at legacy's width again: its `Container` is `maxW="breakpoint-md"` (768px, Chakra v3's size token for the `md` breakpoint), where `@villagekit/ui@1.2.0` and the sibling write `2xl` (672px) and legacy's `ui-page` `Title` wrote `container.md`. Closes [[318456ddabc6]] on `shell` for the shell record `a78b167170b8`, filed at the about split after the record was finished, its Log naming this slice for the about's finish (decision `40abdb2f222a`, a slice beside the record). A fix in `../ui`, so it follows decision `28c1a536`: committed in the sibling by pathspec, never pushed from here; seen on this site through the uncommitted `pnpm.overrides["@villagekit/ui"] = "file:../ui"` (`pnpm install` after each sibling edit) beside the uncommitted `transpilePackages: ['@villagekit/ui']` in `next.config.ts` that the `src/` copy needs (CLAUDE.md's ui row), both reverted by path before the commit; the item moved to `upstream` with a note citing the sibling commit; the bump plan `99f2fe62c62f` is `blocked_by` this slice (the edge written at the mint).

## Work

In `../ui/src/components/layouts/Title.tsx:19` `Title` writes `<Container maxW="2xl">` around its `AnchorHeading` (the published `@villagekit/ui@1.2.0 dist/components/layouts/Title.js:10` the same), where legacy's `packages/ui-page/src/components/Title.tsx:20` at `fce357d` wrote `<Container maxW="container.md">`, Chakra v2's 768px token. Chakra v3 has no `container.*` size: `expandBreakpoints` registers `sizes.breakpoint-md` from the `md` breakpoint (`node_modules/@chakra-ui/react/dist/esm/styled-system/token-dictionary.js:21-29`), 768px, and `sizes.2xl` is 42rem, 672px (`node_modules/@chakra-ui/react/dist/esm/theme/tokens/sizes.js:13`). Write `maxW="breakpoint-md"`, the name the LinkCard slice's ui commit `a4ef8ed` wrote on `CardsLayout`'s container for the same rename ([[8a3babf21c3c]]) and the about re-port wrote on the page's own container, with the constraint in a comment; nothing else in `Title` changes (the `VStack`'s `my="8" gap="12"`, the `paddingTop` breakpoint value, `Description`'s own `3xl` container). Every route that renders `Title` takes it: on this site `/about`, `/faq`, `/contact`, `/legal`, `/legal/privacy-policy`, `/tools-and-resources`, `/tools/cutting-planner`, `/stories`, `/stories/[slug]`, `/subscribe` and `/suppliers` (`grep -rln '<Title' app`, eleven files), several of them drifted routes their records re-port later; on legacy `/about`, `/faq`, `/stories`, `/tools/cutting-planner`, the story pages (`apps/gridkit/components/layouts/stories.tsx:56` at `fce357d`), `/subscribe` (`packages/applet-subscribe/src/page.tsx:32`) and the three `CardsLayout` routes. A heading narrower than 672px does not move; a wider one (a long story title, if any) wraps at 768px again, as on legacy. The reading is the container's computed `max-width`, on every route.
Verify first: on `pnpm dev` with the published 1.2.0, a probe at 1280 on `/about` reads the h1's parent `max-width` as `672px`; the live legacy site's reads `768px` (Chakra v2 emits `var(--chakra-sizes-container-md)`).
Docs: `../ui/CHANGELOG.md`, an entry under Fixed.
Not this slice: the heading recipe's sizes ([[0369f14e4df4]], [[77cd1426ac65]], `upstream`); `Description`'s container; the container recipe's padding ([[5c1af396cc2e]], `upstream` by [[2bd0169a6dda]]); the routes' own `Title` props (the added descriptions, the `as="h2"` section titles), each route record's.

## Seams under test

None pure; the proof is a Playwright probe of the computed style on `pnpm dev` under the override, against the live legacy site, and the screenshot pairs.

## Done when

- A Playwright probe at 1280 on `pnpm dev` under the override reads the h1's `Container` `max-width` as `768px` on `/about`, `/faq`, `/tools/cutting-planner`, `/stories` and one story page (the one with the longest title), the live legacy site's reading on the same routes; at 375 and 768 the same element reads `768px` on both sides too (the reading is the declared maximum, which does not change with the viewport), saved beside the probe
- `pnpm audit:pages --routes <a file naming the eleven routes that render Title>` at 375, 768 and 1280 under the override, looked at: no heading narrower than 672px moves, a wider one wraps as legacy's does, and every remaining difference on the pairs is ledgered (the `upstream` items' residuals, the shell's `c9ea22823a23` at 768, the routes' own open and regression items)
- In `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` green; the change committed by pathspec on its `main`, not pushed
- [[318456ddabc6]] is `upstream` with a note citing the sibling commit; `99f2fe62c62f` is `blocked_by` this slice (checked at the finish) and carries a note that the bump makes no site edit for it and that the bump repeats the probe on the published package
- The override and the `transpilePackages` entry reverted by path (`git restore -- package.json pnpm-lock.yaml next.config.ts`, `pnpm install --frozen-lockfile`); `timeout 900 just check` is green

## Outcome

## Log
