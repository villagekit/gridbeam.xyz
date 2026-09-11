---
title: Route metadata replaces the layout's openGraph and twitter objects
status: regression
route: shell
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/_app.tsx:57-59,69-70`: `og:type website`, `og:site_name Grid Kit`, `og:locale en_NZ`, `twitter:card summary_large_image` render on every page (`https://gridkit-landing-villagekit.vercel.app/` `<head>`).

## Current

`app/layout.tsx:36-48` declares `type`, `siteName`, `locale` and `card`, but `app/page.tsx:50-58` (and `app/about/page.tsx:30-35`) export their own `openGraph` and `twitter` objects, which Next replaces rather than merges. `http://localhost:3000/` `<head>`: no `og:type`, `og:site_name` or `og:locale`, and `twitter:card` is `summary`.

## Verdict

## Log
