import type { Params, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

export const parameters = {
  width: {
    label: 'Width',
    shortId: 'w',
    type: 'number',
    min: 5,
    max: 20,
    step: 5,
  },
  depth: {
    label: 'Depth',
    shortId: 'd',
    type: 'number',
    min: 5,
    max: 20,
    step: 5,
  },
  height: {
    label: 'Height',
    shortId: 'h',
    type: 'number',
    min: 5,
    max: 30,
    step: 5,
  },
  rungSpacing: {
    label: 'Rung spacing',
    shortId: 'rs',
    type: 'number',
    min: 2,
    max: 10,
  },
  initialShelfOffset: {
    label: 'Initial Shelf Offset',
    shortId: 'iso',
    type: 'number',
    min: 0,
    max: 10,
  },
  shelfSpacing: {
    label: 'Shelf spacing',
    shortId: 'ss',
    type: 'number',
    min: 5,
    max: 15,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'regular',
    label: 'Regular',
    values: {
      width: 10,
      depth: 10,
      height: 20,
      rungSpacing: 5,
      initialShelfOffset: 2,
      shelfSpacing: 8,
    },
  },
]

export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { width, depth, height, rungSpacing, initialShelfOffset, shelfSpacing } = parameters

  const numRungs = Math.floor(height / rungSpacing) - 1
  const numShelves = Math.ceil((height - initialShelfOffset - 3) / shelfSpacing)

  return [
    // front left z
    GridBeam.Z({
      x: 0,
      y: 0,
      z: [0, height],
    }),
    // front right z
    GridBeam.Z({
      x: width - 1,
      y: 0,
      z: [0, height],
    }),
    // front left z
    GridBeam.Z({
      x: 0,
      y: depth - 1,
      z: [0, height],
    }),
    // front left z
    GridBeam.Z({
      x: width - 1,
      y: depth - 1,
      z: [0, height],
    }),

    // ladder rungs
    range(numRungs).map((rungIndex) =>
      GridBeam.Y({
        x: -1,
        y: [0, depth],
        z: (1 + rungIndex) * rungSpacing - 1,
      }),
    ),
    // top rung
    GridBeam.Y({
      x: -1,
      y: [0, depth],
      z: height - 1,
    }),

    // shelves
    range(numShelves).map((shelfIndex) => [
      GridBeam.X({
        x: [0, width],
        y: 1,
        z: initialShelfOffset + shelfIndex * shelfSpacing,
      }),
      GridBeam.X({
        x: [0, width],
        y: depth - 2,
        z: initialShelfOffset + shelfIndex * shelfSpacing,
      }),
      GridPanel.XY({
        x: [1, width - 1],
        y: [0, depth],
        z: 1 + initialShelfOffset + shelfIndex * shelfSpacing,
      }),
    ]),
    // top shelf
    GridPanel.XY({
      x: [-1, width],
      y: [0, depth],
      z: height,
    }),
  ] satisfies Parts
}

function range(end: number) {
  return Array.from(Array(end).keys())
}
