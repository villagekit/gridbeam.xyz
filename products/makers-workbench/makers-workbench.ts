import type { Params, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

export const parameters = {
  width: {
    label: 'Width',
    shortId: 'w',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  depth: {
    label: 'Depth',
    shortId: 'd',
    type: 'number',
    min: 10,
    max: 20,
    step: 10,
  },
  workHeight: {
    label: 'Work height',
    shortId: 'wh',
    type: 'number',
    min: 8,
    max: 30,
  },
  bottomShelfHeight: {
    label: 'Bottom shelf height',
    shortId: 'bsh',
    type: 'number',
    min: 2,
    max: 30,
  },
  topShelfDepth: {
    label: 'Top shelf depth',
    shortId: 'tsd',
    type: 'number',
    min: 3,
    max: 10,
  },
  topShelfHeight: {
    label: 'Top shelf height',
    shortId: 'tsh',
    type: 'number',
    min: 8,
    max: 30,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'default',
    label: 'Default',
    values: {
      width: 30,
      depth: 20,
      workHeight: 23,
      bottomShelfHeight: 4,
      topShelfDepth: 8,
      topShelfHeight: 30,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { width, depth, workHeight, bottomShelfHeight, topShelfDepth, topShelfHeight } = parameters

  return [
    // front left z
    GridBeam.Z({
      x: 0,
      y: 0,
      z: [0, workHeight],
    }),
    // back left z
    GridBeam.Z({
      x: 0,
      y: depth - 1,
      z: [0, topShelfHeight],
    }),
    // front right z
    GridBeam.Z({
      x: width - 1,
      y: 0,
      z: [0, workHeight],
    }),
    // back right z
    GridBeam.Z({
      x: width - 1,
      y: depth - 1,
      z: [0, topShelfHeight],
    }),

    // bottom shelf left y
    GridBeam.Y({
      x: 1,
      y: [0, depth],
      z: bottomShelfHeight - 2,
    }),
    // bottom shelf right y
    GridBeam.Y({
      x: width - 2,
      y: [0, depth],
      z: bottomShelfHeight - 2,
    }),
    // bottom shelf front x
    GridBeam.X({
      x: [0, width],
      y: 1,
      z: bottomShelfHeight - 1,
    }),
    // bottom shelf back x
    GridBeam.X({
      x: [0, width],
      y: depth - 2,
      z: bottomShelfHeight - 1,
    }),
    // bottom shelf panel
    GridPanel.XY({
      x: [0, width],
      y: [1, depth - 1],
      z: bottomShelfHeight,
    }),

    // work left y
    GridBeam.Y({
      x: 1,
      y: [0, depth],
      z: workHeight - 2,
    }),
    // work right y
    GridBeam.Y({
      x: width - 2,
      y: [0, depth],
      z: workHeight - 2,
    }),
    // work front x
    GridBeam.X({
      x: [0, width],
      y: 1,
      z: workHeight - 1,
    }),
    // work back x
    GridBeam.X({
      x: [0, width],
      y: depth - 2,
      z: workHeight - 1,
    }),
    // work panel
    GridPanel.XY({
      x: [0, width],
      y: [1, depth - 1],
      z: workHeight,
    }),

    // top shelf back x
    GridBeam.X({
      x: [0, width],
      y: depth - 2,
      z: topShelfHeight - 2,
    }),
    // top shelf left y
    GridBeam.Y({
      x: 1,
      y: [depth - 1, depth - 1 - topShelfDepth],
      z: topShelfHeight - 1,
    }),
    // top shelf middle y
    GridBeam.Y({
      x: Math.floor(width / 2),
      y: [depth - 1, depth - 1 - topShelfDepth],
      z: topShelfHeight - 1,
    }),
    // top shelf right y
    GridBeam.Y({
      x: width - 2,
      y: [depth - 1, depth - 1 - topShelfDepth],
      z: topShelfHeight - 1,
    }),
    // top shelf panel
    GridPanel.XY({
      x: [0, width],
      y: [depth - 1, depth - 1 - topShelfDepth],
      z: topShelfHeight,
    }),
  ] satisfies Parts
}

export const plugins: Plugins = ['smart-fasteners']
