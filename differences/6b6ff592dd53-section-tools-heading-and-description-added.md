---
title: Section Tools heading and description added
status: regression
route: /tools-and-resources
axis: copy
kind: added
---
## Legacy

No section heading: the cards sit directly in `CardsLayout`'s `Wrap` (`CardsLayout.tsx:23-27`).

## Current

`app/tools-and-resources/page.tsx:128-130` `<Title as="h2" description="Built into the site. Free, open-source, no signup.">Tools</Title>`.

## Verdict

## Log

- 2026-09-25: Regression (tools grilling R2). Removed; legacy has the heading and the cards, no body copy or section headings.
