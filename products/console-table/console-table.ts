import type { Params, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

export const parameters = {
  baseWidth: {
    label: 'Base width',
    shortId: 'bw',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  tableWidth: {
    label: 'Table width',
    shortId: 'tw',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  depth: {
    label: 'Depth',
    shortId: 'd',
    type: 'number',
    min: 5,
    max: 20,
  },
  height: {
    label: 'Height',
    shortId: 'h',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'default',
    label: 'Default',
    values: {
      baseWidth: 20,
      tableWidth: 30,
      depth: 8,
      height: 25,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { baseWidth, tableWidth, depth, height } = parameters

  const widthOverhang = tableWidth - baseWidth
  const widthOverhangLeft = Math.ceil((1 / 2) * widthOverhang)
  const widthOverhangRight = Math.floor((1 / 2) * widthOverhang)

  return [
    // left front beam z
    GridBeam.Z({
      x: 0,
      y: 0,
      z: [0, height],
    }),
    // left back beam z
    GridBeam.Z({
      x: 0,
      y: depth - 1,
      z: [0, height],
    }),
    // right front beam z
    GridBeam.Z({
      x: baseWidth - 1,
      y: 0,
      z: [0, height],
    }),
    // right back beam z
    GridBeam.Z({
      x: baseWidth - 1,
      y: depth - 1,
      z: [0, height],
    }),

    // bottom front beam x
    GridBeam.X({
      x: [0, baseWidth],
      y: 1,
      z: 0,
    }),
    // bottom back beam x
    GridBeam.X({
      x: [0, baseWidth],
      y: depth - 2,
      z: 0,
    }),

    // top front beam x
    GridBeam.X({
      x: [-widthOverhangLeft, baseWidth + widthOverhangRight],
      y: 1,
      z: height - 1,
    }),
    // top back beam x
    GridBeam.X({
      x: [-widthOverhangLeft, baseWidth + widthOverhangRight],
      y: depth - 2,
      z: height - 1,
    }),

    // bottom left beam y
    GridBeam.Y({
      x: 1,
      y: [0, depth],
      z: 1,
    }),
    // bottom right beam y
    GridBeam.Y({
      x: baseWidth - 2,
      y: [0, depth],
      z: 1,
    }),

    // top left beam y
    GridBeam.Y({
      x: 1,
      y: [0, depth],
      z: height - 2,
    }),
    // top right beam y
    GridBeam.Y({
      x: baseWidth - 2,
      y: [0, depth],
      z: height - 2,
    }),

    // top panel
    GridPanel.XY({
      x: [-widthOverhangLeft, baseWidth + widthOverhangRight],
      y: [0, depth],
      z: height,
    }),
  ] satisfies Parts
}

export const plugins: Plugins = ['smart-fasteners']
