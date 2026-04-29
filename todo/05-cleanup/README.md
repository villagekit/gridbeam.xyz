# Stream 05 — Cleanup

Once the new website is live, cut ties with the legacy bits we no longer need. Point DNS at the new deployment.

## Goal

`./node-modules` no longer required as a submodule of this repo. Old gridkit.nz Vercel deploy archived and redirecting (or the domain freed). DNS for gridbeam.xyz points at the new hosting.

## Tasks

| # | Task | Status |
|---|------|--------|
| 01 | [Retire `./node-modules` submodule](./01-retire-node-modules.md) | TODO |
| 02 | [Archive old gridkit.nz deploy + redirect](./02-archive-old-site.md) | TODO |
| 03 | [DNS / domain — point gridbeam.xyz at new deployment](./03-dns-and-domain.md) | TODO |

## Order of attack

03 (DNS) can happen any time after the new site is reachable on its preview URL.

01 (retire node-modules) only after every dependency on `node-modules/packages/*` and `node-modules/apps/*` has been removed from the website. That's only true once Streams 01, 02, 03, 04 are functionally done.

02 (archive old site) is a courtesy — gridkit.nz could stay up for archival, redirect to gridbeam.xyz, or be replaced with a "this site has moved" page.

## What "retired" means for `node-modules`

- The `gitmodules` entry for `node-modules` is removed.
- The `node-modules/` directory is removed from this repo (`git submodule deinit` + `git rm`).
- The legacy `villagekit/node-modules` GitHub repo stays around as an archive — not deleted (it still hosts villagekit.com and supplykit.com).
