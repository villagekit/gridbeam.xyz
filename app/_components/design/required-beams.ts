import type { PartCreator } from '@villagekit/part'

import type { BeamQuota } from '@/app/tools/cutting-planner/algorithm'

// `parts` is a flat list of individual PartCreators (the kit context flattens
// any grouped parts before exposing them), so each gridbeam entry == one beam.
export function getRequiredBeamsFromParts(parts: Array<PartCreator>): Array<BeamQuota> {
  const countBySize: Record<number, number> = {}
  for (const part of parts) {
    const { spec } = part
    if (spec.type === 'gridbeam') {
      // Parametric designs divide to place beams, so lengthInGrids arrives with float drift
      // (lumber-rack yields both 1.9999999999999991 and 2.000000000000001 for the same beam).
      // Beams are cut on the 40 mm grid, so the whole number is the real length. Without this
      // the drift splits one length into two rows, prints "2.000000000000001 gu", and the
      // planner's URL decode reads 1.9999999999999991 as 1 and drops the row entirely.
      const size = Math.round(spec.lengthInGrids)
      countBySize[size] = (countBySize[size] ?? 0) + 1
    }
  }
  // Note(cc): descending, while `beamsToBeamQuotas` sorts ascending. Deliberate — a design's
  // cut list reads best longest-first ("6× 47 gu, 6× 23 gu, 6× 8 gu"), whereas the planner's
  // leftover tables follow legacy's ascending order.
  return Object.entries(countBySize)
    .map(([size, count]) => ({ size: Number(size), count }))
    .sort((a, b) => b.size - a.size)
}
