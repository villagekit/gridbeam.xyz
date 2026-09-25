---
title: "Inline links: display inline to Chakra v3's inline-flex, a link no longer breaks across lines"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's `Link` renders `display: inline` (no display rule in `@chakra-ui/theme`'s link component), so a link breaks across lines with its sentence: on the live site at 375 the steps list's `with the community!` wraps inside the link (two client rects; `audit/_root/375/legacy.png`, the bottom of the `How to get started` list). The four inline links on the home page are `apps/gridkit/pages/index.tsx:228,244,270,347` at `fce357d`.

## Current

Chakra v3's link recipe sets `display: inline-flex`, `alignItems: center` and `gap: 1.5` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/link.js:7-10`), which `@villagekit/ui@1.2.0`'s `linkRecipe` extends without overriding (`node_modules/@villagekit/ui/dist/components/Link.js`), so a link is an atomic box that moves whole onto the next line: at 375 `with the community!` sits alone on its own line (one client rect; `audit/_root/375/current.png`), and at 768 any link landing at a line end does the same. Every `Link` on every route takes it; on the home page `app/HomePage.tsx:232,248,270,346`.

## Verdict

## Log

- 2026-09-26: Found by the Parity review of the page re-port (plan [[159c621d8a1a]]), in the published 1.2.0 link recipe and not in the page: the previous home page had it too, and no item on / or shell recorded it. Not rule 4: display inline on the ui linkRecipe restores legacy's wrapping. The ui's to fix in ../ui, closed at the bump.
