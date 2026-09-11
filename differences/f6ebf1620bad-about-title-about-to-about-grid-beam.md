---
title: "About title: About to About grid beam"
status: open
route: /about
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/about.tsx:12` `<NextSeo title="About" />`; rendered `<title>Grid Kit: About</title>` and `og:title` `Grid Kit: About` on the live site.

## Current

`app/about/page.tsx:23,28,31,35` `title = 'About grid beam'`; rendered `<title>About grid beam — gridbeam.xyz</title>`, `og:title` `About grid beam` (untemplated).

## Verdict

## Log

- 2026-09-12: The template is the shell item [[1c8b7461acb1]]; the route's `og:url` becomes `https://gridbeam.xyz/about` where legacy inherited the layout's `https://gridkit.nz` (rule 1 for the domain, [[f46533a8ae54]] for the override).
