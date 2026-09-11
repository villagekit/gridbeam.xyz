---
title: "M2: parity, route by route"
status: doing
parent: 1783931160f2
blocked_by: e2805adefd47
---

## Goal

Every route is at parity: no `difference` on it is `open` or `regression`, and the operator has reviewed it on `pnpm dev` against the legacy site. Decisions `ee86d68a`, `2032533f`, `ad5363e4`, `8b5e51fc`.

## Scope

One route record per child of this milestone, the shell first since every route inherits it, then the routes in the order the soft edges give: home, about, faq, stories index, story pages, designs index, design pages, cutting planner, tools and resources, contact, legal, suppliers (with the map), subscribe (with the Buttondown form). Each route record lists the differences it will close and is sliced with `/to-plan-slices` once the ledger and the copy verdicts exist; a session after the copy gate slices them all.

Work in `../ui` and `../gridkit` is its own slice under the route that needs it, and the site slice that consumes the publish carries "wants: publish".

## Seams under test

Per route record. Most have none pure.

## Exit demo

Every child record is `done`, each finished by the operator after reviewing the route on `pnpm dev`.

## Out of scope

Dependency upgrades (M3) and the release (M4).

## Outcome

## Log
