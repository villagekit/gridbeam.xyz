---
title: Toast live regions no longer mounted
status: upstream
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

- 2026-09-26: Fixed in ../ui by the recipes and provider slice [[45d6f5634a11]], commit 540e9c3: src/Provider.tsx and src/Toaster.tsx: Provider mounts a Toaster on createToaster placement bottom; the site mounts it when the bump swaps SiteProvider to Provider system={system}, after which the aria tree lists region Notifications, bottom (alt+T), one region where v2 mounted six (Ark's one region per toaster), for the bump's rule 4 reading. Waits in upstream for the bump plan [[99f2fe62c62f]].
