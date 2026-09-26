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

- 2026-09-26: Parity review of plan 4f6f086c: the live legacy site sends strict-transport-security and x-robots-tag noindex from Vercel, not from next.config; the release decides which platform headers Cloudflare sets, and the ledger has no item for them.

- 2026-09-26: From the Parity review of the fields slice (plan [[52adacea5b2f]]): the story pages' article:published_time and article:modified_time, and the sitemap's lastmod, are the build machine's local midnight as UTC (legacy's toISOString() on a Date built in the slash form), so a build on the operator's NZST machine serves the previous day where legacy's Vercel build served UTC midnight; filed as [[45fca45340c8]] (regression, code, /stories/whats-a-grid-unit). Closing it is a TZ=UTC pin where the Cloudflare build runs, or the operator's verdict; this milestone owns the build.
