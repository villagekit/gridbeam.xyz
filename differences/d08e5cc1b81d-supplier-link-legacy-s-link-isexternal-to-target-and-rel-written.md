---
title: "Supplier link: legacy's Link isExternal to target and rel written on the anchor"
status: upstream
route: /suppliers
axis: code
kind: changed
---
## Legacy

No legacy counterpart to `/suppliers` exists ([[df7c8f7b0a80]], sanctioned under decision `8b5e51fc`). Site-wide, legacy wrote every external link as `<Link href=... isExternal>` (`../node-modules/apps/gridkit/pages/index.tsx:270,347` at `fce357d`), and Chakra v2's `Link` (`@chakra-ui/layout@2.3.1`, `chunk-K7XRJ7NL.mjs:19`) rendered `isExternal` as `target="_blank" rel="noopener"`.

## Current

`app/suppliers/page.tsx:40` (the `SupplierCard` name link) writes `target="_blank" rel="noopener noreferrer"` on the anchor directly, since the published `@villagekit/ui` 1.2.0 `Link` (`node_modules/@villagekit/ui/dist/components/Link.d.ts`) takes no `isExternal`, where the sibling's does again (ui commit `540e9c3`, `../ui/src/components/Link.tsx:8-25`), the same shape as the home's [[58252b32e362]].

## Verdict

## Log

- 2026-09-28: Filed and moved to upstream: fixed in `../ui` (commit `540e9c3`, `../ui/src/components/Link.tsx:8-25`), the sibling's `Link` takes `isExternal` again. Waiting on the operator's publish; the bump plan `99f2fe62c62f` rewrites `app/suppliers/page.tsx:40` as `Link isExternal` and moves this to fixed.
