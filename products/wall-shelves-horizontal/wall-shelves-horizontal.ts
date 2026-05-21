import type { Params, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

export const parameters = {
  height: {
    label: 'Height',
    shortId: 'h',
    type: 'number',
    min: 10,
    max: 60,
    step: 5,
  },
  shelfPanelWidth: {
    label: 'Shelf panel width',
    shortId: 'spw',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  shelfPanelDepth: {
    label: 'Shelf panel depth',
    shortId: 'spd',
    type: 'number',
    min: 2,
    max: 5,
  },
  shelfBeamWidth: {
    label: 'Shelf beam width',
    shortId: 'sbw',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  postSpacing: {
    label: 'Post spacing',
    shortId: 'ps',
    type: 'number',
    min: 5,
    max: 15,
  },
  shelfSpacing: {
    label: 'Shelf spacing',
    shortId: 'ss',
    type: 'number',
    min: 4,
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
      height: 30,
      shelfPanelWidth: 30,
      shelfPanelDepth: 3,
      shelfBeamWidth: 20,
      postSpacing: 10,
      shelfSpacing: 6,
      initialShelfOffset: 3,
    },
  },
]

export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const {
    height,
    shelfPanelWidth,
    shelfPanelDepth,
    shelfBeamWidth,
    postSpacing,
    shelfSpacing,
    initialShelfOffset,
  } = parameters

  const numShelves = Math.ceil((height - initialShelfOffset - 2) / shelfSpacing)

  return [
    posts({ height, postSpacing }),
    range(numShelves).map((shelfIndex) =>
      shelf({
        postSpacing,
        shelfPanelWidth,
        shelfPanelDepth,
        shelfBeamWidth,
        z:
          shelfIndex === numShelves - 1
            ? height
            : 2 + initialShelfOffset + shelfIndex * shelfSpacing,
        alignment:
          shelfIndex === 0 || shelfIndex === numShelves - 1
            ? 'center'
            : shelfIndex % 2 === 1
              ? 'left'
              : 'right',
      }),
    ),
  ] satisfies Parts
}

type PostsOptions = {
  height: number
  postSpacing: number
}

function posts(options: PostsOptions): Parts {
  const { height, postSpacing } = options

  const leftPostX = -Math.floor((1 / 2) * postSpacing)
  const rightPostX = Math.ceil((1 / 2) * postSpacing)

  return [
    // left
    GridBeam.Z({
      x: leftPostX,
      y: 1,
      z: [0, height],
    }),
    // right
    GridBeam.Z({
      x: rightPostX,
      y: 1,
      z: [0, height],
    }),
  ]
}

type ShelfOptions = {
  postSpacing: number
  shelfPanelWidth: number
  shelfPanelDepth: number
  shelfBeamWidth: number
  z: number
  alignment: 'left' | 'center' | 'right'
}

function shelf(options: ShelfOptions): Parts {
  const { postSpacing, shelfPanelWidth, shelfPanelDepth, shelfBeamWidth, z, alignment } = options

  const leftPostX = -Math.floor((1 / 2) * postSpacing)
  const rightPostX = Math.ceil((1 / 2) * postSpacing)
  const leftPanelOverhang = Math.floor((1 / 2) * (shelfPanelWidth - shelfBeamWidth))
  const rightPanelOverhang = Math.ceil((1 / 2) * (shelfPanelWidth - shelfBeamWidth))

  const yBeams: Parts = [
    GridBeam.Y({
      x: leftPostX + 1,
      y: [0, 2],
      z: z - 2,
    }),
    GridBeam.Y({
      x: rightPostX - 1,
      y: [0, 2],
      z: z - 2,
    }),
  ]

  switch (alignment) {
    case 'center':
      return [
        yBeams,
        GridBeam.X({
          x: [-Math.floor((1 / 2) * shelfBeamWidth), Math.ceil((1 / 2) * shelfBeamWidth)],
          y: 0,
          z: z - 1,
        }),
        GridPanel.XY({
          x: [-Math.floor((1 / 2) * shelfPanelWidth), Math.ceil((1 / 2) * shelfPanelWidth)],
          y: [0, -shelfPanelDepth],
          z: z,
        }),
      ]
    case 'left':
      return [
        yBeams,
        GridBeam.X({
          x: [rightPostX, rightPostX - shelfBeamWidth],
          y: 0,
          z: z - 1,
        }),
        GridPanel.XY({
          x: [rightPostX + rightPanelOverhang, rightPostX + rightPanelOverhang - shelfPanelWidth],
          y: [0, -shelfPanelDepth],
          z: z,
        }),
      ]
    case 'right':
      return [
        yBeams,
        GridBeam.X({
          x: [leftPostX, leftPostX + shelfBeamWidth],
          y: 0,
          z: z - 1,
        }),
        GridPanel.XY({
          x: [leftPostX - leftPanelOverhang, leftPostX - leftPanelOverhang + shelfPanelWidth],
          y: [0, -shelfPanelDepth],
          z: z,
        }),
      ]
  }
}

function range(end: number) {
  return Array.from(Array(end).keys())
}
