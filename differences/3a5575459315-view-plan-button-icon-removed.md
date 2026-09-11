---
title: View plan button icon removed
status: regression
route: /designs/bed-frame
axis: visual
kind: removed
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx:111` `leftIcon: <Icon as={FaList} />` (`audit/designs__bed-frame/1280/legacy.png`).

## Current

`app/_components/design/DesignViewer.tsx:66-70` no `icon` on the action (`audit/designs__bed-frame/1280/current.png`).

## Verdict

## Log

- 2026-09-12: Template.
