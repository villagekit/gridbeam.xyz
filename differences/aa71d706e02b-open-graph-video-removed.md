---
title: Open Graph video removed
status: fixed
route: shell
axis: code
kind: removed
---
## Legacy

`apps/gridkit/pages/_app.tsx:61-66`: `videos: [{ url: 'https://res.cloudinary.com/villagekit/video/upload/c_limit,dpr_auto,f_auto,w_1280,q_40/v1/gridkit.nz/gridkit-coffee-table-website_bqmjpv', alt: 'Assembly of a coffee table made from Grid Kit' }]`.

## Current

No `openGraph.videos` anywhere in `app/`.

## Verdict

plan ffe8e5d5

## Log

- 2026-09-25: Plan ffe8e5d5 restored the video at legacy's URL (`v1/gridkit.nz/gridkit-coffee-table-website_bqmjpv`, the same id the home page's `LandingVideo` reads, no re-hosted copy exists). No verdict quotes the alt, so rule 1 was applied literally, as the shell record's split called it: legacy `Assembly of a coffee table made from Grid Kit`, shipped `Assembly of a coffee table made from grid beam`. The operator may re-judge the form at the gate.
