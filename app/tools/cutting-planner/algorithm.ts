// Bin-packing for grid-beam cuts: first-fit-decreasing.
// All sizes are in grid units (gu); 1 gu = 40 mm.
// Ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-cutting-planner/src/lib.ts, with one
// edge-case fix: legacy version produced a beam with negative remainder when a
// required cut exceeded the unlimited-stock length. Now those cuts go to
// infeasibleBeams.

export type Beam = {
  size: number
}

export type BeamQuota = Beam & {
  count: number
}

export type CutBeam = Beam & {
  cuts: Array<number>
}

export type OutputBeam = CutBeam & {
  remainder: number
}

export type UnlimitedStock = false | 30 | 60

export type CuttingPlannerOptions = {
  requiredBeams: Array<BeamQuota>
  stockBeams: Array<BeamQuota>
  hasUnlimitedStock?: UnlimitedStock
}

export type CuttingPlannerOutput = {
  cutBeams: Array<OutputBeam>
  infeasibleBeams: Array<BeamQuota>
  unusedBeams: Array<BeamQuota>
}

export function firstFitDecreasing(options: CuttingPlannerOptions): CuttingPlannerOutput {
  const { requiredBeams, stockBeams, hasUnlimitedStock = 60 } = options

  const desiredBeams: Array<Beam> = beamQuotasToBeams(requiredBeams).sort((a, b) => b.size - a.size)

  const cutBeams: Array<CutBeam> = beamQuotasToBeams(stockBeams)
    .map((beam) => ({ ...beam, cuts: [] }))
    .sort((a, b) => a.size - b.size)

  const infeasibleBeams: Array<Beam> = []

  for (const { size } of desiredBeams) {
    const beamToCutFrom = cutBeams.find((beam) => size <= lengthRemaining(beam))

    if (beamToCutFrom != null) {
      beamToCutFrom.cuts.push(size)
    } else if (hasUnlimitedStock !== false && size <= hasUnlimitedStock) {
      cutBeams.push({ cuts: [size], size: hasUnlimitedStock })
    } else {
      infeasibleBeams.push({ size })
    }
  }

  const usedBeams: Array<CutBeam> = []
  const unusedBeams: Array<CutBeam> = []
  for (const beam of cutBeams) {
    if (beam.cuts.length > 0) usedBeams.push(beam)
    else unusedBeams.push(beam)
  }

  return {
    cutBeams: usedBeams.map((beam) => ({ ...beam, remainder: lengthRemaining(beam) })),
    infeasibleBeams: beamsToBeamQuotas(infeasibleBeams),
    unusedBeams: beamsToBeamQuotas(unusedBeams),
  }
}

export function beamQuotasToBeams(beamQuotas: Array<BeamQuota>): Array<Beam> {
  return beamQuotas.flatMap(({ size, count }) => Array.from({ length: count }, () => ({ size })))
}

export function beamsToBeamQuotas(beams: Array<Beam>): Array<BeamQuota> {
  const grouped = new Map<number, BeamQuota>()
  for (const { size } of beams) {
    const existing = grouped.get(size)
    if (existing != null) existing.count += 1
    else grouped.set(size, { count: 1, size })
  }
  return Array.from(grouped.values())
}

export function lengthRemaining(beam: CutBeam): number {
  return beam.size - beam.cuts.reduce((sum, cut) => sum + cut, 0)
}

export function totalRequiredLength(requiredBeams: Array<BeamQuota>): number {
  return requiredBeams.reduce((sum, { size, count }) => sum + size * count, 0)
}

export function totalCutLength(cutBeams: Array<OutputBeam>): number {
  return cutBeams.reduce((sum, beam) => sum + beam.size, 0)
}

export function totalRemainderLength(cutBeams: Array<OutputBeam>): number {
  return cutBeams.reduce((sum, beam) => sum + beam.remainder, 0)
}
