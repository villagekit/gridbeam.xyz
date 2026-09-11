---
title: "Privacy policy lists: four bulleted lists to prose"
status: regression
route: /legal/privacy-policy
axis: visual
kind: removed
---
## Legacy

`packages/applet-legal/src/mdx/privacy-policy.mdx:11-16,26-29,33-39,71-75` four Markdown lists (6, 4, 7 and 5 items) rendered as `ul`/`li` by the ui-mdx mapping (`audit/legal__privacy-policy/dom/legacy.aria.yaml:30-35` `listitem` nodes).

## Current

No list component in `app/legal/privacy-policy/page.tsx`; every enumeration is a sentence in a `<Text>` (`:52-59` for example). Zero `listitem` nodes in `audit/legal__privacy-policy/dom/current.aria.yaml`.

## Verdict

## Log

- 2026-09-12: The list content is inside the per-section copy items; this item is the device.
