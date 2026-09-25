---
title: "Shadow token scale: Chakra v2's sm and md to v3's two-layer gray shadows"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/theme.ts` at `fce357d` extends Chakra v2's theme without touching `shadows`, so `boxShadow: 'sm'` (`packages/ui-page/src/components/BlockSection.tsx:24`) and `boxShadow: 'md'` (`apps/gridkit/components/story/story-video.tsx:28`, `story-image.tsx:12`) resolve to v2's `@chakra-ui/theme` foundations: live legacy site, `/stories/how-to-cut-grid-beams` at 1280, the tip's computed `box-shadow` is `rgba(0, 0, 0, 0.05) 0px 1px 2px 0px` and a story video's is `rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px`.

## Current

`../ui/src/theme/index.ts:34-37` defines `outline` and `outlineLarge` only, so `sm` and `md` are Chakra v3's semantic tokens (`node_modules/@chakra-ui/react/dist/esm/theme/semantic-tokens/shadows.js:13,19`): `0px 2px 4px {colors.gray.900/10}, 0px 0px 1px {colors.gray.900/30}` and `0px 4px 8px {colors.gray.900/10}, 0px 0px 1px {colors.gray.900/30}`. `pnpm dev` at 1280: the tip's computed `box-shadow` is `color(srgb 0.094 0.094 0.106 / 0.1) 0px 2px 4px 0px, color(srgb 0.094 0.094 0.106 / 0.3) 0px 0px 1px 0px`, a story video's the same with `0px 4px 8px`. Every `sm` and `md` shadow on the site (the story media, the cards, the tip) differs by the same scale.

## Verdict

## Log

- 2026-09-26: Found by the ui mdx and media slice [[bc0407533650]] measuring the tip and the story videos on both sides; pre-existing, not introduced there, the same shape as the radius scale item [[f40107b60034]]. The scale is the package's theme, so the fix is the ui's: v2's sm, base, md, lg, xl and 2xl values under defineTokens.shadows in ../ui/src/theme/index.ts, or a rule 4 verdict; a later ui slice or the bump plan [[99f2fe62c62f]] owns it, no slice does now.

- 2026-09-26: Fixed in ../ui as commit 9642114 (src/theme/index.ts: Chakra v2's xs, sm, md, lg, xl, 2xl and inner as semantic shadow tokens, base as a raw token), waiting on the operator's publish; the bump plan 99f2fe62c62f moves it to fixed. Closed by the palette slice c14505b76b6a on the orchestrator's brief, the fix being the package theme's tokens; measured on /stories/how-to-cut-grid-beams at 1280, every shadowed element with the same computed box-shadow on both sides.
