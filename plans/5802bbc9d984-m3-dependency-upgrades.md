---
title: "M3: dependency upgrades"
status: todo
parent: 1783931160f2
blocked_by: f7a700a3e482
---

## Goal

Every dependency is current (Next, React, Chakra, `motion`, `@villagekit/*`, the toolchain), with the ledger still clean: an upgrade that introduces a difference is a regression like any other. The operator wants this after parity and before release.

## Scope

To be planned when M2 closes: the upgrade order, the breaking changes each major brings, and a fresh `pnpm audit:pages` and `pnpm audit:dom` pass after each.

## Seams under test

The existing tests; the screenshot and DOM pairs as the regression check.

## Exit demo

`pnpm outdated` reports nothing the operator wants upgraded, `pnpm check` is green, and the ledger shows no new `open` or `regression` item.

## Out of scope

The release.

## Outcome

## Log
