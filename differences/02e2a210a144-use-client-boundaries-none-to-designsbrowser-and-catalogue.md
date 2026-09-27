---
title: "'use client' boundaries: none to DesignsBrowser and Catalogue"
status: sanctioned
route: /designs
axis: code
kind: changed
---
## Legacy

The pages router has no server/client split: `apps/gridkit/pages/designs/index.tsx` and `components/catalogue/*` are one client bundle.

## Current

`app/designs/page.tsx` and `CatalogueStatic.tsx` are server components; `app/_components/design/DesignsBrowser.tsx:1` and `app/_components/catalogue/Catalogue.tsx:1` carry `'use client'`.

## Verdict

rule: upgrade (the app router requires the directive where hooks run)

## Log

- 2026-09-27: From the catalog re-port (plan 8417428fd88a): the Current is now app/designs/DesignsPage.tsx (the page's useMemo under 'use client', rendered by the server file app/designs/page.tsx) and the seven component files under app/_components/catalogue/, each under 'use client' since each calls a hook or renders a client Badge, plus app/_components/layouts/CatalogueLayout.tsx for its useBreakpointValue calls. The state stays sanctioned.
