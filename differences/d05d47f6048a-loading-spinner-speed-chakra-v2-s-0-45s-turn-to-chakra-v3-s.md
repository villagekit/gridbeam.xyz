---
title: "Loading spinner speed: Chakra v2's 0.45s turn to Chakra v3's 500ms"
status: upstream
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

- 2026-09-27: Fixed in ../ui at 476a1df (plan 7e0fc992af9c): the spinner recipe's base writes animationDuration 0.45s, Chakra v2's default speed, as a literal since Chakra v3's durations tokens hold no 450ms value. On pnpm dev under the file:../ui override the .chakra-spinner on /designs/bed-frame during the viewer's loading state reads animation-duration 0.45s, linear, infinite, the live legacy page's readings; the built Storybook's ui/Spinner story reads 0.45s too. Waits on the operator's publish, which the bump plan 99f2fe62c62f consumes.
