import type { Parts, Plugins } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

const shelfWidth = 10
const shelfDepth = 8

export const plugins: Plugins = ['smart-fasteners']

export const parts: Parts = [
  posts({
    height: 30,
    xValues: [0, 9, 18, 27, 36],
    yValues: [0, 9],
  }),

  level({
    x: [0, shelfWidth],
    y: [1, 1 + shelfDepth],
    firstBeam: 'x',
    secondBeam: 'y',
    z: 3,
  }),
  level({
    x: [9, 9 + shelfWidth],
    y: [1, 1 + shelfDepth],
    firstBeam: 'x',
    secondBeam: 'y',
    z: 5,
  }),
  level({
    x: [18, 18 + shelfWidth],
    y: [1, 1 + shelfDepth],
    firstBeam: 'x',
    secondBeam: 'y',
    z: 3,
  }),
  level({
    x: [27, 27 + shelfWidth],
    y: [1, 1 + shelfDepth],
    firstBeam: 'x',
    secondBeam: 'y',
    z: 5,
  }),

  level({
    x: [1, 1 + shelfDepth],
    y: [0, shelfWidth],
    firstBeam: 'y',
    z: 9,
  }),

  level({
    x: [18, 18 + shelfWidth],
    y: [1, 1 + shelfDepth],
    firstBeam: 'x',
    z: 11,
  }),
  level({
    x: [9 + 1, 9 + 1 + shelfDepth],
    y: [0, shelfWidth],
    firstBeam: 'y',
    z: 15,
  }),
  level({
    x: [0, shelfWidth],
    y: [1, 1 + shelfDepth],
    firstBeam: 'x',
    z: 19,
  }),

  level({
    x: [27, 27 + shelfWidth],
    y: [1, 1 + shelfDepth],
    firstBeam: 'x',
    z: 17,
  }),
  level({
    x: [18 + 1, 18 + 1 + shelfDepth],
    y: [0, shelfWidth],
    firstBeam: 'y',
    z: 22,
  }),
  level({
    x: [9, 9 + shelfWidth],
    y: [1, 1 + shelfDepth],
    firstBeam: 'x',
    z: 25,
  }),

  level({
    x: [1, 1 + shelfDepth],
    y: [0, shelfWidth],
    firstBeam: 'y',
    secondBeam: 'x',
    z: 30,
  }),
  level({
    x: [18, 18 + shelfWidth],
    y: [1, 1 + shelfDepth],
    firstBeam: 'x',
    z: 30,
  }),
  level({
    x: [27 + 1, 27 + 1 + shelfDepth],
    y: [0, 0 + shelfWidth],
    firstBeam: 'y',
    secondBeam: 'x',
    z: 29,
  }),
]

type PostOptions = {
  height: number
  xValues: Array<number>
  yValues: Array<number>
}

function posts(options: PostOptions): Parts {
  const { height, xValues, yValues } = options

  return [
    xValues.map((x) => [
      yValues.map((y) => [
        GridBeam.Z({
          x,
          y,
          z: [0, height],
        }),
      ]),
    ]),
  ]
}

type LevelOptions = {
  x: [number, number]
  y: [number, number]
  z: number
  firstBeam: 'x' | 'y'
  secondBeam?: 'x' | 'y'
}

function level(options: LevelOptions): Parts {
  const { x, y, z, firstBeam, secondBeam } = options

  return [
    GridPanel.XY({
      x,
      y,
      z,
      fit: 'bottom',
    }),

    firstBeam === 'x'
      ? [
          GridBeam.X({
            x,
            y: y[0],
            z: z - 1,
          }),
          GridBeam.X({
            x,
            y: y[1] - 1,
            z: z - 1,
          }),
        ]
      : [
          GridBeam.Y({
            x: x[0],
            y,
            z: z - 1,
          }),
          GridBeam.Y({
            x: x[1] - 1,
            y,
            z: z - 1,
          }),
        ],

    secondBeam === 'x'
      ? [
          GridBeam.X({
            x: [x[0] - 1, x[1] + 1],
            y: y[0] + 1,
            z: z - 2,
          }),
          GridBeam.X({
            x: [x[0] - 1, x[1] + 1],
            y: y[1] - 2,
            z: z - 2,
          }),
        ]
      : secondBeam === 'y'
        ? [
            GridBeam.Y({
              x: x[0] + 1,
              y: [y[0] - 1, y[1] + 1],
              z: z - 2,
            }),
            GridBeam.Y({
              x: x[1] - 2,
              y: [y[0] - 1, y[1] + 1],
              z: z - 2,
            }),
          ]
        : null,
  ]
}
