---
title: "Filter options: Badge role option with Enter-only keys to native toggle buttons"
status: regression
route: /stories
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/pages/stories.tsx:25-26` `<Box id="stories-menu" role="menubar" aria-owns="stories-menu-filters" />`; `apps/gridkit/components/stories/filters.tsx:20-24` `<HStack id="stories-menu-filters" role="listbox">`; `apps/gridkit/components/option.tsx:20-27,31-35` a `Badge` with `role="option" tabIndex={0}`, `onKeyDown` handling Enter only, no `aria-selected`; `audit/stories/dom/legacy.aria.yaml:24-29` `menubar > listbox > option` x4, each a tab stop.

## Current

`app/stories/StoriesBrowser.tsx:57-62,95-131` an `HStack` with no role holding `<chakra.button type="button" aria-pressed={selected}>` x4; `audit/stories/dom/current.aria.yaml:25-28`.

## Verdict

## Log

- 2026-09-12: The legacy nesting (a listbox inside a menubar via aria-owns) is invalid ARIA and exposes no selected state; a fix plan should ask the operator (rule 5) before restoring it.
