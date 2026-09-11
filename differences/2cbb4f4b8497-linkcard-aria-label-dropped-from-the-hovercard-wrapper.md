---
title: "LinkCard: aria-label dropped from the HoverCard wrapper"
status: regression
route: shell
axis: code
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/LinkCard.tsx:38-40`: `<HoverCard ... aria-label={title}>` around the card; `:58`: `<LinkOverlay as={LinkComponent} href={href} isExternal={isExternal} />`, an empty anchor. The label sits on a roleless `div`, so the anchor is unnamed there too.

## Current

`@villagekit/ui@1.2.0 src/components/LinkCard.tsx:32`: `<HoverCard as={as} h="full" paddingX="6" paddingY="8">`, no `aria-label`; `:47-56`: `<LinkOverlay asChild>` around an empty `chakra.a`, with the comment that the link goes unnamed. Used by the home page's cards (`audit/_root/dom/current.aria.yaml`: `link` to `/tools/cutting-planner` with no name).

## Verdict

## Log

- 2026-09-12: Note 526d5330's LinkCard finding: the unnamed anchor is the same on both sides (no accessibility item); the dropped attribute is the code difference. Fix lands upstream in ../ui and should name the anchor, not the wrapper.
