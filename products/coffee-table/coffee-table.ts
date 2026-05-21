import type { Params, Part, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

export const parameters = {
  width: {
    label: 'Width',
    shortId: 'w',
    type: 'number',
    min: 5,
    max: 30,
    step: 5,
  },
  depth: {
    label: 'Depth',
    shortId: 'd',
    type: 'number',
    min: 5,
    max: 30,
    step: 5,
  },
  height: {
    label: 'Height',
    shortId: 'h',
    type: 'number',
    min: 5,
    max: 20,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'regular',
    label: 'Regular',
    values: {
      depth: 15,
      height: 10,
      width: 15,
    },
  },
]

export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { width, depth, height } = parameters

  return [
    createPanelsY({
      depth: depth,
      panel: {
        options: {
          x: [0, width],
          z: height,
        },
        type: 'xy',
      },
    }),

    GridBeam.Z({
      x: 1,
      y: 1,
      z: [0, height],
    }),
    GridBeam.Z({
      x: width - 2,
      y: 1,
      z: [0, height],
    }),
    GridBeam.Z({
      x: 1,
      y: depth - 2,
      z: [0, height],
    }),
    GridBeam.Z({
      x: width - 2,
      y: depth - 2,
      z: [0, height],
    }),

    GridBeam.X({
      x: [0, width],
      y: 0,
      z: height - 2,
    }),
    GridBeam.X({
      x: [0, width],
      y: depth - 1,
      z: height - 2,
    }),

    GridBeam.Y({
      x: 0,
      y: [0, depth],
      z: height - 1,
    }),
    GridBeam.Y({
      x: width - 1,
      y: [0, depth],
      z: height - 1,
    }),
  ] satisfies Parts
}

export interface CreatePanelsYOptions {
  depth: number
  panel:
    | {
        type: 'xy'
        options: {
          x: [number, number]
          z: number
          fit?: 'top' | 'bottom'
        }
      }
    | {
        type: 'yz'
        options: {
          x: number
          z: [number, number]
          fit?: 'top' | 'bottom'
        }
      }
}

function createPanelsY(options: CreatePanelsYOptions): Parts {
  const { depth, panel } = options

  const numTenPanels = Math.floor(depth / 10)
  const numFivePanels = Math.floor((depth % 10) / 5)

  return [
    range(numTenPanels).map((tenPanelIndex): Part => {
      const y: [number, number] = [10 * tenPanelIndex, 10 * (tenPanelIndex + 1)]

      return panel.type === 'xy'
        ? GridPanel.XY({ y, ...panel.options })
        : GridPanel.YZ({ y, ...panel.options })
    }),
    range(numTenPanels * 2, numTenPanels * 2 + numFivePanels).map((fivePanelIndex): Part => {
      const y: [number, number] = [5 * fivePanelIndex, 5 * (fivePanelIndex + 1)]

      return panel.type === 'xy'
        ? GridPanel.XY({ y, ...panel.options })
        : GridPanel.YZ({ y, ...panel.options })
    }),
  ]
}

function range(end: number): Array<number>
function range(start: number, end: number): Array<number>
function range(...args: [number] | [number, number]): Array<number> {
  const [start, end] = args.length === 1 ? [0, args[0]] : [args[0], args[1]]
  const length = end - start
  return Array.from(Array(length).keys()).map((i) => i + start)
}
