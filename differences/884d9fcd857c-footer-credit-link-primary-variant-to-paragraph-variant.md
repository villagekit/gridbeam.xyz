---
title: "Footer credit link: primary variant to paragraph variant"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`packages/ui-brand/src/components/Footer.tsx:47`: `<Link href="https://villagekit.com" isExternal>` with the default variant; `@villagekit/ui@0.9.0 src/components/Link.tsx:37-38`: `primary: { color: 'accentA.600' }`, no underline. `audit/_root/1280/legacy.png`, footer.

## Current

`app/_components/SiteFooter.tsx:99-106`: `<Link href="https://villagekit.com" variant="paragraph" ...>`: `accentA.800`, underlined (`@villagekit/ui@1.2.0 src/components/Link.tsx`, `paragraph`). `audit/_root/1280/current.png`, footer.

## Verdict

## Log
