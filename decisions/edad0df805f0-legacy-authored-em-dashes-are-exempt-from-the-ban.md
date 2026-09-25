---
title: Legacy-authored em dashes are exempt from the ban
status: accepted
date: 2026-09-25
---
## Context

[[64ee4dfa393d]] bans the em dash in visitor-facing copy. The home-route grilling (`e2805adefd47`, Q9) found one in a legacy sentence being restored verbatim: "Imagine, build, and rebuild — Grid Kit evolves with your life." The ban exists because generated copy leans on the dash; the legacy author's use of it predates that.

## Decision

An em dash the legacy site's own copy already had is kept when that copy is restored. The ban in [[64ee4dfa393d]] covers copy written for this port: new sentences, rewrites and generated strings.

## Consequences

A verdict restoring legacy copy quotes it with its dash. A verdict for new or rewritten copy still never carries one. The two decisions are read together.
