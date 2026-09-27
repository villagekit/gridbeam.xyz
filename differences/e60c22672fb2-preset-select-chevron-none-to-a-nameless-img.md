---
title: "Preset select chevron: none to a nameless img"
status: upstream
route: /designs/bed-frame
axis: accessibility
kind: changed
---
## Legacy

`gridkit@v0.9.0 core/parameters/src/presets/index.tsx:70-78` a bare `<Select role="menuitem">` (`legacy.aria.yaml`: no img in the Preset group).

## Current

`@villagekit/parameters@0.10.0 src/presets/index.tsx:69-81` `Select.Root` with `Select.Indicator`, whose `ChevronDownIcon` has no `aria-hidden` (the run's first `audit/designs__bed-frame/dom/current.aria.yaml` capture and a `main` aria snapshot on `http://localhost:3000/designs/bed-frame`, plan cf52c388: a bare `img` after the select; a networkidle capture can catch the page before the controls mount, see the log on [[9d4e2e43543e]]); the same on the `Choice` controls (`values/choice.tsx:43-50`).

## Verdict

## Log

- 2026-09-12: Template. The planner's ui-wrapper instance is [[c6792d6e6ec8]]; this one is the parameters package's own select.

- 2026-09-27: Fixed in ../ui at commit e3acb25 (plan [[6bc0d3ba08dc]], the shell mechanism [[908deff18dff]]): @villagekit/parameters imports Select from @villagekit/ui (dist/presets/index.js:2), so under the file:../ui override, which pnpm applies to the engine's copy too, the preset and Choice selects on /designs/bed-frame at 375 and 1280 read the chevron with aria-hidden true, focusable false and role presentation and no img in the aria snapshot (scratchpad chevron-after.json, choice-probe.json). Moved to upstream by the Parity review's call. It closes at the bump only if the published engine resolves the published ui: parameters 0.10.0 declares @villagekit/ui ^1.1.1, so a major ui publish needs the engine republished against it, the bump plan [[99f2fe62c62f]]'s to check.
