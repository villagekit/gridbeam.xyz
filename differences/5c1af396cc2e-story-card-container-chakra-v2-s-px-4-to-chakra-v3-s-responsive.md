---
title: "Container padding: Chakra v2's px 4 to Chakra v3's responsive px 4/6/8 and position relative, seen on the story card"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/stories/item.tsx:39-40` `<Container maxW="md">` around each card's content, Chakra v2's container (`@chakra-ui/theme@3.3.1` `components/container.js`: `px: 4`, not positioned). Measured on the live legacy site, `/` and `/stories` at 1280: the container 448px wide with 16px padding on each side, the cover image 416px wide; at 375 on `/stories`, 343px wide with 16px padding.

## Current

`app/_components/stories/Item.tsx:43` the same `<Container maxW="md">` from `@villagekit/ui@1.2.0`, Chakra v3's re-export with no recipe override in the ui provider (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/container.js`: `px: { base: 4, md: 6, lg: 8 }`, `position: relative`). Measured on `pnpm dev` at 1280: 32px padding on each side, so the cover is 64px narrower than its column (272px in a 336px column on `/`, 328px in 392px on `/stories`, `audit/stories/1280/current.png` against `legacy.png`); at 768, 24px; at 375, 16px, as legacy. The `position: relative` moves the LinkOverlay's click area from the LinkBox to the container; the two are the same width on both routes, so nothing is lost by it. The site's line is legacy's, so the fix is the ui's: a container recipe in the ui theme with Chakra v2's defaults, the way the footer's Container was restored (`da830eb83c42`), which a ui slice the operator mints makes.

## Verdict

## Log

- 2026-09-26: Filed by the story card slice (plan [[e332105c3b52]]), introduced by its re-port onto legacy's bare Container: the card it replaced set no per-card cap (7bb1c0ef2970). The stories ledger cites it.

- 2026-09-26: Refiled from / to shell at the Spec review of plan [[e332105c3b52]]: the fix is a container recipe in the ui theme, which changes every bare Container on the site, so a shell change closes it; the story card is where it was measured.

- 2026-09-26: At the home record's finish (plan [[fd9a92bd8abd]]): the fix in ../ui is the slice [[2bd0169a6dda]], minted beside the shell record (decision 40abdb2f222a, worker:fable, blocking the bump plan [[99f2fe62c62f]]); the slice moves this item to upstream with the sibling commit (decision 28c1a536).

- 2026-09-26: Fixed in ../ui at commit 6603102 (plan [[2bd0169a6dda]]): a container recipe with Chakra v2's base (w 100%, mx auto, maxWidth prose, px 4, position static) registered under recipes.container, so every Container in the package and on the site takes it; the ui Footer's social row container is bare again, the recipe rendering what its explicit maxW prose and px 4 did (the fix of [[da830eb83c42]]). On pnpm dev under the override at 1280, every Container on /, /stories, /suppliers and /faq pads 16px and reads position static, each maxW prop unchanged (1152, 1024, 896, 768, 672, 448), and the site footer's bare Container is 600px wide, the live legacy site's reading; the story card's Container pads 16px at 1280 and 375, its cover 376px wide at 1280 in the stories index's 408px column ([[1d5c23180ebf]]) where legacy's is 416px in 448px. Waits on the publish; the bump plan [[99f2fe62c62f]] moves it to fixed.
