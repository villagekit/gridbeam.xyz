---
title: "MDX blockquote: a BlockSection stack to a blockquote element without the shadow"
status: upstream
route: shell
axis: code
kind: changed
---
## Legacy

`packages/ui-mdx/src/blockquote.tsx:11-15` `<BlockSection Icon={FaQuoteRight}>`; `packages/ui-page/src/components/BlockSection.tsx:12-38` an `HStack` (a div) with `accentB.50` background, dashed `accentB.300` border, radius xl, `boxShadow: 'sm'`, padding 4/2, the text in `<Text as="div" variant="secondary">`; exposed as `paragraph` (`audit/stories__how-to-cut-grid-beams/dom/legacy.aria.yaml:70`).

## Current

`@villagekit/ui@1.2.0 src/mdx/blockquote.tsx:12-33` `<Box as="blockquote">` with the same background, border and radius, no shadow, padding 5/3, the text in a `Box color="gray.700"`; exposed as `blockquote` (`audit/stories__how-to-cut-grid-beams/dom/current.aria.yaml:121-122`).

## Verdict

## Log

- 2026-09-12: Found by the stories ledger (plan 843901f4): the story tips are the site's blockquotes.

- 2026-09-26: Fixed in ../ui commit 1c3e3e8 (plan [[bc0407533650]]): src/mdx/blockquote.tsx renders <BlockSection Icon={FaQuoteRight}>, the legacy ui-mdx blockquote on the already-ported BlockSection (shadow sm, padding 4 by 2, Text variant secondary, exposed as its paragraphs). Waits on the operator's publish; the bump plan [[99f2fe62c62f]] moves it to fixed. The legacy site's own Tip override of this blockquote is [[9affc679c88c]], the story pages record's.
