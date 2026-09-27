---
title: "Card image sizes: base full to 100% until the ui publish restores the name"
status: upstream
route: /designs
axis: code
kind: changed
---

## Legacy

`apps/gridkit/components/catalogue/item.tsx:51-54,66-69` at `fce357d` `sizes={{ base: ['full', 2], lg: ['8xl', 3] }}` on the two `Image` branches of the card; `@villagekit/ui@0.9.0` `src/hooks/useSizeWidths.ts` holds `full` as `100%`, and `packages/ui-media/src/hooks.ts:86-96` at `fce357d` resolves it to `50.00vw`. The live site's card `img` carries `sizes="(min-width: 992px) 480.00px, 50.00vw"` (`audit/designs/card-probe.txt`, 2026-09-27).

## Current

`app/_components/catalogue/Item.tsx:56,73` `base: ['100%', 2]`: the published `@villagekit/ui@1.2.0` `useSizeWidths` names `3xs` to `8xl` only (`node_modules/@villagekit/ui/dist/hooks/useSizeWidths.js:4-19`), so `full` throws `Unexpected size value: full` (`dist/components/media/hooks.js:52`), and `100%` is the value legacy's own hook resolved `full` to. The mechanism of [[152511f71ef4]] on `/` and [[36dc54eb5955]] on `/about`. No attribute renders on either line while the image is `unoptimized` ([[2a0840f8087b]], the operator's): Next writes no `sizes` for an unoptimized image (`node_modules/next/dist/shared/lib/get-img-props.js:98-104`), so the swap back changes nothing rendered until that verdict; the check is the grep.

## Verdict

## Log

- 2026-09-27: Filed by the card re-port (plan e22f84fa6e1a), regression at the mint. Fixed in ../ui commit 1c3e3e8 (plan [[bc0407533650]]): src/hooks/useSizeWidths.ts names full as 100% again, the shell item [[252edab16c7a]]. Waits on the operator's publish; the bump plan [[99f2fe62c62f]] swaps the two call sites back to full and moves this to fixed.
