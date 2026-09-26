---
title: "MDX blockquote on the site: legacy's Tip override with a lightbulb icon at maxWidth lg to the package's quote icon at full width"
status: fixed
route: /stories/how-to-cut-grid-beams
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/mdx/index.tsx:1-9` at `fce357d` spreads the `ui-mdx` components and overrides `blockquote` with `apps/gridkit/components/mdx/blockquote.tsx:9-18`: `<Tip sx={{ alignSelf: 'center', maxWidth: 'lg' }}>`, and `apps/gridkit/components/tip.tsx:11-19` renders `<BlockSection Icon={FaRegLightbulb} sx={sx}>`. Live legacy site, `/stories/how-to-cut-grid-beams` at 1280: the tip is a 472px dashed box with a lightbulb icon, centered in the story column.

## Current

`mdx-components.tsx:1-9` spreads `mdxComponents` from `@villagekit/ui/mdx` with no override, so the story blockquote is the package's `MdxBlockquote` (`../ui/src/mdx/blockquote.tsx`, a `BlockSection` with `FaQuoteRight` since the mdx and media slice; a `blockquote` element at 1.2.0) at the column's full width: a 456px box with a quote icon on `pnpm dev` at 1280. The site never had a `Tip` component or the `blockquote` override.

## Verdict

plan 373320c9

## Log

- 2026-09-26: Found by the ui mdx and media slice [[bc0407533650]] comparing the tip on /stories/how-to-cut-grid-beams: the item [[f9b9ec72d771]] compared the ui-mdx blockquote alone, and the legacy site overrode it. The fix is site-side, a Tip on the ui BlockSection wired into mdx-components.tsx as legacy's apps/gridkit/components/mdx did, and belongs to the story pages record [[56e6eb197e6c]] (the six story routes are the only routes with a blockquote); it needs no publish, since BlockSection is in 1.2.0. Not a copy change.

- 2026-09-26: Route moved from shell to the first story route that renders a blockquote, the way [[8df7a085e421]] was placed, so the story pages record [[56e6eb197e6c]] owns it outright; it also holds on the other story pages with a blockquote (/stories/how-to-furniture-bolts, /stories/building-with-grid-kit). The shell record's rule that every shell regression is named in one slice is kept.
