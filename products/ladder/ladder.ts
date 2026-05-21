import type { Params, Parts, PartsFn, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'

export const parameters = {
  rungWidth: {
    label: 'Rung width',
    shortId: 'rw',
    type: 'number',
    min: 5,
    max: 20,
  },
  ladderHeight: {
    label: 'Ladder height',
    shortId: 'lh',
    type: 'number',
    min: 15,
    max: 60,
    step: 5,
  },
  numRungs: {
    label: 'Number of rungs',
    shortId: 'nr',
    type: 'number',
    min: 3,
    max: 15,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'default',
    label: 'Default',
    values: {
      rungWidth: 10,
      ladderHeight: 30,
      numRungs: 5,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { rungWidth, ladderHeight, numRungs } = parameters

  const heightPerRung = (ladderHeight - 3) / (numRungs - 1)

  return [
    // left z beam
    GridBeam.Z({
      x: 0,
      y: 1,
      z: [0, ladderHeight],
    }),
    // right z beam
    GridBeam.Z({
      x: rungWidth - 1,
      y: 1,
      z: [0, ladderHeight],
    }),

    // rungs
    range(numRungs).map((rungIndex) => {
      const z = Math.floor(rungIndex * heightPerRung)

      return [
        GridBeam.Y({
          x: 1,
          y: [0, 2],
          z,
        }),
        GridBeam.Y({
          x: rungWidth - 2,
          y: [0, 2],
          z,
        }),
        GridBeam.X({
          x: [0, rungWidth],
          y: 0,
          z: z + 1,
        }),
      ] satisfies Parts
    }),
  ] satisfies Parts
}

function range(end: number) {
  return Array.from(Array(end).keys())
}
