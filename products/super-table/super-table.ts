import type { Params, Part, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

export const parameters = {
  width: {
    label: 'Width',
    shortId: 'w',
    type: 'number',
    min: 20,
    max: 60,
    step: 5,
  },
  depth: {
    label: 'Depth',
    shortId: 'd',
    type: 'number',
    min: 20,
    max: 60,
    step: 5,
  },
  height: {
    label: 'Height',
    shortId: 'h',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  overhangWidth: {
    label: 'Overhang width',
    description: 'How many grid units should the width-wise beams overhang',
    shortId: 'ol',
    type: 'number',
    min: 0,
    max: 6,
  },
  shouldIncludePanels: {
    label: 'Top panels',
    description: 'Should include panels on top',
    shortId: 'p',
    type: 'boolean',
  },
  shouldDoublePosts: {
    label: 'Double posts',
    description: 'Should the posts be doubled in depth',
    shortId: 'dp',
    type: 'boolean',
  },
  shouldUnderSide: {
    label: 'Underside',
    description: 'Should the side width-wise beams be underneath',
    shortId: 'u',
    type: 'boolean',
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'large',
    label: 'Large',
    values: {
      depth: 30,
      height: 20,
      overhangWidth: 2,
      shouldDoublePosts: true,
      shouldIncludePanels: true,
      shouldUnderSide: false,
      width: 60,
    },
  },
  {
    id: 'large-tall',
    label: 'Large Tall',
    values: {
      depth: 30,
      height: 30,
      overhangWidth: 2,
      shouldDoublePosts: true,
      shouldIncludePanels: true,
      shouldUnderSide: false,
      width: 60,
    },
  },
  {
    id: 'large-short',
    label: 'Large Short',
    values: {
      depth: 30,
      height: 10,
      overhangWidth: 2,
      shouldDoublePosts: false,
      shouldIncludePanels: true,
      shouldUnderSide: false,
      width: 60,
    },
  },
  {
    id: 'medium',
    label: 'Medium',
    values: {
      depth: 30,
      height: 20,
      overhangWidth: 2,
      shouldDoublePosts: true,
      shouldIncludePanels: true,
      shouldUnderSide: false,
      width: 30,
    },
  },
  {
    id: 'medium-tall',
    label: 'Medium Tall',
    values: {
      depth: 30,
      height: 30,
      overhangWidth: 2,
      shouldDoublePosts: true,
      shouldIncludePanels: true,
      shouldUnderSide: false,
      width: 30,
    },
  },
  {
    id: 'medium-short',
    label: 'Medium Short',
    values: {
      depth: 30,
      height: 10,
      overhangWidth: 2,
      shouldDoublePosts: false,
      shouldIncludePanels: true,
      shouldUnderSide: false,
      width: 30,
    },
  },
  {
    id: 'small',
    label: 'Small',
    values: {
      depth: 20,
      height: 20,
      overhangWidth: 2,
      shouldDoublePosts: true,
      shouldIncludePanels: true,
      shouldUnderSide: false,
      width: 20,
    },
  },
  {
    id: 'small-tall',
    label: 'Small Tall',
    values: {
      depth: 20,
      height: 30,
      overhangWidth: 2,
      shouldDoublePosts: true,
      shouldIncludePanels: true,
      shouldUnderSide: false,
      width: 20,
    },
  },
  {
    id: 'small-short',
    label: 'Small Short',
    values: {
      depth: 20,
      height: 10,
      overhangWidth: 2,
      shouldDoublePosts: false,
      shouldIncludePanels: true,
      shouldUnderSide: false,
      width: 20,
    },
  },
]

export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const {
    width,
    depth,
    height,
    shouldDoublePosts,
    overhangWidth,
    shouldUnderSide,
    shouldIncludePanels,
  } = parameters

  const hasMiddleWidthwisePost = width > 30
  const hasMiddleDepthwisePost = depth > 30
  const postsDepth = shouldDoublePosts ? 2 : 1

  return [
    shouldIncludePanels &&
      createPanelsX({
        panel: {
          y: [0, depth],
          z: height,
        },
        width,
      }),

    /* z-posts */
    createZPost({
      doublePlacement: 'start',
      height,
      shouldDoublePosts,
      x: 1 + overhangWidth,
      y: 1,
    }),

    hasMiddleDepthwisePost &&
      createZPost({
        doublePlacement: 'middle',
        height,
        shouldDoublePosts,
        x: 1 + overhangWidth,
        y: Math.floor(depth / 2),
      }),

    createZPost({
      doublePlacement: 'end',
      height,
      shouldDoublePosts,
      x: 1 + overhangWidth,
      y: depth - 2,
    }),

    hasMiddleWidthwisePost && [
      createZPost({
        doublePlacement: 'start',
        height,
        shouldDoublePosts,
        x: Math.floor(width / 2),
        y: 1,
      }),

      hasMiddleDepthwisePost &&
        createZPost({
          doublePlacement: 'middle',
          height,
          shouldDoublePosts,
          x: Math.floor(width / 2),
          y: Math.floor(depth / 2),
        }),

      createZPost({
        doublePlacement: 'end',
        height,
        shouldDoublePosts,
        x: Math.floor(width / 2),
        y: depth - 2,
      }),
    ],

    createZPost({
      doublePlacement: 'start',
      height,
      shouldDoublePosts,
      x: width - 2 - overhangWidth,
      y: 1,
    }),

    hasMiddleDepthwisePost &&
      createZPost({
        doublePlacement: 'middle',
        height,
        shouldDoublePosts,
        x: width - 2 - overhangWidth,
        y: Math.floor(depth / 2),
      }),

    createZPost({
      doublePlacement: 'end',
      height,
      shouldDoublePosts,
      x: width - 2 - overhangWidth,
      y: depth - 2,
    }),
    /* /z-posts */

    /* x-frames */
    createXFrame({
      height,
      width,
      y: 0,
    }),
    createXFrame({
      height,
      shouldUnderSide,
      width,
      y: 1 + postsDepth,
    }),

    hasMiddleDepthwisePost && [
      createXFrame({
        height,
        width,
        y: Math.floor(depth / 2) - 1,
      }),
      createXFrame({
        height,
        width,
        y: Math.floor(depth / 2) + postsDepth,
      }),
    ],

    createXFrame({
      height,
      width,
      y: depth - 1,
    }),

    createXFrame({
      height,
      shouldUnderSide,
      width,
      y: depth - 2 - postsDepth,
    }),

    // middle support x-frames
    hasMiddleDepthwisePost
      ? [
          createXFrame({
            height,
            width,
            y: Math.floor((1 / 4) * depth) + 1,
          }),
          createXFrame({
            height,
            width,
            y: Math.floor((3 / 4) * depth) - 1,
          }),
        ]
      : [
          createXFrame({
            height,
            width,
            y: Math.floor((1 / 2) * depth),
          }),
        ],
    /* /x-frames */

    /* y-frames */
    createYFrame({
      depth,
      height,
      x: overhangWidth,
    }),
    createYFrame({
      depth,
      height,
      x: overhangWidth + 2,
    }),

    hasMiddleWidthwisePost && [
      createYFrame({
        depth,
        height,
        x: Math.floor(width / 2) - 1,
      }),
      createYFrame({
        depth,
        height,
        x: Math.floor(width / 2) + 1,
      }),
    ],

    createYFrame({
      depth,
      height,
      x: width - 1 - overhangWidth,
    }),
    createYFrame({
      depth,
      height,
      x: width - 3 - overhangWidth,
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

    shouldDoublePosts && [
      doublePlacement === 'end'
        ? GridBeam.Z({
            x,
            y: y - 1,
            z: [0, height],
          })
        : GridBeam.Z({
            x,
            y: y + 1,
            z: [0, height],
          }),
    ],
  ]
}

interface XFrameOptions {
  y: number
  width: number
  height: number
  shouldUnderSide?: boolean
}

function createXFrame(options: XFrameOptions): Parts {
  const { y, width, height, shouldUnderSide = false } = options

  const z = shouldUnderSide ? height - 3 : height - 1

  return [
    GridBeam.X({
      x: [0, width],
      y,
      z,
    }),
  ]
}

interface YFrameOptions {
  x: number
  depth: number
  height: number
}

function createYFrame(options: YFrameOptions): Parts {
  const { x, depth, height } = options

  return [
    GridBeam.Y({
      x,
      y: [0, depth],
      z: height - 2,
    }),
  ]
}

interface CreatePanelsXOptions {
  width: number
  panel: {
    y: [number, number]
    z: number
  }
}

function createPanelsX(options: CreatePanelsXOptions): Parts {
  const { width, panel } = options

  const numTenPanels = Math.floor(width / 10)
  const numFivePanels = Math.floor((width % 10) / 5)

  return [
    range(numTenPanels).map((tenPanelIndex): Part => {
      const x: [number, number] = [10 * tenPanelIndex, 10 * (tenPanelIndex + 1)]

      return GridPanel.XY({ x, ...panel })
    }),
    range(numTenPanels * 2, numTenPanels * 2 + numFivePanels).map((fivePanelIndex): Part => {
      const x: [number, number] = [5 * fivePanelIndex, 5 * (fivePanelIndex + 1)]

      return GridPanel.XY({ x, ...panel })
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
