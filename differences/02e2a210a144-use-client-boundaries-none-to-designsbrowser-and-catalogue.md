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
