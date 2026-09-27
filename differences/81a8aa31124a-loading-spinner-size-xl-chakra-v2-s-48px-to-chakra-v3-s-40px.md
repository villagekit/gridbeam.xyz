---
title: "Loading spinner size xl: Chakra v2's 48px to Chakra v3's 40px"
status: upstream
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

- 2026-09-27: Fixed in ../ui at 476a1df (plan 7e0fc992af9c): a spinner recipe in src/components/Spinner.tsx, registered in src/theme/index.ts, writes xl at sizes.12 and md at sizes.6 over Chakra v3's. On pnpm dev under the file:../ui override the .chakra-spinner on /designs/bed-frame during the viewer's loading state reads 48px by 48px with a 2px border, the live legacy page's readings; the built Storybook's ui/Spinner story reads 24px at md. Waits on the operator's publish, which the bump plan 99f2fe62c62f consumes.
