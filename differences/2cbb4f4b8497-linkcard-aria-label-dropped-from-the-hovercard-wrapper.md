---
title: "LinkCard: aria-label dropped from the HoverCard wrapper"
status: upstream
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

- 2026-09-26: Fixed in ../ui as commit a4ef8ed on its main (not pushed; the push goes with the operator's publish, decision 28c1a536): src/components/LinkCard.tsx re-ported from @villagekit/ui@0.9.0 by plan [[1cc03cfabcf2]]. Waits in upstream for the bump plan [[99f2fe62c62f]].

- 2026-09-26: The earlier note here said the fix should name the anchor, not the wrapper; plan [[1cc03cfabcf2]] chose the wrapper, as 0.9.0 had it (aria-label on the HoverCard div, which names nothing, the overlay anchor unnamed on both sides), because naming the anchor is an accessibility addition beyond legacy's markup and the accessibility pass after M2 (note eeba2a65cee4) owns it. The conflict is recorded here so nobody reads the earlier note as the shipped shape.
