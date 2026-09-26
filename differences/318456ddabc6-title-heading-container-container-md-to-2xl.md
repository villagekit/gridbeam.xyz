---
title: "Title heading container: container.md to 2xl"
status: upstream
route: shell
axis: code
kind: changed
---
## Legacy

`packages/ui-page/src/components/Title.tsx:20`: the heading sits in `<Container maxW="container.md">` (768px, Chakra v2's `container.md` token), so an `h1` on every route that renders `Title` (`/about`, `/faq`, `/contact`, `/legal`, `/tools-and-resources`, the `CardsLayout` routes) wraps at 768px less the container's padding.

## Current

`@villagekit/ui@1.2.0 dist/components/layouts/Title.js:10` and the sibling `../ui/src/components/layouts/Title.tsx:19`: `<Container maxW="2xl">` (672px, Chakra v3's `sizes.2xl`), where the v3 name for legacy's width is `breakpoint-md` (768px, the token `expandBreakpoints` registers from the `md` breakpoint, `node_modules/@chakra-ui/react/dist/esm/styled-system/token-dictionary.js:21-29`). Invisible where a heading is narrower than 672px, as `What is grid beam?` is at the `2xl` heading size from `md` (about 450px); a longer heading, or one at a narrower breakpoint above 672px, wraps sooner than legacy's. The same rename `8a3babf21c3c` records on `CardsLayout`'s container, fixed in the sibling at ui commit `a4ef8ed`; `Title`'s was not.

## Verdict

## Log

- 2026-09-26: Filed at the about split (plan [[40179ab9e779]]) from the review of the page re-port slice [[97e702d40df5]], which would otherwise have filed it only where the pairs showed the heading wrapping, a condition the about heading never meets. The ui is first-party (CLAUDE.md, Principles), so the fix is one line in ../ui, src/components/layouts/Title.tsx:19 to maxW="breakpoint-md", by a ui slice minted beside the shell record (decision 40abdb2f222a, as the home finish minted [[2bd0169a6dda]]), at the about finish unless a ui slice takes it sooner; it then parks in upstream until the bump plan [[99f2fe62c62f]] (decision 28c1a536). Never fixed in a route.

- 2026-09-26: At the about record's finish (plan [[40179ab9e779]]): the fix in ../ui is the slice [[728a36aedc8c]], minted beside the shell record (decision 40abdb2f222a, worker:fable, blocking the bump plan [[99f2fe62c62f]]), one line in src/components/layouts/Title.tsx to maxW breakpoint-md; the slice moves this item to upstream with the sibling commit (decision 28c1a536).

- 2026-09-26: Fixed in ../ui as commit 5c5cd1e (plan [[728a36aedc8c]]): src/components/layouts/Title.tsx writes maxW breakpoint-md, the size token Chakra v3 generates from the md breakpoint (768px), the legacy container.md. Under the file:../ui override a probe reads the h1's Container max-width as 768px on /about, /faq, /tools/cutting-planner, /stories and /stories/how-to-furniture-bolts at 1280, 768 and 375, the live legacy site's reading on every route and width (the published 1.2.0 read 672px), and the longest story title wraps after the same word on both sides. Waits on the operator's publish; the bump plan [[99f2fe62c62f]] moves it to fixed.
