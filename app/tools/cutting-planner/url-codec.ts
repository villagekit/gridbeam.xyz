// Share-link codec for the cutting planner: `?r=` required beams, `?s=` stock beams,
// `?u=` top-up stock length, `?d=` display unit. Quotas encode as `size-count` pairs
// joined by `~`, e.g. `?r=10-8~15-4`.
//
// Kept apart from the component so the decode — the only part of the planner that reads
// untrusted input — can be exercised without a DOM.

import type { DisplayUnit } from '@/app/_components/cutting-plan/CutBeamSvg'

import type { BeamQuota, UnlimitedStock } from './algorithm'

// Bounds shared by the number inputs and the URL decode, so the two can't disagree about what
// a plan may contain. Legacy's were size 2–60, count 1–50
// (packages/applet-cutting-planner/src/components/beam-row.tsx).
//
// Size is bounded only by what the packing can model, at either end — legacy's 2–60 window was
// safe for legacy, which had no design pages linking in. Ours do, and they emit beams outside it:
//   - `sign-board` at full size wants an 80 gu cut, and its own page says "too long for the 60 gu
//     stock, open the cutting planner to use longer stock". A ceiling makes that instruction
//     impossible to follow, and since the number input clamps on blur, merely tabbing through an
//     80 gu row would rewrite it to 60 and produce a confident, wrong plan.
//   - `utility-workbench` emits a 1 gu beam at some parameters, which a floor of 2 silently drops.
// Neither bound bought any safety: cost scales with the number of beams, not their length. What
// does need a floor is the pack itself — a cut of 0 or less always "fits", so it is meaningless
// as a cut. (A 0 gu beam is reachable from `utility-workbench`; that's an upstream bug, see
// todo/07-code-review/20-utility-workbench-degenerate-beams.md.)
export const MIN_SIZE = 1
export const MIN_COUNT = 1
export const MAX_COUNT = 50
// Row cap for the table and the URL decode alike. Legacy needed none — it had no URL state and
// no share link to round-trip. 60 rows is an order of magnitude past any real plan (the largest
// design in ./products needs 7) and bounds a decoded plan at MAX_ROWS × MAX_COUNT = 3000 beams.
export const MAX_ROWS = 60

// Legacy's opening example, kept so a returning user sees what they remember.
const DEFAULT_REQUIRED: Array<BeamQuota> = [
  { count: 8, size: 10 },
  { count: 4, size: 15 },
]
const DEFAULT_STOCK: Array<BeamQuota> = []
const DEFAULT_UNLIMITED: UnlimitedStock = 60
const DEFAULT_DISPLAY: DisplayUnit = 'gu'

export interface UrlState {
  required: Array<BeamQuota>
  stock: Array<BeamQuota>
  unlimited: UnlimitedStock
  display: DisplayUnit
  hasState: boolean
  dropped: boolean
}

export function decodeUrlState(params: URLSearchParams): UrlState {
  const required = decodeQuotas(params.get('r'))
  const stock = decodeQuotas(params.get('s'))
  // Untrusted: an unrecognised `?u=` falls back to the default rather than to `false`, which is
  // a real setting ("use only stock") and would quietly change the plan a typo'd link produces.
  const unlimited = tryParseUnlimited(params.get('u')) ?? DEFAULT_UNLIMITED
  const display = params.get('d') === 'mm' ? 'mm' : DEFAULT_DISPLAY
  return {
    required: required?.quotas ?? DEFAULT_REQUIRED,
    stock: stock?.quotas ?? DEFAULT_STOCK,
    unlimited,
    display,
    hasState: params.has('r') || params.has('s'),
    dropped: (required?.dropped ?? false) || (stock?.dropped ?? false),
  }
}

export function encodeUrlState(state: {
  required: Array<BeamQuota>
  stock: Array<BeamQuota>
  unlimited: UnlimitedStock
  display: DisplayUnit
}): string {
  const params = new URLSearchParams()
  if (state.required.length > 0) params.set('r', encodeQuotas(state.required))
  if (state.stock.length > 0) params.set('s', encodeQuotas(state.stock))
  if (state.unlimited !== DEFAULT_UNLIMITED) params.set('u', String(state.unlimited))
  if (state.display !== DEFAULT_DISPLAY) params.set('d', state.display)
  return params.toString()
}

export interface DecodedQuotas {
  quotas: Array<BeamQuota>
  /** Whether anything in the parameter was rejected — surfaced rather than swallowed. */
  dropped: boolean
}

// The URL is untrusted and the planner plans on mount, so decoded quotas are bounded. Unbounded,
// `?r=2-9999999` materialises millions of beams in an O(n²) pack and freezes the tab. Only the
// beam *count* is bounded: cost scales with how many beams there are, not how long they are.
//
// Counts above MAX_COUNT are split across rows rather than clamped, since a design can need more
// of one length than a single row holds (stage at max parameters wants ~288). An entry that
// doesn't fit in the rows left is dropped whole — never part-placed — because half an entry is a
// plan nobody asked for, and it would render as confidently as a correct one.
export function decodeQuotas(value: string | null): DecodedQuotas | null {
  if (value == null) return null
  if (value === '') return { quotas: [], dropped: false }
  const quotas: Array<BeamQuota> = []
  let dropped = false
  for (const pair of value.split('~')) {
    // Whole-pair match rather than `parseInt` on each half: `parseInt` reads the leading digits
    // and discards the rest, so `2-3-4` would quietly decode as 2×3 and `1.9999999-8` — exactly
    // the float drift that used to reach these links — as size 1. Both are wrong plans that look
    // right. Anything that isn't two plain integers is rejected and reported.
    const match = /^(\d+)-(\d+)$/.exec(pair)
    if (match == null) {
      dropped = true
      continue
    }
    const [, sizeStr = '', countStr = ''] = match
    const size = Number(sizeStr)
    const count = Number(countStr)
    const rowsNeeded = Math.ceil(count / MAX_COUNT)
    // `\d+` admits digit strings past 2^53, where Number() rounds: `9007199254740993` would
    // become ...992, a quietly altered plan. Reject rather than alter.
    if (
      !Number.isSafeInteger(size) ||
      size < MIN_SIZE ||
      count < MIN_COUNT ||
      rowsNeeded > MAX_ROWS - quotas.length
    ) {
      dropped = true
      continue
    }
    let remaining = count
    while (remaining > 0) {
      const rowCount = Math.min(remaining, MAX_COUNT)
      quotas.push({ size, count: rowCount })
      remaining -= rowCount
    }
  }
  return { quotas, dropped }
}

export function encodeQuotas(quotas: Array<BeamQuota>): string {
  return quotas.map((q) => `${q.size}-${q.count}`).join('~')
}

export function tryParseUnlimited(value: string | null): UnlimitedStock | null {
  if (value === '30') return 30
  if (value === '60') return 60
  if (value === 'false') return false
  return null
}

// Trusted input: the Select's option values are literals in the component, so anything else is a
// bug in this codebase rather than user data. Legacy threw here too (cutting-planner.tsx:86-95).
export function parseUnlimited(value: string): UnlimitedStock {
  const parsed = tryParseUnlimited(value)
  if (parsed == null) throw new Error(`Unexpected unlimited-stock value: ${value}`)
  return parsed
}
