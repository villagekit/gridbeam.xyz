---
title: Content-Security-Policy absent on the files the Cloudflare ASSETS binding serves
status: open
route: shell
axis: code
kind: removed
---
## Legacy

`apps/gridkit/next.config.mjs:53`: `headers()` on `source: '/(.*)'`, and Vercel applies it to every response: `curl -sI https://gridkit-landing-villagekit.vercel.app/favicon-32x32.png`, `/site.webmanifest`, `/robots.txt` and `/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js` each return 200 with `content-security-policy: default-src *;    script-src 'self' 'unsafe-eval' 'unsafe-inline' https: data: blob:;    style-src 'self' 'unsafe-inline';`.

## Current

`next.config.ts` carries the same `headers()` on `/(.*)`, and `@opennextjs/aws@4.0.2` applies it inside the Worker (`dist/core/routingHandler.js`, `getNextConfigHeaders`). On `pnpm preview` (`wrangler.jsonc`, `assets.directory: .open-next/assets`, no `run_worker_first`) the files under `public/` and `/_next/static/` are served by the ASSETS binding ahead of the Worker and carry no header: `/favicon-32x32.png`, `/site.webmanifest`, `/browserconfig.xml` and `/_next/static/chunks/32eea753489d93bb.js` return 200 with no `content-security-policy`. The routes the Worker renders carry it: `/`, `/designs/shelf-tower`, `/icon.svg`, `/robots.txt`, `/sitemap.xml` and the 404. Hosting decision `91cbeac8`; `wrangler.jsonc` could set `run_worker_first` for those paths, at the cost of a Worker invocation per static file.

## Verdict

## Log
