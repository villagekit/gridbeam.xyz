# Stream 05 — Cleanup

Once the new website is live, cut ties with the legacy bits we no longer need. Point DNS at the new deployment.

## Goal

Old gridkit.nz Vercel deploy archived and redirecting (or the domain freed). DNS for gridbeam.xyz points at the new Cloudflare deployment.

## Tasks

| # | Task | Status |
|---|------|--------|
| 01 | [Retire `./node-modules` submodule](./01-retire-node-modules.md) | DONE — submodule unregistered when the repo switched to npm-only deps; `../node-modules` lives on as a dev-only sibling checkout for parity work. |
| 02 | [Archive old gridkit.nz deploy + redirect](./02-archive-old-site.md) | TODO |
| 03 | [DNS / domain — point gridbeam.xyz at new deployment](./03-dns-and-domain.md) | TODO |
| 04 | [Pre-launch real-browser QA pass](./04-pre-launch-qa.md) | SUPERSEDED by Stream 06 |

## Order of attack

04 (pre-launch QA) runs against a Cloudflare preview as soon as Stream 01 task 11 ships a deploy URL — fixes from this audit feed back into Stream 01 page tasks before launch.

03 (DNS) can happen any time after the new site is reachable on its preview URL and 04 (QA) is clean enough to ship.

01 (retire node-modules) is done. The site no longer depends on any code from `node-modules/`; the sibling checkout at `../node-modules/` stays around as legacy reference for parity work.

02 (archive old site) is a courtesy — gridkit.nz could stay up for archival, redirect to gridbeam.xyz, or be replaced with a "this site has moved" page.
