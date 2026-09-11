---
title: "AboutText: TextProps spread to a children-only helper"
status: regression
route: /about
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/about.tsx:128-130` `function AboutText(props: TextProps)` spreading `{...props}` after its defaults.

## Current

`app/about/page.tsx:245-250` `function AboutText(props: { children: ReactNode })` with fixed props.

## Verdict

## Log

- 2026-09-12: The added `lineHeight` is the visual item.
