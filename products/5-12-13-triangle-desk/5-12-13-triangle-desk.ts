import type { Params, Parts, PartsFn, Presets } from '@villagekit/design/kit'
import { radToDeg } from '@villagekit/math'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

export const parameters = {
  size: {
    label: 'Size',
    shortId: 's',
    type: 'number',
    min: 15,
    max: 30,
    step: 15,
  },
  width: {
    label: 'Width',
    shortId: 'w',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  topShelf: {
    label: 'Top shelf',
    shortId: 'ts',
    type: 'choice',
    options: {
      none: 'None',
      full: 'Full',
    },
  },
  bottomShelf: {
    label: 'Bottom shelf',
    shortId: 'bs',
    type: 'choice',
    options: {
      none: 'None',
      full: 'Full',
      'side-left': 'Left Side',
      'side-right': 'Right Side',
    },
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'regular',
    label: 'Regular',
    values: {
      size: 30,
      width: 30,
      topShelf: 'full',
      bottomShelf: 'side-left',
    },
  },
  {
    id: 'Full',
    label: 'Full',
    values: {
      size: 30,
      width: 30,
      topShelf: 'full',
      bottomShelf: 'full',
    },
  },
  {
    id: 'narrow',
    label: 'Narrow',
    values: {
      size: 30,
      width: 15,
      topShelf: 'full',
      bottomShelf: 'full',
    },
  },
  {
    id: 'small',
    label: 'Small',
    values: {
      size: 15,
      width: 15,
      topShelf: 'full',
      bottomShelf: 'full',
    },
  },
]

// export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { size, width, topShelf, bottomShelf } = parameters

  const gridLength = 0.04

  const zOffset = size === 15 ? 1 : size === 30 ? 2 : null
  if (zOffset === null) throw new Error('Unexpected size')

  const firstShelfZ = size - zOffset - 3
  const secondShelf = size === 15 ? bottomShelf : 'full'
  const secondShelfZ = size - zOffset - 12 + 1
  const thirdShelf = size === 15 ? 'none' : bottomShelf
  const thirdShelfZ = size - zOffset - 24 + 1

  return [
    // left z beam
    GridBeam.Z({
      x: 0,
      y: 0,
      z: [0, size],
    }),

    // right z beam
    GridBeam.Z({
      x: width - 1,
      y: 0,
      z: [0, size],
    }),

    // left angle beam
    GridBeam.Z({
      x: -1,
      y: 0,
      z: [-zOffset, size - zOffset],
    }).rotate({
      direction: [1, 0, 0],
      // cos(theta) = adjacent / hypotenuse
      // cos(theta) = 12 / 13
      // theta = acos(12 / 13)
      angle: -radToDeg(Math.acos(12 / 13)),
      origin: [-1 * gridLength, 0, (size - zOffset - 1) * gridLength],
    }),

    // right angle beam
    GridBeam.Z({
      x: width,
      y: 0,
      z: [-zOffset, size - zOffset],
    }).rotate({
      direction: [1, 0, 0],
      // cos(theta) = adjacent / hypotenuse
      // cos(theta) = 12 / 13
      // theta = acos(12 / 13)
      angle: -radToDeg(Math.acos(12 / 13)),
      origin: [width * gridLength, 0, (size - zOffset - 1) * gridLength],
    }),

    // first (top) shelf
    topShelf === 'full' && [
      // top shelf x beam
      GridBeam.X({
        x: [0, width],
        y: -1,
        z: firstShelfZ - 1,
      }),

      // top shelf xy panel
      GridPanel.XY({
        x: [0, width],
        y: [-1, -6],
        z: firstShelfZ,
      }),
    ],

    // second shelf
    secondShelf === 'full' && [
      // second shelf front x beam
      GridBeam.X({
        x: [0, width],
        y: -1,
        z: secondShelfZ - 1,
      }),

      // second shelf back x beam
      GridBeam.X({
        x: [0, width],
        y: -4,
        z: secondShelfZ - 1,
      }),

      // second shelf left-left y beam
      GridBeam.Y({
        x: 0,
        y: [-1, -6],
        z: secondShelfZ - 2,
      }),

      // second shelf left-right y beam
      GridBeam.Y({
        x: 1,
        y: [0, -6],
        z: secondShelfZ - 2,
      }),

      // second shelf right-right y beam
      GridBeam.Y({
        x: width - 1,
        y: [-1, -6],
        z: secondShelfZ - 2,
      }),

      // second shelf right-left y beam
      GridBeam.Y({
        x: width - 2,
        y: [0, -6],
        z: secondShelfZ - 2,
      }),

      // second shelf xy panel
      GridPanel.XY({
        x: [0, width],
        y: [-1, -11],
        z: secondShelfZ,
      }),
    ],

    // third shelf
    thirdShelf === 'full' && [
      // third shelf front x beam
      GridBeam.X({
        x: [0, width],
        y: -1,
        z: thirdShelfZ - 1,
      }),

      // third shelf back x beam
      GridBeam.X({
        x: [0, width],
        y: -9,
        z: thirdShelfZ - 1,
      }),

      // third shelf left-left y beam
      GridBeam.Y({
        x: 0,
        y: [-1, -11],
        z: thirdShelfZ - 2,
      }),

      // third shelf left-right y beam
      GridBeam.Y({
        x: 1,
        y: [0, -11],
        z: thirdShelfZ - 2,
      }),

      // third shelf right-right y beam
      GridBeam.Y({
        x: width - 1,
        y: [-1, -11],
        z: thirdShelfZ - 2,
      }),

      // third shelf right-left y beam
      GridBeam.Y({
        x: width - 2,
        y: [0, -11],
        z: thirdShelfZ - 2,
      }),

      // third shelf xy panel
      GridPanel.XY({
        x: [0, width],
        y: [-1, -11],
        z: thirdShelfZ,
      }),
    ],
    thirdShelf === 'side-left' && [
      // third shelf left-left y beam
      GridBeam.Y({
        x: 0,
        y: [-1, -11],
        z: thirdShelfZ - 2,
      }),

      // third shelf left-right y beam
      GridBeam.Y({
        x: 1,
        y: [0, -11],
        z: thirdShelfZ - 2,
      }),

      // third shelf xy panel
      GridPanel.XY({
        x: [0, 6],
        y: [-1, -11],
        z: thirdShelfZ - 1,
      }),
    ],

    thirdShelf === 'side-right' && [
      // third shelf right-right y beam
      GridBeam.Y({
        x: width - 1,
        y: [-1, -11],
        z: thirdShelfZ - 2,
      }),

      // third shelf right-left y beam
      GridBeam.Y({
        x: width - 2,
        y: [0, -11],
        z: thirdShelfZ - 2,
      }),

      // third shelf xy panel
      GridPanel.XY({
        x: [width - 1, width - 1 - 6],
        y: [-1, -11],
        z: thirdShelfZ - 1,
      }),
    ],
  ] satisfies Parts
}
