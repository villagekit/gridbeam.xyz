---
title: Media assets published from media/gridbeam.xyz
status: accepted
date: 2026-09-12
---
## Context

Carried forward from CLAUDE.md ("Repo shape", the `villagekit/media` row), where the operator recorded the media layout, so the ledger can cite a decision for it (the sanctioned-deviations decision, rule 5, names a decision or a verdict as the record).

## Decision

Source images for this site live in the `villagekit/media` repo under `media/gridbeam.xyz/...` and are published to Cloudinary (cloud `villagekit`) by `pnpm sync-media` from that repo, so their public IDs carry the `gridbeam.xyz/` prefix. The legacy `v1/gridkit.nz/...` IDs stay valid and may be referenced until an asset is re-hosted; a re-hosted asset must be the same picture unless a difference records the change.

## Consequences

Differences that are only a public ID moving from `v1/gridkit.nz/...` to `gridbeam.xyz/...` for the same picture cite this decision under rule 5. A picture that changes is a visual difference in its own right.
