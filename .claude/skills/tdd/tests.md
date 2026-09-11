# Good and Bad Tests

## Good tests

**Integration-style**: test through real interfaces, not mocks of internal parts.

```ts
// GOOD: tests observable behavior through the planner's interface
test('a cut longer than every stock beam is reported infeasible', () => {
  const plan = firstFitDecreasing({ requiredBeams: [{ size: 80, count: 1 }], stockBeams: [{ size: 60, count: 4 }], unlimitedStock: false })
  expect(plan.infeasibleBeams).toEqual([{ size: 80 }])
})
```

Characteristics:

- Tests behavior callers care about
- Uses the public API only
- Survives internal refactors
- Describes WHAT, not HOW
- One logical assertion per test

## Bad tests

**Implementation-detail tests**: coupled to internal structure.

```ts
// BAD: reaches past the interface into the planner's working state
test('firstFitDecreasing sorts the required beams', () => {
  const state = createPlannerState(requiredBeams)
  sortRequired(state)
  expect(state.sorted[0].size).toBe(80)
})
```

Red flags:

- Mocking internal collaborators
- Testing private functions
- Asserting on call counts or call order
- Test breaks when refactoring without behavior change
- Test name describes HOW not WHAT
- Verifying through a side channel instead of the interface

```ts
// BAD: bypasses the interface to verify
test('decodeQuotas fills the row list', () => {
  const codec = new QuotaCodec()
  codec.decode('4x30')
  expect(codec.rows.length).toBe(1)
})

// GOOD: verifies through the interface, against the documented outcome
test('a row above the cap is dropped and the rest decode', () => {
  const decoded = decodeQuotas(Array(MAX_ROWS + 1).fill("4x30").join(","))
  expect(decoded?.quotas).toHaveLength(MAX_ROWS)
})
```

**Tautological tests**: the expected value restates the implementation, so the test passes by construction.

```ts
// BAD: the expected value is recomputed the way the code computes it
test('getRequiredBeamsFromParts counts every part', () => {
  expect(getRequiredBeamsFromParts(parts).length).toBe(parts.filter(isBeam).length)
})

// GOOD: the expected value is an independent literal, hand-traced from the legacy suite
test('returns the expected output beams when some are infeasible', () => {
  expect(firstFitDecreasing(legacyCaseFour).cutBeams).toEqual(legacyCaseFourOutput)
})
```
