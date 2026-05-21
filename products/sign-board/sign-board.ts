import type { Params, Part, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

export const parameters = {
  boardWidth: {
    label: 'Board width',
    shortId: 'bw',
    type: 'number',
    min: 5,
    max: 60,
    step: 5,
  },
  boardHeight: {
    label: 'Board height',
    shortId: 'bh',
    type: 'number',
    min: 5,
    max: 50,
    step: 5,
  },
  legHeight: {
    label: 'Leg height',
    description: 'The height from the ground to the bottom of the board',
    shortId: 'lh',
    type: 'number',
    min: 5,
    max: 30,
    step: 5,
  },
  legWidth: {
    label: 'Leg width',
    shortId: 'lw',
    type: 'number',
    min: 5,
    max: 30,
    step: 5,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'large',
    label: 'Large',
    values: {
      boardHeight: 30,
      boardWidth: 30,
      legHeight: 10,
      legWidth: 20,
    },
  },
  {
    id: 'medium',
    label: 'Medium',
    values: {
      boardHeight: 20,
      boardWidth: 20,
      legHeight: 10,
      legWidth: 15,
    },
  },
  {
    id: 'small',
    label: 'Small',
    values: {
      boardHeight: 10,
      boardWidth: 10,
      legHeight: 10,
      legWidth: 10,
    },
  },
]

export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { boardHeight, boardWidth, legHeight, legWidth } = parameters

  const legYStart = Math.ceil((1 / 2) * legWidth)
  const legYEnd = legYStart - legWidth

  return [
    createPanelsZ({
      height: boardHeight,
      panel: {
        x: [0, boardWidth],
        y: -1,
        fit: 'top',
      },
      zOffset: legHeight,
    }),

    GridBeam.Z({
      x: 0,
      y: 0,
      z: [0, legHeight + boardHeight],
    }),
    GridBeam.Z({
      x: boardWidth - 1,
      y: 0,
      z: [0, legHeight + boardHeight],
    }),

    GridBeam.Y({
      x: 1,
      y: [legYStart, legYEnd],
      z: 0,
    }),
    GridBeam.Y({
      x: boardWidth - 2,
      y: [legYStart, legYEnd],
      z: 0,
    }),

    GridBeam.X({
      x: [0, boardWidth],
      y: 1,
      z: 1,
    }),
  ]
}

export interface CreatePanelsXZOptions {
  height: number
  zOffset: number
  panel: {
    x: [number, number]
    y: number
    fit?: 'top' | 'bottom'
  }
}

export function createPanelsZ(options: CreatePanelsXZOptions): Parts {
  const { height, zOffset, panel } = options

  const numTenPanels = Math.floor(height / 10)
  const numFivePanels = Math.floor((height % 10) / 5)

  return [
    range(numTenPanels).map((tenPanelIndex): Part => {
      const z: [number, number] = [zOffset + 10 * tenPanelIndex, zOffset + 10 * (tenPanelIndex + 1)]

      return GridPanel.XZ({ z, ...panel })
    }),
    range(numTenPanels * 2, numTenPanels * 2 + numFivePanels).map((fivePanelIndex): Part => {
      const z: [number, number] = [zOffset + 5 * fivePanelIndex, zOffset + 5 * (fivePanelIndex + 1)]

      return GridPanel.XZ({ z, ...panel })
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
