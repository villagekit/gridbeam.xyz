import type { Params, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

export const parameters = {
  rackWidth: {
    label: 'Rack width',
    description: 'The distance from the first support to the last support',
    shortId: 'rw',
    type: 'number',
    min: 10,
    max: 120,
    step: 5,
  },
  rackHeight: {
    label: 'Rack height',
    shortId: 'rh',
    type: 'number',
    min: 5,
    max: 60,
    step: 5,
  },
  supportLength: {
    label: 'Support length',
    shortId: 'sl',
    type: 'number',
    min: 4,
    max: 20,
  },
  numRows: {
    label: 'Number of rows',
    description: 'How many horizontal supports per vertical support',
    shortId: 'nr',
    type: 'number',
    min: 2,
    max: 10,
  },
  numCols: {
    label: 'Number of columns',
    description: 'How many vertical supports',
    shortId: 'nc',
    type: 'number',
    min: 2,
    max: 10,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'default',
    label: 'Default',
    values: {
      rackWidth: 50,
      rackHeight: 20,
      supportLength: 10,
      numRows: 4,
      numCols: 4,
    },
  },
]

export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { rackWidth, rackHeight, supportLength, numRows, numCols } = parameters

  return [
    range(numCols).map((colIndex) => {
      const x = (colIndex / (numCols - 1)) * rackWidth
      return [
        GridBeam.Z({
          x,
          y: 0,
          z: [0, rackHeight],
        }),
        range(numRows).map((rowIndex) => {
          const z = (rowIndex / (numRows - 1)) * (rackHeight - 2)
          return [
            GridBeam.X({
              x: [x, x + 2],
              y: -1,
              z,
            }),
            GridBeam.Y({
              x: x + 1,
              y: [0, -supportLength],
              z: z + 1,
            }),
          ]
        }),
      ]
    }),
  ] satisfies Parts
}

function range(end: number) {
  return Array.from(Array(end).keys())
}
