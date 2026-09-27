// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-cutting-planner/src/algorithms/first-fit-decreasing.ts
import { partition } from 'lodash-es'

import {
  type Beam,
  type CutBeam,
  type CuttingPlannerOptions,
  type CuttingPlannerOutput,
  beamQuotasToBeams,
  beamsToBeamQuotas,
  lengthRemaining,
} from '../shared'

export function firstFitDecreasing(options: CuttingPlannerOptions): CuttingPlannerOutput {
  const { requiredBeams, stockBeams, hasUnlimitedStock = 60 } = options

  // Initialise desired beams using the required beams, sorted in order of decreasing size
  const desiredBeams: Array<Beam> = beamQuotasToBeams(requiredBeams).sort(
    (beamA, beamB) => beamB.size - beamA.size,
  )

  // Initialise cut beams using the stock beams, sorted in order of increasing size
  const cutBeams: Array<CutBeam> = beamQuotasToBeams(stockBeams)
    .map((beam) => ({
      ...beam,
      cuts: [],
    }))
    .sort((beamA, beamB) => beamA.size - beamB.size)

  const infeasibleBeams: Array<Beam> = []

  for (const { size } of desiredBeams) {
    // Try to find a beam that has capacity for the given beam
    const beamToCutFrom = cutBeams.find((beam) => size <= lengthRemaining(beam))

    if (beamToCutFrom != null) {
      // If a beam is found, make a cut from it
      beamToCutFrom.cuts.push(size)
    } else if (hasUnlimitedStock) {
      // Alternatively, if there is an unlimited supply, cut a fresh beam
      cutBeams.push({
        cuts: [size],
        size: hasUnlimitedStock,
      })
    } else {
      // Otherwise, mark the beam as infeasible to cut
      infeasibleBeams.push({ size })
    }
  }

  const [usedBeams, unusedBeams] = partition(cutBeams, (beam: CutBeam) => beam.cuts.length > 0)

  return {
    cutBeams: usedBeams.map((beam) => ({
      ...beam,
      remainder: lengthRemaining(beam),
    })),
    infeasibleBeams: beamsToBeamQuotas(infeasibleBeams),
    unusedBeams: beamsToBeamQuotas(unusedBeams),
  }
}
