---
title: "Install video: a full-width plain embed to a capped, rounded, shadowed box"
status: regression
route: /stories/how-to-furniture-bolts
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/stories/how-to-furniture-bolts.mdx:326` `width='100%'`, no cap, radius or shadow; the embed spans the column in `audit/stories__how-to-furniture-bolts/1280/legacy.png`.

## Current

`content/stories/how-to-furniture-bolts.mdx:327-334` `maxW="3xl" mx="auto" borderRadius="xl" boxShadow="md"`; a narrower centred box in `audit/stories__how-to-furniture-bolts/1280/current.png`.

## Verdict

## Log
