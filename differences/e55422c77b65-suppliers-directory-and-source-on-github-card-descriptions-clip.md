---
title: Suppliers directory and Source on GitHub card descriptions clip inside the fixed 224 by 256 card
status: regression
route: /tools-and-resources
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/LinkCard.tsx:41` gives every card a fixed 3xs by 64 box with overflow hidden, and legacy's one card (Cutting planner) fits it with room to spare (`audit/tools-and-resources/1280/legacy.png`, none clipped at any width).

## Current

With LinkCard re-ported to that box (ui LinkCard.tsx after plan 1cc03cfabcf2, seen through the sibling override), the Suppliers directory card's content is 286px and the Source on GitHub card's 310px tall in a 252px inner height, so their descriptions stop at the card's bottom edge (`audit/tools-and-resources/1280/current.png`, `audit/tools-and-resources/375/current.png`). The copy is this route's: the added-card items d0f2155130dc and 530a31cd8099. Measured by a Playwright probe on 2026-09-26.

## Verdict

## Log

- 2026-09-26: Found by the Parity review of the ui LinkCard slice [[1cc03cfabcf2]] (ui commit pending at the bump plan [[99f2fe62c62f]]): the card's box is legacy's (a fixed 3xs by 64 with overflow hidden, item 852324855146 moved to upstream), and the copy longer than legacy's is this route's own (its card copy and added-card items); no rule covers text a visitor cannot read, so regression. Shows on the pairs once the bump lands the package; closed by whichever verdict shortens the copy to fit or by a route slice that gives the card room, judged by the rules, never by an agent.
