// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-cutting-planner/src/shared.ts
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

export type CuttingPlannerOptions = {
  requiredBeams: Array<BeamQuota>
  stockBeams: Array<BeamQuota>
  hasUnlimitedStock?: false | 30 | 60
}

export type CuttingPlannerOutput = {
  cutBeams: Array<OutputBeam>
  infeasibleBeams: Array<BeamQuota>
  unusedBeams: Array<BeamQuota>
}

export function beamQuotasToBeams(beamQuotas: Array<BeamQuota>): Array<Beam> {
  return beamQuotas.flatMap(({ size, count }) => {
    return Array.from({ length: count }, () => ({ size }))
  })
}

export function beamsToBeamQuotas(beams: Array<Beam>): Array<BeamQuota> {
  return Object.values(
    beams.reduce((result: Record<Beam['size'], BeamQuota>, beam) => {
      if (beam.size in result) {
        result[beam.size]!.count += 1
      } else {
        result[beam.size] = {
          count: 1,
          size: beam.size,
        }
      }

      return result
    }, {}),
  )
}

export function lengthRemaining(beam: CutBeam) {
  const lengthUsed = beam.cuts.reduce((count, length) => count + length, 0)
  return beam.size - lengthUsed
}
