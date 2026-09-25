---
title: Tools and resources heading description added
status: regression
route: /tools-and-resources
axis: copy
kind: added
---
## Legacy

`CardsLayout.tsx:21` `<Title>{title}</Title>` with no `description`.

## Current

`app/tools-and-resources/page.tsx:116` `description="Tools to plan a build, plus references for going deeper into the system."` (not the same string as the meta description).

## Verdict

## Log

- 2026-09-25: Regression (tools grilling R1). No description line under the heading, as legacy.
