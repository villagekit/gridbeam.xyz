---
title: "Select chevron: aria-hidden and focusable false to a nameless img by Chakra v3's NativeSelect.Indicator"
status: upstream
route: shell
axis: accessibility
kind: removed
---
## Legacy

Chakra v2's `Select` icon rendered its svg with `role="presentation"`, `focusable="false"` and `aria-hidden="true"` (`@chakra-ui/select@2.1.2`'s `SelectIcon`, `select/dist/chunk-3RSXBRAN.mjs:121-124`, through `@chakra-ui/icon`'s `Icon`, in the packed copy under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`), so the chevron is not in the accessibility tree: on the live site `/designs` at 375, either `role="menuitem"` select's chevron svg reads `aria-hidden="true" focusable="false"` (the Parity review's probe of plan ad2f5e52f9d8, `scratchpad/verify-probe.mjs`, `legacy.indicator.ariaHidden`).

## Current

Chakra v3's `NativeSelect.Indicator` (`node_modules/@chakra-ui/react/dist/esm/components/native-select/native-select.js:56-72`) renders `ChevronDownIcon` (`components/icons.js`) with no `aria-hidden` and no `focusable`, and the ui package (`../ui/src/components/Select.tsx` at `7ee04a9`) re-exports it bare: on `pnpm dev` under the `file:../ui` override, `/designs` at 375, the chevron svg carries neither attribute (`verify-probe.mjs`, `current.indicator.ariaHidden` null), so it is exposed as a nameless image. The same on the published `@villagekit/ui@1.2.0`. The same select on `/tools/cutting-planner` ([[c6792d6e6ec8]]) and the preset select on `/designs/bed-frame` ([[e60c22672fb2]]) are recorded on their routes; this item is the shell mechanism behind them.

## Verdict

## Log

- 2026-09-27: Filed by the Parity review of the ui Select slice [[ad2f5e52f9d8]], which found it beside the background it fixed; not from that change (the readings hold before and after it). Not judged. The mechanism is the package's bare NativeSelect.Indicator, so a fix is a ui slice beside the shell record; handed to [[6bc0d3ba08dc]].

- 2026-09-27: Fixed in ../ui at commit e3acb25 (plan [[6bc0d3ba08dc]]): the default chevron svg carries role presentation, focusable false and aria-hidden true, v2's SelectIcon attributes; on /designs at 375 under the file:../ui override both chevrons read the three attributes and the aria snapshot shows no img under either select, legacy's readings. The planner's [[c6792d6e6ec8]] and the design page's [[e60c22672fb2]] take the same fix and are parked upstream with it. Waits on the operator's publish; the bump plan [[99f2fe62c62f]] moves it to fixed.
