---
title: "Select field bottom padding: Chakra v2's 1px removed"
status: upstream
route: shell
axis: visual
kind: removed
---
## Legacy

Chakra v2's select field base wrote `paddingBottom: "1px"` beside `lineHeight: normal` (the packed v2 theme at 3.3.1, `components/select.js:243`, under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/theme/dist/`), which the 0.9.0 `Select` wrapper kept: on the live site `/designs` at 375, either `role="menuitem"` select reads `padding: 0px 32px 1px 16px` (the Parity review's probe of plan ad2f5e52f9d8, `scratchpad/verify-probe.mjs`, `legacy.rest.padding`).

## Current

Chakra v3's native select field (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/native-select.js:16-37`) writes `lineHeight: normal` and no bottom padding, and the ui recipe's sizes (`../ui/src/components/Select.tsx` at `7ee04a9`, `selectSize`) write `ps` and `pe` alone: on `pnpm dev` under the `file:../ui` override, `/designs` at 375, the same selects read `padding: 0px 32px 0px 16px`, so the selected option's text sits about one pixel lower in the 40px field than legacy's (`audit/designs/375/{legacy,current}.png`). The same on the published `@villagekit/ui@1.2.0`.

## Verdict

## Log

- 2026-09-27: Filed by the Parity review of the ui Select slice [[ad2f5e52f9d8]], which found it beside the background it fixed; not from that change (the readings hold before and after it). Not judged. The mechanism is the package's select recipe, so a fix is a ui slice beside the shell record; handed to [[6bc0d3ba08dc]].

- 2026-09-27: Fixed in ../ui at commit e3acb25 (plan [[6bc0d3ba08dc]]): the native select recipe's field writes pb 1px; on /designs at 375 under the file:../ui override both menuitem selects read padding 0px 32px 1px 16px, legacy's reading. Waits on the operator's publish; the bump plan [[99f2fe62c62f]] moves it to fixed.
