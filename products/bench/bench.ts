import type { Params, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

export const parameters = {
  seatWidth: {
    label: 'Seat width',
    shortId: 'sw',
    type: 'number',
    min: 20,
    max: 60,
    step: 5,
  },
  seatDepth: {
    label: 'Seat depth',
    shortId: 'sd',
    type: 'number',
    min: 5,
    max: 10,
    step: 5,
  },
  seatHeight: {
    label: 'Seat height',
    description: 'The height from the ground to the top of the seat',
    shortId: 'sh',
    type: 'number',
    min: 5,
    max: 15,
  },
  widthOverhang: {
    label: 'Overhang',
    description: 'How many grid units should the panel overhang the beams',
    shortId: 'wo',
    type: 'number',
    min: 0,
    max: 4,
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
    step: 5,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'regular',
    label: 'Regular',
    values: {
      backHeight: 10,
      seatDepth: 10,
      seatHeight: 10,
      seatWidth: 30,
      shouldIncludeBack: false,
      widthOverhang: 3,
    },
  },
  {
    id: 'regular-with-back',
    label: 'Regular With Back',
    values: {
      backHeight: 10,
      seatDepth: 10,
      seatHeight: 10,
      seatWidth: 30,
      shouldIncludeBack: true,
      widthOverhang: 3,
    },
  },
]

export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { seatWidth, seatDepth, seatHeight, backHeight, widthOverhang, shouldIncludeBack } =
    parameters

  const backZBeamEndZ = shouldIncludeBack ? seatHeight + backHeight : seatHeight
  const seatPanelStartY = shouldIncludeBack ? -1 : 0
  const seatPanelEndY = shouldIncludeBack ? seatDepth - 1 : seatDepth

  // 0-30 => 0, 31-45 => 1, 46-60 => 2
  const numLegSupports = Math.ceil((seatWidth - 30) / 15)

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
      x: widthOverhang,
      y: 0,
      z: [0, seatHeight],
    }),
    GridBeam.Z({
      x: seatWidth - 1 - widthOverhang,
      y: 0,
      z: [0, seatHeight],
    }),
    GridBeam.Z({
      x: widthOverhang,
      y: seatDepth - 1,
      z: [0, backZBeamEndZ],
    }),
    GridBeam.Z({
      x: seatWidth - 1 - widthOverhang,
      y: seatDepth - 1,
      z: [0, backZBeamEndZ],
    }),

    GridBeam.X({
      x: [0, seatWidth],
      y: 1,
      z: seatHeight - 1,
    }),
    GridBeam.X({
      x: [0, seatWidth],
      y: seatDepth - 2,
      z: seatHeight - 1,
    }),

    GridBeam.Y({
      x: 1 + widthOverhang,
      y: [0, seatDepth],
      z: seatHeight - 2,
    }),
    GridBeam.Y({
      x: seatWidth - 2 - widthOverhang,
      y: [0, seatDepth],
      z: seatHeight - 2,
    }),

    range(numLegSupports).map((legSupportIndex) => {
      const legSupportOffsetMultiplier = 1 / (numLegSupports + 1)
      const legSupportOffset =
        Math.round(legSupportOffsetMultiplier * seatWidth * (legSupportIndex + 1)) - 1
      // nudge z posts towards the middle
      const legZSupportXNudge = legSupportIndex >= Math.floor(numLegSupports / 2) ? -1 : 1

      return [
        GridBeam.Y({
          x: legSupportOffset + legZSupportXNudge,
          y: [0, seatDepth],
          z: seatHeight - 2,
        }),
        GridBeam.Z({
          x: legSupportOffset,
          y: 0,
          z: [0, backZBeamEndZ],
        }),
        GridBeam.Z({
          x: legSupportOffset,
          y: seatDepth - 1,
          z: [0, seatHeight],
        }),
      ]
    }),
  ]
}

function range(end: number) {
  return Array.from(Array(end).keys())
}
