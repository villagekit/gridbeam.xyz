---
title: "Preset select chevron: none to a nameless img"
status: regression
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
