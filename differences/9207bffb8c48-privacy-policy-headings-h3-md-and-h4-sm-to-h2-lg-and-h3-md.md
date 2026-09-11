---
title: "Privacy policy headings: h3 md and h4 sm to h2 lg and h3 md"
status: regression
route: /legal/privacy-policy
axis: visual
kind: changed
---
## Legacy

`packages/applet-legal/src/mdx/privacy-policy.mdx` nine `###` and two `####` headings, mapped by `packages/ui-mdx/src/heading.tsx:18-24` to `size="md"` and `size="sm"`; no h2 anywhere in the body (`audit/legal__privacy-policy/dom/legacy.aria.yaml:36` `[level=3]`, `:61` `[level=4]`).

## Current

`app/legal/privacy-policy/page.tsx:49,73,148,186,208,218` `<Heading as="h2" size="lg">` and `:77,97,117,127,137` `<Heading as="h3" size="md">`: every section heading one size step larger (`audit/legal__privacy-policy/1280/{legacy,current}.png`).

## Verdict

## Log
