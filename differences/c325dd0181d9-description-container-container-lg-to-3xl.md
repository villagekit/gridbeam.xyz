---
title: "Description container: container.lg to 3xl"
status: upstream
route: shell
axis: code
kind: changed
---
## Legacy

`packages/ui-page/src/components/Description.tsx:23` at `fce357d`: the description sits in `<Container maxW="container.lg">` (1024px, Chakra v2's `container.lg` token), centered at `md` type, `lg` from the `md` breakpoint. `Title` renders it under the heading when a route passes `description` (`packages/ui-page/src/components/Title.tsx:24`): on legacy `/stories` (`apps/gridkit/pages/stories.tsx:18`), the story pages (`apps/gridkit/components/layouts/stories.tsx:56`) and `/tools/cutting-planner` (`apps/gridkit/pages/tools/cutting-planner.tsx:9`); two newsletters render it directly (`apps/gridkit/pages/stories/2021-winter-newsletter.mdx:213`, `2022-newsletter.mdx:268`). On the live site at 1280 the description of `/stories/how-to-furniture-bolts` is one line, 992px wide and 27px tall.

## Current

`@villagekit/ui@1.2.0 dist/components/layouts/Description.js` and the sibling `../ui/src/components/layouts/Description.tsx:18`: `<Container maxW="3xl">` (768px, Chakra v3's `sizes.3xl`, 48rem), where the v3 name for legacy's width is `breakpoint-lg` (1024px, the size token `expandBreakpoints` registers from the `lg` breakpoint, `node_modules/@chakra-ui/react/dist/esm/styled-system/token-dictionary.js:21-29`, the name `../ui/src/hooks/useSizeWidths.ts:50` already maps `container.lg` to). Under the `file:../ui` override at 1280 the same description on `/stories/how-to-furniture-bolts` runs to two lines, 704px wide and 54px tall (the story page's own `3xl` container, [[69e3e2447813]], caps it at 736px there even after a fix). Every route that passes `description` to `Title` takes it: on this site `/faq`, `/contact`, `/legal`, `/legal/privacy-policy`, `/tools-and-resources`, `/tools/cutting-planner`, `/subscribe` and the story pages, several of them added descriptions their route records remove.

## Verdict

## Log

- 2026-09-26: Filed from the Parity review of the Title slice [[728a36aedc8c]], which fixed the sibling component's heading container ([[318456ddabc6]]) and scoped this one out; no shell item named it (the earlier Description items are per-route: [[8661edb0bbc8]] cites the legacy width). The ui is first-party (CLAUDE.md, Principles), so the fix is one line in ../ui, src/components/layouts/Description.tsx:18 to maxW="breakpoint-lg", by the ui slice [[c06d8381c4b5]] minted beside the shell record (decision 40abdb2f222a, blocking the bump plan [[99f2fe62c62f]]); it then parks in upstream until the bump (decision 28c1a536). Never fixed in a route.

- 2026-09-26: Fixed in ../ui by the Description slice [[c06d8381c4b5]], ui commit 8f85a7c on its main: Description's Container is maxW breakpoint-lg (1024px), Chakra v3's size token for the lg breakpoint, the width legacy's container.lg wrote; under the file:../ui override the container reads max-width 1024px at 1280, 768 and 375 on /tools/cutting-planner, /stories/how-to-furniture-bolts, /faq and /stories, the live legacy site's reading, and the planner's description at 1280 is 992 by 27, legacy's sizes. Waiting on the operator's publish; the bump plan [[99f2fe62c62f]] moves it to fixed (decision 28c1a536).
