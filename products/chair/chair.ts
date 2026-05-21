import type { Params, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

export const parameters = {
  seatWidth: {
    label: 'Seat width',
    shortId: 'sw',
    type: 'number',
    min: 5,
    max: 10,
    step: 5,
  },
  seatDepth: {
    label: 'Seat depth',
    shortId: 'sd',
    type: 'number',
    min: 5,
    max: 15,
  },
  seatHeight: {
    label: 'Seat height',
    description: 'The height from the ground to the top of the seat',
    shortId: 'sh',
    type: 'number',
    min: 5,
    max: 15,
  },
  shouldIncludeBack: {
    label: 'Include back',
    shortId: 'b',
    type: 'boolean',
  },
  backHeight: {
    label: 'Back height',
    description: 'The height from the seat to the top of the backrest',
    shortId: 'bh',
    type: 'number',
    min: 5,
    max: 10,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'regular-with-back',
    label: 'Regular With Back',
    values: {
      backHeight: 10,
      seatDepth: 10,
      seatHeight: 10,
      seatWidth: 10,
      shouldIncludeBack: true,
    },
  },
  {
    id: 'regular',
    label: 'Regular (Without Back)',
    values: {
      backHeight: 10,
      seatDepth: 10,
      seatHeight: 10,
      seatWidth: 10,
      shouldIncludeBack: false,
    },
  },
]

export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { seatWidth, seatDepth, seatHeight, backHeight, shouldIncludeBack } = parameters

  const backZBeamEndZ = shouldIncludeBack ? seatHeight + backHeight : seatHeight
  const seatPanelStartY = shouldIncludeBack ? -1 : 0
  const seatPanelEndY = shouldIncludeBack ? seatDepth - 1 : seatDepth

  return [
    GridPanel.XY({
      x: [0, seatWidth],
      y: [seatPanelStartY, seatPanelEndY],
      z: seatHeight,
    }),

    shouldIncludeBack &&
      GridPanel.XZ({
        x: [0, seatWidth],
        y: seatDepth - 2,
        z: [seatHeight + 1, seatHeight + 1 + backHeight],
        fit: 'top',
      }),

    GridBeam.Z({
      x: 0,
      y: 0,
      z: [0, seatHeight],
    }),
    GridBeam.Z({
      x: seatWidth - 1,
      y: 0,
      z: [0, seatHeight],
    }),
    GridBeam.Z({
      x: 0,
      y: seatDepth - 1,
      z: [0, backZBeamEndZ],
    }),
    GridBeam.Z({
      x: seatWidth - 1,
      y: seatDepth - 1,
      z: [0, backZBeamEndZ],
    }),

    GridBeam.X({
      x: [0, seatWidth],
      y: 1,
      z: seatHeight - 2,
    }),
    GridBeam.X({
      x: [0, seatWidth],
      y: seatDepth - 2,
      z: seatHeight - 2,
    }),

    GridBeam.Y({
      x: 1,
      y: [0, seatDepth],
      z: seatHeight - 1,
    }),
    GridBeam.Y({
      x: seatWidth - 2,
      y: [0, seatDepth],
      z: seatHeight - 1,
    }),
  ] satisfies Parts
}
