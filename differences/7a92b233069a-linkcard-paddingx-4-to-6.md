---
title: "LinkCard: paddingX 4 to 6"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/LinkCard.tsx:41` `paddingX: 4` (16 px); `paddingY: 8`.

## Current

`@villagekit/ui@1.2.0 src/components/LinkCard.tsx:32` `paddingX="6"` (24 px); `paddingY="8"` unchanged.

## Verdict

## Log

- 2026-09-12: Filed on shell from plan 848b026f; see the LinkCard box item for the routes it reaches.

- 2026-09-26: Fixed in ../ui as commit a4ef8ed on its main (not pushed; the push goes with the operator's publish, decision 28c1a536): src/components/LinkCard.tsx re-ported from @villagekit/ui@0.9.0 by plan [[1cc03cfabcf2]]. Waits in upstream for the bump plan [[99f2fe62c62f]].
