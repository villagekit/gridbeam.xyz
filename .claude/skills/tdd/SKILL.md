---
name: tdd
description: Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests.
---

# Test-Driven Development

TDD is the red → green loop. This skill is the reference that makes that loop produce tests worth keeping: what a good test is, where tests go, the anti-patterns, and the rules of the loop. Every section applies on every cycle: consult them before and during the loop, not after.

When exploring the codebase, read CLAUDE.md's glossary so test names and interface vocabulary match the project's domain language, and respect the recorded decisions in the area you're touching.

## What a good test is

Tests verify behavior through public interfaces, not implementation details. Code can change entirely; tests shouldn't. A good test reads like a specification: `packs the largest cut first` tells you exactly what capability exists, and it survives refactors because it doesn't care about internal structure.

See [tests.md](tests.md) for examples.

## Seams: where tests go

A **seam** is the public boundary you test at: the interface where you observe behavior without reaching inside. Tests live at seams, never against internals.

**Test only at pre-agreed seams.** Before writing any test, write down the seams under test and confirm them with the user, or take them from the plan that scoped the work. No test is written at an unconfirmed seam. You can't test everything, so agreeing the seams up front is how testing effort lands on the critical paths and complex logic instead of every edge case.

Ask: "What's the public interface, and which seams should we test?"

When the shape of that interface is itself in question (how deep the module is, where the seam belongs, what the interface should expose), read how the legacy author shaped the same interface in `../node-modules` first; that shape is the default.

## Pure logic and the browser boundary

TDD applies in full to pure, deterministic code: the cutting planner, the URL codecs, the designs catalog logic, the parts and beam calculations, sorting and filtering. Write the test first, always. The repo's CLAUDE.md names its highest-value targets.

Code that touches the DOM, the network, or the 3D canvas is exempt from red-first, but keep that boundary thin: extract every decision into a pure function that takes plain values and returns plain values, and test that. The boundary module then only moves bytes between the browser and the pure code. Where a local stand-in exists (a fixture object, a recorded response), test through it rather than against the real thing. Do not mock your own modules or internal collaborators: a test that mocks an internal part tests the mock.

## Anti-patterns

- **Implementation-coupled**: mocks internal collaborators, tests private functions, or verifies through a side channel (inspecting a module's private state instead of using the interface). The tell: the test breaks when you refactor but behavior hasn't changed.
- **Tautological**: the assertion recomputes the expected value the way the code does (`expect(add(a, b)).toBe(a + b)`, a snapshot derived by hand the same way, a constant asserted equal to itself), so it passes by construction and can never disagree with the code. Expected values must come from an independent source of truth: a known-good literal, a worked example, the spec.
- **Horizontal slicing**: writing all tests first, then all implementation. Bulk tests verify _imagined_ behavior: you test the _shape_ of things rather than user-facing behavior, the tests go insensitive to real changes, and you commit to test structure before understanding the implementation. Work in **vertical slices** instead: one test → one implementation → repeat, each test a **tracer bullet** that responds to what the last cycle taught you.
- **Unbounded waits**: a test that can hang forever on a channel, a lock, or a join is a flake waiting to happen. Every wait carries a timeout.

## Rules of the loop

- **Red before green.** Write the failing test first, watch it fail, then only enough code to pass it. Don't anticipate future tests or add speculative features.
- **One slice at a time.** One seam, one test, one minimal implementation per cycle.
- **Never change a test just to make it pass.** Find and fix the cause. If the test itself is wrong, say so and fix it knowingly.
- **Refactoring is not part of the loop.** It belongs to the review stage (see the `code-review` skill), not the red → green implementation cycle.
