---
title: "Footer credit text: tertiary variant to gray.700"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`packages/ui-brand/src/components/Footer.tsx:56,60`: `<Text variant="tertiary" fontSize="sm">` and `<Text variant="tertiary" fontSize="xs">`; `@villagekit/ui@0.9.0 src/components/Text.tsx:27-29`: `tertiary` is `gray.600`.

## Current

`app/_components/SiteFooter.tsx:93,108`: `<Text fontSize="sm" color="gray.700">` and `<Text fontSize="xs" color="gray.700">`.

## Verdict

## Log
