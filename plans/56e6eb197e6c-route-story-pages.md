---
title: "Route: story pages"
status: todo
parent: 337e35d86920
blocked_by:
  - a78b167170b8
  - target: ca353de8b645
    strength: soft
    note: route order
---

## Goal

Every page of this record's route family is at parity with the legacy site: every difference on it is `fixed` or `sanctioned`, and the operator reviews it at the parity gate `f7a700a3e482`. Decision `ee86d68a`.

## Scope

The differences on the six story routes: `/stories/whats-a-grid-unit`, `/stories/how-to-cut-grid-beams`, `/stories/how-to-furniture-bolts`, `/stories/building-with-grid-kit`, `/stories/2021-winter-newsletter`, `/stories/2022-newsletter`, listed here by id when this record is sliced (`kipu list --collection difference --filter route=<route> --json` for each). The port rule of decision `ee86d68a` decides whether each slice re-ports from the legacy source or fixes in place.

## Seams under test

Named when sliced; none pure unless the route carries logic.

## Exit demo

`kipu list --collection difference --filter route=<route> --not-status sanctioned --not-status fixed --not-status dismissed` prints nothing for each of the six story routes, and `/finish-epic` finishes this record; the operator reviews the route at the parity gate `f7a700a3e482`.

## Out of scope

Other routes; the shell, except where a difference on this route is closed by a shell change, which then belongs to the shell record.

## Outcome

## Log

- 2026-09-26: From the split of the stories index record [[ca353de8b645]] (its Log, call 3): the catalog slice [[48c8cbdb206a]] re-ports app/_lib/stories.ts to legacy's stories.ts in structure (one allStories array, linkedStories inline, no wrapper or accessors) and leaves this record's three items where they are: the field names and date types on StoryMetadata, the six MDX exports and the four linked stories ([[82762f6b27de]], noted there), the originallyPublishedOn field ([[c983ec56248e]]) and the [slug] route's lookup, kept as STORY_SLUGS and getStory below legacy's exports with a comment naming [[9c48718ec6f8]]. This record's split removes that lookup with the route if it re-ports the six pages as page.mdx files, as that item's Log reads.
