---
title: Join the community button opens in a new tab
status: regression
route: /
axis: interaction
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:354-357` `<LinkButton variant="secondary" href="https://discuss.villagekit.com" ...>` with no `isExternal`, same tab; the inline link at `:270` does pass `isExternal`.

## Current

`app/page.tsx:332-339` `isExternal`, which `node_modules/@villagekit/ui/src/components/LinkButton.tsx:23-33` renders as `target="_blank" rel="noopener noreferrer"`. From code.

## Verdict

## Log
