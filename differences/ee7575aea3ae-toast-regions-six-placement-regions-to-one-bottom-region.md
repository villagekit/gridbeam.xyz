---
title: "Toast regions: six placement regions to one bottom region"
status: regression
route: shell
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/pages/_app.tsx:45` at `fce357d`: Chakra v2's `ChakraProvider` mounts its toast portal with one region per placement, six `region "Notifications-<placement>"` nodes (`top`, `top-left`, `top-right`, `bottom-left`, `bottom`, `bottom-right`) in `audit/faq/dom/legacy.aria.yaml`, whatever a page's toasts use.

## Current

`../ui/src/Toaster.tsx` (the recipes slice): one Ark `Toaster` on one `createToaster({ placement: 'bottom' })`, so the tree holds one `region "Notifications, bottom (alt+T)"` (`audit/faq/dom/current.aria.yaml`), Ark's one region per toaster with the hotkey in its name. The site's toasts, when the subscribe form gets them back, all use the default placement, so the one region is the one they land in.

## Verdict

## Log

- 2026-09-26: Filed by the recipes slice [[45d6f5634a11]] when it mounted the Toaster for [[f93e37cf6ef4]]: the regions are back, their number and names are Chakra v3's. Whether that is upgrade-forced (rule 4) is the operator's verdict, at the bump [[99f2fe62c62f]] or the parity gate; six toasters, one per placement, would reproduce the count but not the names, and no slice owns it.

- 2026-09-26: Handed to the operator on the attended verdicts plan [[77cf83a1285a]] at the finish of the shell record [[a78b167170b8]] (decision 40abdb2f222a); the state stays until the operator judges it.
