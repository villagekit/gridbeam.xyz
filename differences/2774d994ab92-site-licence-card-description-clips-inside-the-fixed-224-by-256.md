---
title: Site licence card description clips inside the fixed 224 by 256 card
status: regression
route: /legal
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/LinkCard.tsx:41` gives every card a fixed 3xs by 64 box with overflow hidden, and legacy's three card descriptions fit it with room to spare (`audit/legal/1280/legacy.png`: Return policy, Privacy policy, Cookie policy, none clipped at 375, 768 or 1280).

## Current

With LinkCard re-ported to that box (ui LinkCard.tsx after plan 1cc03cfabcf2, seen through the sibling override), the Site licence card's content is 286px tall in a 252px inner height, so its description stops mid-line at `the European Union` (`audit/legal/1280/current.png`; the same at 375 and 768). The copy is this route's: item 699fd2e0b625 (the card added) and, for the Privacy policy card, c99d9cf3728c. Measured by a Playwright probe on 2026-09-26.

## Verdict

## Log

- 2026-09-26: Found by the Parity review of the ui LinkCard slice [[1cc03cfabcf2]] (ui commit pending at the bump plan [[99f2fe62c62f]]): the card's box is legacy's (a fixed 3xs by 64 with overflow hidden, item 852324855146 moved to upstream), and the copy longer than legacy's is this route's own (its card copy and added-card items); no rule covers text a visitor cannot read, so regression. Shows on the pairs once the bump lands the package; closed by whichever verdict shortens the copy to fit or by a route slice that gives the card room, judged by the rules, never by an agent.
