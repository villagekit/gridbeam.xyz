---
title: Suppliers card description clips inside the fixed 224 by 256 card
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/LinkCard.tsx:41` gives every card a fixed 3xs by 64 box with overflow hidden; legacy's home page has no LinkCards (`audit/_root/1280/legacy.png`).

## Current

With LinkCard re-ported to that box (ui LinkCard.tsx after plan 1cc03cfabcf2, seen through the sibling override), the For makers section's Suppliers card content is 262px tall in a 252px inner height, so its last line is cut, at 375, 768 and 1280 (measured by a Playwright probe on 2026-09-26; `app/page.tsx:357-362`). The copy is this route's: the section and card items b1d7776f996d and 56c60f34ef43.

## Verdict

## Log

- 2026-09-26: Found by the Parity review of the ui LinkCard slice [[1cc03cfabcf2]] (ui commit pending at the bump plan [[99f2fe62c62f]]): the card's box is legacy's (a fixed 3xs by 64 with overflow hidden, item 852324855146 moved to upstream), and the copy longer than legacy's is this route's own (its card copy and added-card items); no rule covers text a visitor cannot read, so regression. Shows on the pairs once the bump lands the package; closed by whichever verdict shortens the copy to fit or by a route slice that gives the card room, judged by the rules, never by an agent.
