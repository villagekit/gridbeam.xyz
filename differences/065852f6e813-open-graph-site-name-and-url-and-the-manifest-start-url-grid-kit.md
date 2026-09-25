---
title: "Open Graph site name and URL and the manifest start_url: Grid Kit and gridkit.nz to Grid Beam and gridbeam.xyz"
status: open
route: shell
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/_app.tsx:58-59`: `site_name: 'Grid Kit'`, `url: 'https://gridkit.nz'` (live: `og:site_name` `Grid Kit`, `og:url` `https://gridkit.nz` on every route); `apps/gridkit/public/site.webmanifest`: `"start_url": "https://gridkit.nz"`.

## Current

`app/_lib/open-graph.ts`: `siteName: 'Grid Beam'`, `url: 'https://gridbeam.xyz'`, rendered on every route; `public/site.webmanifest`: `"start_url": "https://gridbeam.xyz"`, otherwise byte-identical.

## Verdict

## Log

- 2026-09-25: Filed by plan ffe8e5d5 at its Parity review, which shipped these three values as the plan named them under rule 1 (rebrand). An agent does not sanction its own deviation, so the item waits for the operator.
