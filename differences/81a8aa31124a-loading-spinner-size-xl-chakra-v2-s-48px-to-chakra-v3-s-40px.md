---
title: "Loading spinner size xl: Chakra v2's 48px to Chakra v3's 40px"
status: open
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/loading.tsx:16` `<Spinner size="xl" />` under Chakra v2's spinner theme, whose `xl` is `sizes.12`, 48px (the packed `@chakra-ui/theme` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/theme/dist/index.js:2352-2354`); `md` is `sizes.6`, 24px.

## Current

`app/_components/design/DesignViewerDynamic.tsx:10` `<Spinner size="xl" />` (and the engine's `@villagekit/product-kit` `view.tsx:33`) under Chakra v3's spinner recipe, whose `xl` is `sizes.10`, 40px (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/spinner.js:27`); `md` is `sizes.5`, 20px. The ui wrapper `../ui/src/components/Spinner.tsx` writes no size. Read from the two themes by the Parity review of plan 65ee8339cb1d; the loading state is too short for the screenshot pairs to hold it.

## Verdict

## Log
