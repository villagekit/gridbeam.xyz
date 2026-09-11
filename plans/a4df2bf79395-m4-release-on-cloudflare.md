---
title: "M4: release on Cloudflare"
status: todo
parent: 1783931160f2
blocked_by: 5802bbc9d984
---

## Goal

gridbeam.xyz is live on Cloudflare Workers at its own domain, the old gridkit.nz deploy is archived, and the legacy checkouts are retired. Every step here changes a shared or production system, so each is a gate the operator moves.

## Scope

To be sliced when M3 closes: the Cloudflare deploy (Workers Builds connected, the CI build step dropped), DNS for gridbeam.xyz, archiving the Vercel deploy of gridkit.nz, retiring `../node-modules` as a reference, and the pre-launch pass (robots, sitemap, OG cards, 404s, the newsletter).

wants: Cloudflare and DNS credentials, the operator's.

## Seams under test

None pure.

## Exit demo

`curl -sI https://gridbeam.xyz` answers from Cloudflare with the site.

## Out of scope

Anything after launch.

## Outcome

## Log
