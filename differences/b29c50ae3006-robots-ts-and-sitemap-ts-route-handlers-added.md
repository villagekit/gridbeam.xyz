---
title: robots.ts and sitemap.ts route handlers added
status: open
route: shell
axis: code
kind: added
---
## Legacy

`apps/gridkit/package.json:7,12`: `build:robots-txt` copies `content/robots.prod.txt` (`User-agent: *` / `Disallow:`) to `public/robots.txt`; no sitemap.

## Current

`app/robots.ts:1-19` and `app/sitemap.ts:1-60` (`MetadataRoute` exports).

## Verdict

## Log
