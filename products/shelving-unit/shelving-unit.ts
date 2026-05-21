import type { Params, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

export const parameters = {
  width: {
    label: 'Width',
    shortId: 'w',
    type: 'number',
    min: 10,
    max: 60,
    step: 5,
  },
  depth: {
    label: 'Depth',
    shortId: 'd',
    type: 'number',
    min: 5,
    max: 20,
    step: 5,
  },
  height: {
    label: 'Height',
    shortId: 'h',
    type: 'number',
    min: 5,
    max: 60,
  },
  shelfSpacing: {
    label: 'Shelf spacing',
    shortId: 'ss',
    type: 'number',
    min: 3,
    max: 15,
  },
  initialShelfOffset: {
    label: 'Initial shelf offset',
    shortId: 'iso',
    type: 'number',
    min: 0,
    max: 10,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'default',
    label: 'Default',
    values: {
      width: 30,
      depth: 10,
      height: 30,
      shelfSpacing: 7,
      initialShelfOffset: 0,
    },
  },
]

export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { width, depth, height, shelfSpacing, initialShelfOffset } = parameters

  const numShelves = Math.floor((height - initialShelfOffset - 2) / shelfSpacing) + 1

  return [
    posts({ width, depth, height }),
    range(numShelves - 1).map((shelfIndex) =>
      shelf({
        width,
        depth,
        z: 2 + initialShelfOffset + shelfIndex * shelfSpacing,
      }),
    ),
    shelf({ width, depth, z: height }),
  ] satisfies Parts
}

type PostsOptions = {
  width: number
  depth: number
  height: number
}

function posts(options: PostsOptions): Parts {
  const { width, depth, height } = options

  return [
    // front left
    GridBeam.Z({
      x: 0,
      y: 0,
      z: [0, height],
    }),
    // front right
    GridBeam.Z({
      x: width - 1,
      y: 0,
      z: [0, height],
    }),
    // back left
    GridBeam.Z({
      x: 0,
      y: depth - 1,
      z: [0, height],
    }),
    // back right
    GridBeam.Z({
      x: width - 1,
      y: depth - 1,
      z: [0, height],
    }),

    // supports
    mapSupports({ width }, ({ postSupportOffset }) => [
      GridBeam.Z({
        x: postSupportOffset,
        y: 0,
        z: [0, height],
      }),
      GridBeam.Z({
        x: postSupportOffset,
        y: depth - 1,
        z: [0, height],
      }),
    ]),
  ]
}

type ShelfOptions = {
  width: number
  depth: number
  z: number
}

function shelf(options: ShelfOptions): Parts {
  const { width, depth, z } = options

  return [
    // left y
    GridBeam.Y({
      x: 1,
      y: [0, depth],
      z: z - 2,
    }),
    // right y
    GridBeam.Y({
      x: width - 2,
      y: [0, depth],
      z: z - 2,
    }),
    // front x
    GridBeam.X({
      x: [0, width],
      y: 1,
      z: z - 1,
    }),
    // back x
    GridBeam.X({
      x: [0, width],
      y: depth - 2,
      z: z - 1,
    }),
    // panel
    GridPanel.XY({
      x: [0, width],
      y: [1, depth - 1],
      z: z,
    }),

    mapSupports({ width }, ({ postSupportOffset, postZSupportXNudge }) => [
      GridBeam.Y({
        x: postSupportOffset + postZSupportXNudge,
        y: [0, depth],
        z: z - 2,
      }),
    ]),
  ]
}

type MapSupportsOptions = {
  width: number
}

type MapSupportsValue = {
  postSupportOffset: number
  postZSupportXNudge: number
}

function mapSupports(options: MapSupportsOptions, fn: (value: MapSupportsValue) => Parts): Parts {
  const { width } = options

  // 0-30 => 0, 31-45 => 1, 46-60 => 2
  const numPostSupports = Math.max(Math.ceil((width - 30) / 15), 0)

  return range(numPostSupports).map((postSupportIndex) => {
    const postSupportOffsetMultiplier = 1 / (numPostSupports + 1)
    const postSupportOffset =
      Math.round(postSupportOffsetMultiplier * width * (postSupportIndex + 1)) - 1
    // nudge z posts towards the middle
    const postZSupportXNudge = postSupportIndex >= Math.floor(numPostSupports / 2) ? -1 : 1

    return fn({ postSupportOffset, postZSupportXNudge })
  })
}

function range(end: number) {
  return Array.from(Array(end).keys())
}
