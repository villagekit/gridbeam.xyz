---
title: Footer reorganized into four intent-based sections
status: accepted
date: 2026-09-13
---

## Context

Legacy grouped footer links by internal taxonomy: `Our company` (About us, Roadmap, Community, Newsletter, Contact us), `Our product` (About, FAQ, Tools and resources), `Our policies` (Policies and terms, Return Policy, Cookie Policy, Privacy Policy). The copy grilling (`e2805adefd47`) judged this grouping itself, not just the individual link changes inside it: grouping by what department owns a page isn't grouping by what a visitor came to do.

## Decision

Four sections, grouped by visitor intent:

- **Explore**: Designs, Stories, Tools, Suppliers — things to browse or use.
- **About**: About, FAQ — things to read to understand the project.
- **Connect**: Contact, Subscribe — ways to reach out (see `ac6579ec16d2` for Subscribe's own standalone treatment here).
- **Legal**: Privacy policy, Site licence.

GitHub is dropped from the footer's link sections entirely: it's already a social icon in the row below, and listing it twice is clutter with no payoff once the grouping is by intent rather than "every link we have". Community forum stays icon-only for the same reason. Roadmap and the villagekit.com "About us" link drop as dead startup/external links no rule needs to keep.

## Consequences

Sanctions, all rule 5, this decision: `059dc1c5a158`, `73e4bb754af5`, `85abcfd7dc9a`, `710a60c7af9a`, `ae95c98ec0be`, `b621ed63954e` (the section headings), `2c41c30b60e9`, `f89a7afcfc87`, `3ddd17f65238` (removed links), `35dcba0e3dad`, `703c2d78a721`, `c1acdbe0835a`, `96cdda1c67d3` (added/relocated links), `4e8bd08861fa`, `cfc422822736` (label tweaks). `3622c8f99a57` (GitHub added to the sections) is dismissed instead of sanctioned: this decision explicitly excludes it.
