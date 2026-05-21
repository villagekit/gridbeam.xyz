import type { Params, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'

export const parameters = {
  baseWidth: {
    label: 'Base width',
    shortId: 'bw',
    type: 'number',
    min: 8,
    max: 15,
  },
  hookLength: {
    label: 'Hook length',
    shortId: 'hl',
    type: 'number',
    min: 5,
    max: 15,
  },
  numHooks: {
    label: 'Number of Hooks',
    shortId: 'nh',
    type: 'number',
    min: 1,
    max: 12,
  },
  height: {
    label: 'Height',
    shortId: 'h',
    type: 'number',
    min: 5,
    max: 30,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'default',
    label: 'Default',
    values: {
      baseWidth: 8,
      hookLength: 5,
      numHooks: 4,
      height: 30,
    },
  },
]

export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { baseWidth, hookLength, numHooks, height } = parameters

  return [
    // center z post
    GridBeam.Z({
      x: 0,
      y: 0,
      z: [0, height],
    }),

    // bottom front x
    GridBeam.X({
      x: [-Math.ceil((1 / 2) * baseWidth) + 1, Math.floor((1 / 2) * baseWidth) + 1],
      y: -1,
      z: 1,
    }),

    // bottom middle y
    GridBeam.Y({
      x: 1,
      y: [-1, 1],
      z: 0,
    }),

    // bottom left y
    GridBeam.Y({
      x: -Math.ceil((1 / 2) * baseWidth) + 1,
      y: [-Math.floor((1 / 2) * baseWidth), Math.ceil((1 / 2) * baseWidth)],
      z: 0,
    }),

    // bottom right y
    GridBeam.Y({
      x: Math.floor((1 / 2) * baseWidth),
      y: [-Math.floor((1 / 2) * baseWidth), Math.ceil((1 / 2) * baseWidth)],
      z: 0,
    }),

    // bottom left z
    GridBeam.Z({
      x: -Math.ceil((1 / 2) * baseWidth) + 2,
      y: 0,
      z: [0, 2],
    }),

    // bottom right z
    GridBeam.Z({
      x: Math.ceil((1 / 2) * baseWidth) - 1,
      y: 0,
      z: [0, 2],
    }),

    range(numHooks).map((hookIndex) => {
      const z = height - hookIndex - 2

      switch (hookIndex % 4) {
        case 0:
          return GridBeam.X({
            x: [-1, hookLength],
            y: -1,
            z,
          })
        case 1:
          return GridBeam.Y({
            x: 1,
            y: [-1, hookLength],
            z,
          })
        case 2:
          return GridBeam.X({
            x: [1, -hookLength],
            y: 1,
            z,
          })
        case 3:
          return GridBeam.Y({
            x: -1,
            y: [1, -hookLength],
            z,
          })
      }
    }),
  ] satisfies Parts
}

function range(end: number) {
  return Array.from(Array(end).keys())
}
