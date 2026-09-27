---
title: "Loading spinner element: Chakra v2's div to Chakra v3's span"
status: open
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/loading.tsx:16` `<Spinner size="xl" />`: Chakra v2's Spinner renders `chakra.div` with the class `chakra-spinner` (the packed `@chakra-ui/spinner` `dist/chunk-5PH6ULNP.mjs:44-46`); the live legacy page reads `<div class="chakra-spinner ...">`.

## Current

`app/_components/design/DesignViewerDynamic.tsx:10` `<Spinner size="xl" />`: Chakra v3's Spinner is `withContext("span")` (`node_modules/@chakra-ui/react/dist/esm/components/spinner/spinner.js:8`), and the ui wrapper `../ui/src/components/Spinner.tsx` forwards an `HTMLSpanElement` ref; the page reads `<span class="chakra-spinner ...">`. Read by the Parity review of plan 65ee8339cb1d.

## Verdict

## Log
