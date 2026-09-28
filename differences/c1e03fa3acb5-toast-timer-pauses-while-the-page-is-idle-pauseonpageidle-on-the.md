---
title: "Toast timer pauses while the page is idle: pauseOnPageIdle on the stand-in toaster"
status: open
route: shell
axis: interaction
kind: added
---
## Legacy

Chakra v2's `useToast()` (`@chakra-ui/toast`): a toast's `duration` runs whether or not the page has the viewer's attention; `packages/applet-subscribe/src/component.tsx:77-83,88-93` at `fce357d` passes `duration: 10000` and `isClosable: true` alone.

## Current

`app/_components/Toaster.tsx:20-23`, the sibling's `src/Toaster.tsx` at `540e9c3`: `createToaster({ placement: 'bottom', pauseOnPageIdle: true })`, so a toast's ten seconds pause while the page is idle (zag's toast store, `pauseOnPageIdle`).

## Verdict

## Log

- 2026-09-28: Filed open by the Parity review of the subscribe re-port (plan 244b962caae9): an addition the sibling's toaster carries, the operator's to judge on the shell verdicts plan 77cf83a1285a; the bump keeps or drops it in the ui.
