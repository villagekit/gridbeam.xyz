---
title: "Toaster stand-in: createToaster and a Toaster from @chakra-ui/react mounted by SiteProvider for the subscribe form until the ui publish exports toaster"
status: upstream
route: shell
axis: code
kind: added
---
## Legacy

`apps/gridkit/pages/_app.tsx:45` at `fce357d`: Chakra v2's `ChakraProvider` mounted the toast regions itself, and `packages/applet-subscribe/src/component.tsx:46` took `useToast()` from `@villagekit/ui` 0.9.0; no site file held a toaster.

## Current

`app/_components/Toaster.tsx`: `createToaster({ placement: 'bottom', pauseOnPageIdle: true })` and a `Toaster` component from `@chakra-ui/react` 3.35.0 directly, a copy of `../ui/src/Toaster.tsx` at `540e9c3`; `app/_components/SiteProvider.tsx:26` renders `<Toaster />` after the children inside `ChakraProvider`, and `app/subscribe/SubscribeForm.tsx:11` imports `toaster` from it. `@villagekit/ui` 1.2.0 exports no `toaster` and its `Provider` mounts no `Toaster` (`node_modules/@villagekit/ui/dist/index.d.ts`, `dist/Provider.js`), where the sibling exports `toaster` from `src/index.ts:3` and its `Provider` mounts the `Toaster` (`src/Provider.tsx:24`). The site's second direct Chakra import, after the search bar's `InputGroup` ([[983c471842e1]]). Every route's tree gains the region `Notifications, bottom (alt+T)` (`audit/subscribe/dom/current.aria.yaml`), the one region the operator judges on [[ee7575aea3ae]].

## Verdict

## Log

- 2026-09-28: Parked upstream at the mint (plan 244b962caae9): the toaster is in ../ui at 540e9c3 (`toaster` exported from src/index.ts:3, the `Toaster` mounted by src/Provider.tsx:24, the recipes and provider slice 45d6f5634a11), waiting on the operator's publish; the bump plan 99f2fe62c62f carries the note naming the import to swap, the file to delete and the `<Toaster />` line to drop with the `Provider` swap.
