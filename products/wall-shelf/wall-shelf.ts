import type { Params, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

export const parameters = {
  shelfDepth: {
    label: 'Shelf depth',
    shortId: 'sd',
    type: 'number',
    min: 5,
    max: 15,
  },
  shelfWidth: {
    label: 'Shelf width',
    shortId: 'sw',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  mountLength: {
    label: 'Mount length',
    shortId: 'ml',
    type: 'number',
    min: 3,
    max: 10,
  },
  mountType: {
    label: 'Mount Type',
    shortId: 'mt',
    type: 'choice',
    options: {
      bottom: 'Bottom',
      top: 'Top',
    },
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'regular-top',
    label: 'Regular (Top)',
    values: {
      shelfWidth: 30,
      shelfDepth: 5,
      mountLength: 5,
      mountType: 'top',
    },
  },
  {
    id: 'regular-bottom',
    label: 'Regular (Bottom)',
    values: {
      shelfWidth: 30,
      shelfDepth: 5,
      mountLength: 5,
      mountType: 'bottom',
    },
  },
]

export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { shelfWidth, shelfDepth, mountLength, mountType } = parameters

  if (mountType === 'bottom') {
    return [
      // panel
      GridPanel.XY({
        x: [0, shelfWidth],
        y: [0, -shelfDepth],
        z: mountLength,
        fit: 'bottom',
      }),

      // x beam
      GridBeam.X({
        x: [0, shelfWidth],
        y: -1,
        z: mountLength - 1,
      }),

      // left mount z
      GridBeam.Z({
        x: 1,
        y: 0,
        z: [0, mountLength],
      }),

      // right mount z
      GridBeam.Z({
        x: shelfWidth - 2,
        y: 0,
        z: [0, mountLength],
      }),

      // left mount y
      GridBeam.Y({
        x: 2,
        y: [0, -2],
        z: mountLength - 2,
      }),

      // right mount y
      GridBeam.Y({
        x: shelfWidth - 3,
        y: [0, -2],
        z: mountLength - 2,
      }),
    ] satisfies Parts
  }

  return [
    // panel
    GridPanel.XY({
      x: [0, shelfWidth],
      y: [0, -shelfDepth],
      z: 0,
      fit: 'top',
      holeVariant: 'half-reverse',
    }),

    // x beam
    GridBeam.X({
      x: [0, shelfWidth],
      y: -1,
      z: 1,
    }),

    // left mount z
    GridBeam.Z({
      x: 1,
      y: 0,
      z: [1, mountLength + 1],
    }),

    // right mount z
    GridBeam.Z({
      x: shelfWidth - 2,
      y: 0,
      z: [1, mountLength + 1],
    }),

    // left mount y
    GridBeam.Y({
      x: 2,
      y: [0, -2],
      z: 2,
    }),

    // right mount y
    GridBeam.Y({
      x: shelfWidth - 3,
      y: [0, -2],
      z: 2,
    }),
  ] satisfies Parts
}
