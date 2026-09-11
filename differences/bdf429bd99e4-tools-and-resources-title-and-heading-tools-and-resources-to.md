---
title: "Tools and resources title and heading: Tools and resources to Tools & resources"
status: open
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
