---
title: "MDX blockquote: a BlockSection stack to a blockquote element without the shadow"
status: regression
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
