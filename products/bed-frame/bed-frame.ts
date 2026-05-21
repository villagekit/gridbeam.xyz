import type { Params, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

type MattressSizeName =
  | 'single'
  | 'longSingle'
  | 'kingSingle'
  | 'double'
  | 'queen'
  | 'king'
  | 'superKing'
  | 'californiaKing'
interface MattressSize {
  length: number
  width: number
}

// sizes in mm
const mattressSizes: Record<MattressSizeName, MattressSize> = {
  single: {
    width: 920,
    length: 1880,
  },
  longSingle: {
    width: 920,
    length: 2030,
  },
  kingSingle: {
    width: 1070,
    length: 2030,
  },
  double: {
    width: 1380,
    length: 1880,
  },
  queen: {
    width: 1530,
    length: 2030,
  },
  king: {
    width: 1670,
    length: 2030,
  },
  superKing: {
    width: 1830,
    length: 2030,
  },
  californiaKing: {
    width: 2030,
    length: 2030,
  },
}
const mattressSizeKeys = Object.keys(mattressSizes)
const mattressSizeOptions: Record<MattressSizeName, string> = {
  single: 'Single (92cm x 188cm)',
  longSingle: 'Long Single (92cm x 203cm)',
  kingSingle: 'King Single (107cm x 203cm)',
  double: 'Double (138cm x 188cm)',
  queen: 'Queen (153cm x 203cm)',
  king: 'King (167cm x 203cm)',
  superKing: 'Super King (183cm x 203cm)',
  californiaKing: 'California King (203cm x 203cm)',
}

export const parameters = {
  mattressSizeName: {
    label: 'Mattress size',
    shortId: 'm',
    type: 'choice',
    options: mattressSizeOptions,
  },
  height: {
    label: 'Bed frame height',
    shortId: 'h',
    type: 'number',
    min: 4,
    max: 12,
  },
  overhangLength: {
    label: 'Overhang length',
    description: 'How many grid units should the length-wise beams overhang',
    shortId: 'o',
    type: 'number',
    min: 0,
    max: 6,
  },
  shouldIncludePanel: {
    label: 'Top panel',
    description: 'Should include panel on top',
    shortId: 'p',
    type: 'boolean',
  },
  shouldDoublePosts: {
    label: 'Double posts',
    description: 'Should the posts be doubled in width',
    shortId: 'd',
    type: 'boolean',
  },
  shouldUnderSide: {
    label: 'Underside',
    description: 'Should the side length-wise beams be underneath',
    shortId: 'u',
    type: 'boolean',
  },
} satisfies Params

const defaultPresetValues = {
  height: 8,
  mattressSizeName: 'queen',
  overhangLength: 3,
  shouldDoublePosts: false,
  shouldIncludePanel: true,
  shouldUnderSide: false,
}

export const presets: Presets<typeof parameters> = [
  {
    id: mattressSizeKeys[0] as string,
    label: camelCaseToTitleCase(mattressSizeKeys[0] as string),
    values: {
      ...defaultPresetValues,
      mattressSizeName: mattressSizeKeys[0] as string,
    },
  },
  ...mattressSizeKeys.slice(1).map((mattressSizeName) => ({
    id: mattressSizeName,
    label: camelCaseToTitleCase(mattressSizeName),
    values: {
      ...defaultPresetValues,
      mattressSizeName,
    },
  })),
]

export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const {
    mattressSizeName,
    height,
    shouldDoublePosts,
    overhangLength,
    shouldUnderSide,
    shouldIncludePanel,
  } = parameters

  const mattressSize = mattressSizes[mattressSizeName as MattressSizeName]
  const gridLengthInMm = 40
  const width = Math.ceil(mattressSize.width / gridLengthInMm)
  const length = Math.ceil(mattressSize.length / gridLengthInMm)

  const hasMiddleLengthwisePost = mattressSize.length > 1200
  const hasMiddleWidthwisePost = mattressSize.width > 1200
  const postsWidth = shouldDoublePosts ? 2 : 1

  return [
    shouldIncludePanel &&
      GridPanel.XY({
        x: [0, length],
        y: [0, width],
        z: height,
        holes: false,
      }),

    /* z-posts */
    createZPost({
      doublePlacement: 'start',
      height,
      shouldDoublePosts,
      x: 1 + overhangLength,
      y: 1,
    }),

    hasMiddleWidthwisePost &&
      createZPost({
        doublePlacement: 'middle',
        height,
        shouldDoublePosts,
        x: 1 + overhangLength,
        y: Math.floor(width / 2),
      }),

    createZPost({
      doublePlacement: 'end',
      height,
      shouldDoublePosts,
      x: 1 + overhangLength,
      y: width - 2,
    }),

    hasMiddleLengthwisePost && [
      createZPost({
        doublePlacement: 'start',
        height,
        shouldDoublePosts,
        x: Math.floor(length / 2),
        y: 1,
      }),

      hasMiddleWidthwisePost &&
        createZPost({
          doublePlacement: 'middle',
          height,
          shouldDoublePosts,
          x: Math.floor(length / 2),
          y: Math.floor(width / 2),
        }),

      createZPost({
        doublePlacement: 'end',
        height,
        shouldDoublePosts,
        x: Math.floor(length / 2),
        y: width - 2,
      }),
    ],

    createZPost({
      doublePlacement: 'start',
      height,
      shouldDoublePosts,
      x: length - 2 - overhangLength,
      y: 1,
    }),

    hasMiddleWidthwisePost &&
      createZPost({
        doublePlacement: 'middle',
        height,
        shouldDoublePosts,
        x: length - 2 - overhangLength,
        y: Math.floor(width / 2),
      }),

    createZPost({
      doublePlacement: 'end',
      height,
      shouldDoublePosts,
      x: length - 2 - overhangLength,
      y: width - 2,
    }),
    /* /z-posts */

    /* x-frames */
    createXFrame({
      height,
      length,
      y: 0,
    }),

    createXFrame({
      height,
      length,
      shouldUnderSide,
      y: 1 + postsWidth,
    }),

    hasMiddleWidthwisePost && [
      createXFrame({
        height,
        length,
        y: Math.floor(width / 2) - 1,
      }),
      createXFrame({
        height,
        length,
        y: Math.floor(width / 2) + postsWidth,
      }),
    ],

    createXFrame({
      height,
      length,
      y: width - 1,
    }),

    createXFrame({
      height,
      length,
      shouldUnderSide,
      y: width - 2 - postsWidth,
    }),

    // middle support x-frames
    hasMiddleWidthwisePost
      ? [
          createXFrame({
            height,
            length,
            y: Math.floor((1 / 4) * width) + 1,
          }),
          createXFrame({
            height,
            length,
            y: Math.floor((3 / 4) * width) - 1,
          }),
        ]
      : [
          createXFrame({
            height,
            length,
            y: Math.floor((1 / 3) * width) + 1,
          }),
          createXFrame({
            height,
            length,
            y: Math.floor((2 / 3) * width) - 1,
          }),
        ],
    /* /x-frames */

    /* y-frames */
    createYFrame({
      height,
      width,
      x: overhangLength,
    }),
    createYFrame({
      height,
      width,
      x: overhangLength + 2,
    }),

    hasMiddleLengthwisePost && [
      createYFrame({
        height,
        width,
        x: Math.floor(length / 2) - 1,
      }),
      createYFrame({
        height,
        width,
        x: Math.floor(length / 2) + 1,
      }),
    ],

    createYFrame({
      height,
      width,
      x: length - 1 - overhangLength,
    }),
    createYFrame({
      height,
      width,
      x: length - 3 - overhangLength,
    }),
    /* /y-frames */
  ]
}

interface ZPostOptions {
  x: number
  y: number
  height: number
  shouldDoublePosts: boolean
  doublePlacement: 'start' | 'middle' | 'end'
}
function createZPost(options: ZPostOptions): Parts {
  const { x, y, height, shouldDoublePosts, doublePlacement } = options

  return [
    GridBeam.Z({
      x,
      y,
      z: [0, height],
    }),

    shouldDoublePosts &&
      (doublePlacement === 'end'
        ? {
            type: 'gridbeam:z',
            x,
            y: y - 1,
            z: [0, height],
          }
        : {
            type: 'gridbeam:z',
            x,
            y: y + 1,
            z: [0, height],
          }),
  ]
}

interface XFrameOptions {
  y: number
  length: number
  height: number
  shouldUnderSide?: boolean
}

function createXFrame(options: XFrameOptions): Parts {
  const { y, length, height, shouldUnderSide = false } = options

  const z = shouldUnderSide ? height - 3 : height - 1

  return [
    GridBeam.X({
      x: [0, length],
      y,
      z,
    }),
  ]
}

interface YFrameOptions {
  x: number
  width: number
  height: number
}

function createYFrame(options: YFrameOptions): Parts {
  const { x, width, height } = options

  return [
    GridBeam.Y({
      x,
      y: [0, width],
      z: height - 2,
    }),
  ]
}

function camelCaseToTitleCase(text: string): string {
  const result = text.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}
