---
name: parity
description: Build or refresh the parity ledger for one or more routes - every difference between the legacy gridkit.nz site and this one, on five axes, as `difference` items judged by the sanctioned-deviation rules. Sonnet sub-agents do the mechanical diffing; you mint and judge. Use when a plan asks for a route's ledger, or when a review finds a route whose ledger is stale.
argument-hint: "<route ...> | shell"
---

# Parity

The ledger is the definition of parity: a route is at parity when no
`difference` on it is `open` or `regression`. This skill fills the ledger for
the routes it is given. It records; it never fixes.

## Inputs

- The routes, as paths (`/`, `/stories/whats-a-grid-unit`), or `shell` for
  the header, footer, nav, theme tokens and page layouts every route shares,
  whose files on both sides decision `bfa9a416` (legacy ground truth) names. The
  shell is filed first: every route's parity run consumes it.
- The two sides. Legacy: the live site `https://gridkit-landing-villagekit.vercel.app`
  and the source `../node-modules` at `fce357d` (the deploy was built from a
  commit with no differences under `apps/gridkit` or `packages/`). Current:
  `pnpm dev` on `http://localhost:3000` and this repo.
- The rules: the decision that records the sanctioned deviations, by path
  (`decisions/`, "sanctioned deviations"), and the decision that records
  the operator's editorial locks.

## Process

1. **Capture.** Write the routes to a file, start `pnpm dev` in the
   background, and run `pnpm audit:pages --routes <file>` for the screenshot
   pairs at 375, 768 and 1280 under `audit/<slug>/<width>/`. Run the DOM
   extraction the same way (`pnpm audit:dom --routes <file>`, once M1 ships
   it) for the visible text, the heading outline, the landmarks, the links,
   the images with their alt text, and the interactive elements with their
   ARIA, on both sides.
2. **Fan out.** One Sonnet sub-agent per route per family, started cold with
   the paths it needs and the brief below. Families:
   - **copy**: an exact diff of the visible text on both sides, in document
     order, including titles, meta descriptions, alt text, button labels,
     placeholders and empty states. Every changed, added or removed string
     is one difference, quoted verbatim on both sides.
   - **visual and interaction**: the screenshot pairs at all three widths,
     read with the Read tool, plus both sources: layout, spacing, type
     hierarchy, color, imagery, breakpoints; hover, focus, transitions,
     autoplay, menus, forms, URL state. Things the screenshots cannot show
     are read from the code, and the entry says so.
   - **accessibility**: landmarks, heading order, alt text, labels, ARIA,
     focus management, from the DOM extraction and the code.
   - **code**: the component tree and the module structure on both sides:
     which components exist, what they are named, where the logic lives,
     which library does what. A pattern the legacy author used that the
     current code replaced is a difference; a helper the current code
     invented is a difference.
   The brief: "Report every difference you find as a list. Each entry has a
   one-line title, the axis, the legacy side cited (file:line at fce357d, or
   a screenshot path, or a URL), the current side cited the same way, and
   verbatim quotes where text is involved. Report additions (present in
   current, absent in legacy) and removals as differences too. Do not judge,
   do not recommend, do not summarize: the list is the deliverable. Say what
   you compared and found identical."
3. **Judge.** Read every list. Dedupe across families. Collapse a family the
   rules cover into one item per route per rule (every `Grid Kit` to
   `grid beam` swap on a route is one item). Then mint each remaining
   difference with `kipu new difference --title <text> --set route=<route>
   --set axis=<axis> --set kind=<changed|added|removed>` and fill its Legacy
   and Current sections from the citations. A route or family the sub-agents
   found identical gets no item; the note in step 4 says so. Judge it:
   - a rule covers it: `kipu sanction <id> --outcome "rule: <name>"`;
   - an editorial lock covers it: `kipu sanction <id> --outcome "lock: <which>"`;
   - it is copy and no rule covers it: leave it `open`; the operator judges
     copy;
   - no rule and no lock covers it, and it is neither copy nor `added`:
     `kipu move <id> regression`. The judgement is the rule's absence
     (decision `2032533f`: everything else is a regression by default), never
     the worker's taste about which side looks better;
   - it is a diff artifact or a duplicate: `kipu dismiss <id> --outcome <why>`.
   An `added` item with no rule and no lock is `open` too; the operator
   decides whether an invention stays. Copy on an `added` route (`/suppliers`)
   is one `open` item per visible text block: a heading, a paragraph, a
   label, an empty state.
4. **Record.** `kipu note` on the record the running plan belongs to (its
   `parent`) with the counts per state, axis and kind, and what the
   sub-agents found identical. Commit per the `implement` skill.

## Rules of the ledger

- One difference, one item, one axis, one route. A shell difference is
  filed on `shell`, never repeated per route.
- Cite, never paraphrase. Copy is quoted verbatim on both sides.
- Never fix while filing. A worker that notices a one-line fix files the
  difference and moves on; the plan that closes it cites it.
- The operator judges copy and additions. The rules judge the rest, and a
  rule is cited by name in the verdict so a wrong sanction can be found.
