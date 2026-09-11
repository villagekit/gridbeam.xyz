---
title: Privacy policy heading anchors and ids dropped
status: regression
route: /legal/privacy-policy
axis: interaction
kind: removed
---
## Legacy

Every MDX heading renders through `MarkdownHeading` with `hasAnchor` (`packages/ui-mdx/src/heading.tsx:7`): `packages/ui-page/src/components/Heading.tsx:28-53` gives it an `id` from its text, a `scrollMarginTop` below the nav, and wraps the text in `<Box as="a" href={`#${id}`}>`. `audit/legal__privacy-policy/dom/legacy.aria.yaml:22-24` `heading "Privacy policy" [level=1]: - link "Privacy policy": /url: "#privacy-policy"`, and likewise for each section heading: every section is deep-linkable.

## Current

`app/legal/privacy-policy/page.tsx:40-224` `<Title>` and eleven `<Heading as="h2|h3">` with no `id` and no anchor (`audit/legal__privacy-policy/dom/current.aria.yaml:23-77`: plain headings). `@villagekit/ui@1.2.0` still exports `AnchorHeading` (used by the story pages), so the drop is not forced.

## Verdict

## Log

- 2026-09-12: Found by the Parity review of plan 848b026f. The route outcome of the MDX-to-JSX port (its code item on this route); the Title and MDX heading mappings themselves are shell.
