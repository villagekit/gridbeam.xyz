---
title: gridbeam.xyz at parity and live
status: doing
tags:
  - epic
---

## Goal

gridbeam.xyz is live on Cloudflare at gridbeam.xyz, and every route matches the legacy gridkit.nz site on every axis the parity ledger tracks, except where a sanctioned deviation says otherwise (decision `2032533f`). The code is at least as good as the legacy author's (decision `ee86d68a`), the dependencies are current, and the operator has signed off route by route.

## Scope

The milestones, in order, each a child record of this epic:

1. **M1: the parity ledger.** The audit tooling extracts the DOM on both sides; the `parity` skill fills the `difference` collection for the shell and every route.
2. **Gate: the copy grilling.** The operator judges every `open` copy item and every addition.
3. **M2: parity, route by route.** One record per route, the shell first, each closed by the operator's review on `pnpm dev`.
4. **Gate: the operator declares parity.**
5. **M3: dependency upgrades.** After parity, before release.
6. **M4: release on Cloudflare.** Deploy, DNS, archive the old site, retire the legacy checkouts.

Decisions this epic runs under: `ee86d68a` (parity is the ledger), `2032533f` (sanctioned deviations), `077cef20` (agent roles), `bfa9a416` (legacy ground truth), `ca677697` (copy is the operator's), `ad5363e4` (editorial locks), `8b5e51fc` (suppliers map).

## Seams under test

Per milestone. The pure seams in this repo are the cutting planner, the URL codecs and the designs catalog logic; route work mostly has none.

## Exit demo

`kipu list --collection difference --json` reports no `open` or `regression` item on any route or on `shell`; `https://gridbeam.xyz` serves the site from Cloudflare; the operator has finished every route record.

## Out of scope

villagekit.com and supplykit.com; the Tauri studio app; Matomo and Sentry.

## Outcome

## Log
