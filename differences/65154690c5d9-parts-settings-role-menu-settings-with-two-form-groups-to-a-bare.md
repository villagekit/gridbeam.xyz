---
title: "Parts settings: role menu Settings with two form groups to a bare HStack"
status: regression
route: /designs/bed-frame
axis: accessibility
kind: removed
---
## Legacy

`apps/gridkit/components/design/parts-breakdown.tsx:14-37` `<VStack role="menu" aria-labelledby="design-parts-breakdown-settings">` with the `Settings` label and two `FormControl` groups (Parts tab snapshot: `menu "Settings"` > `group`, `group`).

## Current

`app/_components/design/PartsBreakdown.tsx:20-23` `<HStack gap="6">` with no role, label or groups (snapshot: the toggles sit directly in `tabpanel "Parts"`).

## Verdict

## Log

- 2026-09-12: Template.
