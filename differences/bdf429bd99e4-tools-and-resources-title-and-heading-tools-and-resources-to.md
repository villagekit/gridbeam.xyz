---
title: "Tools and resources title and heading: Tools and resources to Tools & resources"
status: regression
route: /tools-and-resources
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/tools-and-resources.tsx:25` `<CardsLayout title="Tools and resources">`: one string for `NextSeo` and `Title` (`CardsLayout.tsx:19,21`); rendered `<title>Grid Kit: Tools and resources</title>` and `heading "Tools and resources" [level=1]` (`audit/tools-and-resources/dom/legacy.aria.yaml:22`).

## Current

`app/tools-and-resources/page.tsx:25,30-37,117` `const title = 'Tools & resources'` in `metadata` and `<Title ...>Tools &amp; resources</Title>`; rendered `<title>Tools &amp; resources — gridbeam.xyz</title>` and `heading "Tools & resources" [level=1]` (`current.aria.yaml:23`).

## Verdict

## Log

- 2026-09-25: Regression (tools grilling R1). Ships as "Tools and resources" for the title and the heading, as legacy.
