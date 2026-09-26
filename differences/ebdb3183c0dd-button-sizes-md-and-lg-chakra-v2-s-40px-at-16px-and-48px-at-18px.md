---
title: "Button sizes md and lg: Chakra v2's 40px at 16px and 48px at 18px to v3's 40px at 14px and 44px at 16px"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's button theme (`@chakra-ui/theme`, `components/button.ts`: `md` is `h: 10`, `fontSize: md`, `px: 4`; `lg` is `h: 12`, `fontSize: lg`, `px: 6`), which `@villagekit/ui@0.9.0`'s button theme did not override; on the live site every home CTA (`apps/gridkit/pages/index.tsx:69` `buttonSize = isMobile ? 'md' : 'lg'`) is 40px tall at 16px at 375 and 48px tall at 18px at 768 and 1280 (a probe on 2026-09-26; `audit/_root/{375,1280}/legacy.png`).

## Current

`@villagekit/ui@1.2.0`'s `buttonRecipe` (`node_modules/@villagekit/ui/dist/components/Button.js:11-89`) defines no `size` variants, so Chakra v3's button recipe applies (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/button.js:69-86`: `md` is `h: 10`, `textStyle: sm`, `px: 4`; `lg` is `h: 11`, `textStyle: md`, `px: 5`); the same CTAs on `pnpm dev` (`app/HomePage.tsx:73`, legacy's `buttonSize`) are 40px tall at 14px at 375 and 44px tall at 16px at 768 and 1280 (`audit/_root/{375,1280}/current.png`). Every `Button` and `LinkButton` on every route takes these sizes.

## Verdict

## Log

- 2026-09-26: Found at the page re-port of / (plan [[159c621d8a1a]]), which passes legacy's responsive buttonSize ([[6e96991035bf]] fixed) and meets the recipe's sizes: the M1 ledger has no item on it, the previous page having written size lg fixed. The ui's to fix in ../ui, a size variant set on buttonRecipe as the input recipe carries v2's sizes ([[6b5488415a06]]), closed at the bump.

- 2026-09-26: At the home record's finish (plan [[fd9a92bd8abd]]): the fix in ../ui is the slice [[2bd0169a6dda]], minted beside the shell record (decision 40abdb2f222a, worker:fable, blocking the bump plan [[99f2fe62c62f]]); the slice moves this item to upstream with the sibling commit (decision 28c1a536).

- 2026-09-26: Fixed in ../ui at commit 6603102 (plan [[2bd0169a6dda]]): a size variant set on buttonRecipe with Chakra v2's four sizes (lg h 12 at fontSize lg px 6, md h 10 at md px 4, sm h 8 at sm px 3, xs h 6 at xs px 2), each with textStyle none so v3's line height stays out and the base's 1.2 applies; v3's per-size gap and icon sizes stay. On pnpm dev under the override, the home CTAs read 48px tall at 18px on a 21.6px line with 24px padding at 1280 and 768, and 40px at 16px on 19.2px with 16px padding at 375, the live legacy site's readings; the hover, press and focus colors, fills and transforms of the toggle and the header action are as the earlier slices read them. The header action (size sm, sanctioned [[e48df8d1ce98]]) is 32px tall at 14px, v2's sm, where 1.2.0 rendered 36px; the catalog's Clear search button (size sm where legacy passed none) is 32px square, filed as [[ebea31322f3c]] on /designs. Waits on the publish; the bump plan [[99f2fe62c62f]] moves it to fixed.
