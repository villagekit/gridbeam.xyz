---
title: "ui Section: the yborder-bg band's 2px dashed rules re-ported from the 0.9.0 section"
status: todo
parent: 337e35d86920
derived_from: a78b167170b8
tags:
  - "worker:fable"
priority: medium
---
A tinted `Section` in its default `yborder-bg` mode renders legacy's band again: the palette's `50` fill between a `2px dashed` top and bottom rule in its `200` shade, as `packages/ui-page/src/components/Section.tsx:65-73` at `fce357d` wrote it; on the home page the odd sections read `rgb(247, 250, 252)` between dashed `gray.200` rules, as on the live legacy site. Closes [[9746fd6890c2]] on `shell` for the shell record `a78b167170b8`, finished before the item was found (decision `40abdb2f222a`, a slice beside the record). A fix in `../ui`, so it follows decision `28c1a536`: committed in the sibling by pathspec, never pushed from here; seen on this site through the uncommitted `pnpm.overrides["@villagekit/ui"] = "file:../ui"` (`pnpm install` after each sibling edit) beside the uncommitted `transpilePackages: ['@villagekit/ui']` in `next.config.ts` that the `src/` copy needs (CLAUDE.md's ui row), both reverted by path before the commit; the item moved to `upstream` with a note citing the sibling commit; the bump plan `99f2fe62c62f` is `blocked_by` this slice (the edge written at the mint).

## Work

In `../ui/src/components/layouts/Section.tsx:52-76` the `yborder-bg` branch of `paletteCss` writes `backgroundColor: 'colorPalette.50'` alone, under a comment that keeps the band quiet on purpose and makes the `yborder` and `roundborder` modes `1px solid` so they do not compete with the dashed header and footer chrome; legacy's three branches (`Section.tsx:65-90` at `fce357d`) were all `2px dashed` in `colors[colorScheme][200]`: `yborder-bg` the `50` fill with top and bottom rules, `yborder` the rules alone, `roundborder` the fill, rules on all four sides and `borderRadius: 'xl'`. Write legacy's `yborder-bg` branch (`borderTopWidth: 2`, `borderBottomWidth: 2`, `borderStyle: 'dashed'`, `borderColor: 'colorPalette.200'` beside the fill), the item's fix, and replace the comment with the constraint (the branch is the 0.9.0 band, the legacy author's). The `yborder` and `roundborder` branches are 1.2.0's own drift from the same file: the port rule (`ee86d68a`) makes legacy's branches the default, so the worker re-ports all three unless a consumer on this site or in the package renders one of those modes (`grep -rn "mode=" ../ui/src app`), in which case the visible change on that route is filed as a difference first; the Outcome states which. The fill's token value (`gray.50` reading `#F7FAFC`) is the palette slice's ([[72b776cb0d3f]], `upstream`) and needs nothing here.
Verify first: on `pnpm dev` with the published 1.2.0 at 1280 on `/` the odd `section.vk-section` elements read `border-top-width: 0px`, and on the live legacy site `2px dashed rgb(226, 232, 240)`; `grep -rn "mode=" ../ui/src app` lists every consumer that sets a mode.
Docs: `../ui/CHANGELOG.md`, an entry under Fixed.
Not this slice: the band's fill value (the palette's, `upstream`); the home sections' padding and rhythm (the page re-port's, fixed); the section container's own padding ([[5c1af396cc2e]], the recipes slice minted beside this one).

## Seams under test

None pure; the proof is a Playwright probe of the computed borders on `pnpm dev` under the override, against the live legacy site, and the screenshot pairs.

## Done when

- A Playwright probe at 1280 and 375 on `/` under the override reads, on each tinted section (`section.vk-section` with a `colorPalette`), `border-top: 2px dashed rgb(226, 232, 240)`, the same at the bottom, `0px` left and right, and `background-color: rgb(247, 250, 252)`, the readings of the live legacy site's same sections; an untinted section reads no rule on both sides
- `pnpm audit:pages --routes scripts/audit-routes.txt` at 375, 768 and 1280 under the override (a tinted `Section` renders on `/`, `/about`, `/contact`, `/legal`, `/subscribe`, `/tools-and-resources`, the design pages and the story pages' `StorySection`), looked at: the bands' rules match legacy's and every remaining difference is ledgered
- In `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` green; the change committed by pathspec on its `main`, not pushed
- [[9746fd6890c2]] is `upstream` with a note citing the sibling commit; `99f2fe62c62f` is `blocked_by` this slice (checked at the finish) and carries a note that the bump makes no site edit for it
- The override and the `transpilePackages` entry reverted by path (`git restore -- package.json pnpm-lock.yaml next.config.ts`, `pnpm install --frozen-lockfile`); `timeout 900 just check` is green

## Outcome

## Log
