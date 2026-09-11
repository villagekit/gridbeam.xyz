---
title: Web manifest, PNG favicons, mask icon and tile colour removed
status: regression
route: shell
axis: code
kind: removed
---
## Legacy

`apps/gridkit/pages/_app.tsx:77-81`: `favicon-32x32.png`, `favicon-16x16.png`, `site.webmanifest`, `mask-icon` `safari-pinned-tab.svg` (`color="#5bbad5"`), `msapplication-TileColor #da532c`; the files under `apps/gridkit/public/` (`site.webmanifest` has empty `name` and `short_name`, `theme_color #ffffff`, `start_url https://gridkit.nz`), plus `favicon.ico` and `browserconfig.xml` there, served by path.

## Current

Only `app/icon.svg` and `app/apple-icon.png`; no manifest, PNG favicons, mask icon or tile colour.

## Verdict

## Log
