---
title: "Mobile menu slide layer: Chakra v2's AnimatePresence wrapper removed"
status: open
route: shell
axis: code
kind: removed
---
## Legacy

`packages/ui-nav/src/components/NavMobileMenu.tsx:29` at `fce357d` renders the panel inside Chakra v2's `Slide` (`@chakra-ui/transition`, the version the legacy lockfile pins), which wraps its `motion.div` layer in framer-motion's `AnimatePresence`; with no `unmountOnExit` the layer is always mounted, so the wrapper runs no exit animation.

## Current

`../ui/src/components/nav/NavMobileMenu.tsx:47-51` (the nav slice `b0f69896e764`, sibling commit `1cf88ed`): the layer is a `motion.div` with legacy's `slideLeft` variants and no `AnimatePresence` around it; the exit is the variant's own `x: -100%` transition, as on legacy, since the layer never unmounts. Not visible: the slide's timing was measured the same on both sides in that slice's Outcome.

## Verdict

## Log

- 2026-09-26: Filed at the finish of the shell record [[a78b167170b8]] from the nav slice b0f69896e764's second review, which named it and did not file it; handed to the operator on the attended verdicts plan [[77cf83a1285a]] (decision 40abdb2f222a); the state stays until the operator judges it.
