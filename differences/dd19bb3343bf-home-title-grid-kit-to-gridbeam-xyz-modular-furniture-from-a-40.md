---
title: "Home title: Grid Kit to gridbeam.xyz, modular furniture from a 40 mm grid"
status: open
route: /
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:75` `<NextSeo title="Grid Kit" titleTemplate="%s" openGraph={{ title: 'Grid Kit' }} />`; rendered `<title>Grid Kit</title>` and `og:title` `Grid Kit` on `https://gridkit-landing-villagekit.vercel.app/`.

## Current

`app/page.tsx:43,49,53,57` `heroTitle = 'gridbeam.xyz — modular furniture from a 40 mm grid'` as `title: { absolute: heroTitle }`, `openGraph.title` and `twitter.title`; rendered `<title>gridbeam.xyz — modular furniture from a 40 mm grid</title>` on `http://localhost:3000/`.

## Verdict

## Log

- 2026-09-12: Copy: rule 1 names the domain, not the tagline. The route's `og:url` moves from `https://gridkit.nz` (the layout default) to `https://gridbeam.xyz` (rule 1); the per-route override mechanism is the shell item [[f46533a8ae54]].
