# differences: the parity ledger

The `difference` collection, declared in [.kipu/collections/difference.toml](../.kipu/collections/difference.toml):
one item per difference between the legacy gridkit.nz site and this one,
on one `route` (a path, or `shell` for what every route shares) and one
`axis` (visual, interaction, accessibility, copy, code), with a `kind`:
`changed`, `added` (present here, absent in legacy) or `removed`.

States: `open` (found, not yet judged), `regression` (worse than legacy; a
plan closes it), `sanctioned` (acceptable; the Verdict names the rule or
the operator's call), `fixed` (the Verdict names the plan), `dismissed`
(not a real difference; the Verdict says why).

The ledger is the definition of parity. A route is at parity when no item
on it is `open` or `regression`; the site is at parity when that holds for
every route and for `shell`. "Unexpected differences" are, by
construction, the items that do not exist yet: the `parity` skill files
them, and the code review's Parity axis looks for the ones it missed.

The `parity` skill fills the ledger. The `implement` skill closes items
with `kipu fix <id> --outcome "plan <prefix>"`. The operator judges every
`open` copy item and every `added` item, in a grilling. A route the diff
finds identical gets no item; the parity run's note on the record that
commissioned it says so. Nobody edits a
Verdict; a wrong one is superseded by a note on the item and a new state.

To see the state of a route, and what is left on it:

```
kipu list --collection difference --filter route=/about --json
kipu list --collection difference --filter route=/about --not-status sanctioned --not-status fixed --not-status dismissed
```
