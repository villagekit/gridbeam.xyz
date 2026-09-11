---
title: "Wordmark: Grid Kit to Grid Beam"
status: sanctioned
route: shell
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/components/layouts/main.tsx:86`: `<NavLink as={NextLink} href="/" onClick={onHideMobileMenu} size="xl">Grid Kit</NavLink>`. Rendered `link "Grid Kit"` in `audit/_root/dom/legacy.aria.yaml`.

## Current

`app/_components/SiteBrand.tsx:24`: `<Heading as="span" size="xl" whiteSpace="nowrap">Grid Beam</Heading>`. Rendered `link "Grid Beam"` in `audit/_root/dom/current.aria.yaml`.

## Verdict

lock: header (the Grid Beam wordmark in Title Case; rule: rebrand names it too)

## Log
