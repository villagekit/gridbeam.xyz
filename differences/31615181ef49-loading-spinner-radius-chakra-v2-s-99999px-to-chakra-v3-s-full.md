---
title: "Loading spinner radius: Chakra v2's 99999px to Chakra v3's full token, 9999px"
status: open
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/loading.tsx:16` `<Spinner size="xl" />` under Chakra v2's Spinner, whose `spinnerStyles` write `borderRadius: "99999px"` (the packed `@chakra-ui/spinner` `dist/chunk-5PH6ULNP.mjs:37` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`); the live page's `.chakra-spinner` computes `border-radius: 99999px`.

## Current

`app/_components/design/DesignViewerDynamic.tsx:10` `<Spinner size="xl" />` under Chakra v3's spinner recipe, whose base writes `borderRadius: "full"` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/spinner.js:11`), the `full` radii token, 9999px; the page's `.chakra-spinner` computes `border-radius: 9999px`. Both draw a circle at every size the recipe has, so nothing visible differs. Read from the two probes by the Parity review of plan 7e0fc992af9c, which read the spinner property by property; the ui recipe of that plan (`../ui` 476a1df) leaves it as v3's.

## Verdict

## Log
