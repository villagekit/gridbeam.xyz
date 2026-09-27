---
title: "List message after a filter change: stays put under framer-motion to unmounted and faded in after 0.5 s under motion 12"
status: open
route: /designs
axis: interaction
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/list.tsx:37-43,99-121` at `fce357d` toggles `hideComingSoon` on every change of `items` (true in the effect, false in a 0 ms timer) to remount the list message's `MotionBox` and replay its fade-in (`delay: 0.5`, `duration: 0.3`). On the live site the message never remounts: sampled every 100 ms for 1.5 s after a click on `Cats` at 1280, the same element stays at `opacity` 1 throughout (the probe of plan 8417428fd88a, `audit/designs/probe2.txt`); the likely mechanism, unverified, is `framer-motion` 7.10.3's `AnimatePresence` keeping the exiting child and reusing it when the same key returns in the next task.

## Current

`app/_components/catalogue/List.tsx:34-38,92-114`, legacy's lines under `motion/react` 12: after the same click the message is unmounted and a new element fades in, `opacity` 0 for 500 ms then 0.17, 0.53, 1 over the next 300 ms, so the message blinks out and back on every filter, sort and search change where legacy's stays put.

## Verdict

## Log

- 2026-09-27: Filed by the catalog re-port (plan 8417428fd88a) from its probe at 1280; not judged. The code is legacy's line for line and the library change is the sanctioned 1504573f72ba, so rule 4 (upgrade-forced) may cover it; whether legacy's live behavior (no blink) or its source's intent (the replayed fade) is the baseline is the operator's call.
