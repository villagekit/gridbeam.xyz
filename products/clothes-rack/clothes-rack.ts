import type { Params, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'

export const parameters = {
  width: {
    label: 'Width',
    shortId: 'w',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  height: {
    label: 'Height',
    shortId: 'h',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  legLength: {
    label: 'Leg length',
    shortId: 'll',
    type: 'number',
    min: 10,
    max: 20,
    step: 5,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'default',
    label: 'Default',
    values: {
      width: 30,
      height: 30,
      legLength: 15,
    },
  },
]

export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { width, height, legLength } = parameters

  const legStart = Math.floor(-(1 / 2) * legLength)
  const legEnd = Math.ceil((1 / 2) * legLength)

  return [
    // bottom x beam
    GridBeam.X({
      x: [0, width],
      y: 0,
      z: 1,
    }),
    // top x beam
    GridBeam.X({
      x: [0, width],
      y: 0,
      z: height - 1,
    }),

    // left leg y beam
    GridBeam.Y({
      x: 1,
      y: [legStart, legEnd],
      z: 0,
    }),
    // right leg y beam
    GridBeam.Y({
      x: width - 2,
      y: [legStart, legEnd],
      z: 0,
    }),

    // left front post z beam
    GridBeam.Z({
      x: 0,
      y: -1,
      z: [0, height],
    }),
    // left back post z beam
    GridBeam.Z({
      x: 0,
      y: 1,
      z: [0, height],
    }),
    // right front post z beam
    GridBeam.Z({
      x: width - 1,
      y: -1,
      z: [0, height],
    }),
    // right back post z beam
    GridBeam.Z({
      x: width - 1,
      y: 1,
      z: [0, height],
    }),

    // top left support y beam
    GridBeam.Y({
      x: 1,
      y: [-1, 2],
      z: height - 2,
    }),
    // top right support y beam
    GridBeam.Y({
      x: width - 2,
      y: [-1, 2],
      z: height - 2,
    }),
  ] satisfies Parts
}
