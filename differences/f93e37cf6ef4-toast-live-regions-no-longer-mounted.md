---
title: Toast live regions no longer mounted
status: regression
route: shell
axis: code
kind: removed
---
## Legacy

`apps/gridkit/pages/_app.tsx:45`: Chakra v2's `ChakraProvider` mounts the toast portal; six `region "Notifications-*"` nodes in `audit/_root/dom/legacy.aria.yaml:182-187`. Consumers: `apps/gridkit/pages/store/[id].tsx` and `packages/applet-subscribe/src/component.tsx` (`useToast`).

## Current

`@villagekit/ui@1.2.0 src/Provider.tsx` and `app/layout.tsx` mount no `Toaster`; no notification region in `audit/_root/dom/current.aria.yaml`.

## Verdict

## Log

- 2026-09-12: Rule 4 covers the mechanism (Chakra v3 mounts toasts only through an explicit `Toaster`), not the loss of the subscribe form's feedback channel; the subscribe route's ledger says what its form does now.
