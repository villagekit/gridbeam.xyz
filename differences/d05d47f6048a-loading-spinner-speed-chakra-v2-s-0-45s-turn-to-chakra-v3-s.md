---
title: "Loading spinner speed: Chakra v2's 0.45s turn to Chakra v3's 500ms"
status: open
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/loading.tsx:16` `<Spinner size="xl" />` under Chakra v2's Spinner, whose `speed` defaults to `0.45s` per turn (the packed `@chakra-ui/spinner` `dist/chunk-5PH6ULNP.mjs:26` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`).

## Current

`app/_components/design/DesignViewerDynamic.tsx:10` `<Spinner size="xl" />` under Chakra v3's spinner recipe, whose `animationDuration` is the `slowest` token, 500ms per turn (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/spinner.js:14`, `theme/tokens/durations.js:11`). The ui wrapper `../ui/src/components/Spinner.tsx` writes no duration. Read from the two sources by the Parity review of plan 65ee8339cb1d.

## Verdict

## Log
