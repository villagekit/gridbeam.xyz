import type { Params, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

export const parameters = {
  treeHeight: {
    label: 'Tree height',
    shortId: 'th',
    type: 'number',
    min: 20,
    max: 60,
    step: 10,
  },
  branchSpacing: {
    label: 'Branch spacing',
    shortId: 'bs',
    type: 'number',
    min: 1,
    max: 10,
  },
  leafLength: {
    label: 'Leaf length',
    shortId: 'll',
    type: 'number',
    min: 5,
    max: 20,
    step: 5,
  },
  leafWidth: {
    label: 'Leaf width',
    shortId: 'lw',
    type: 'number',
    min: 4,
    max: 20,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'regular',
    label: 'Regular',
    values: {
      treeHeight: 30,
      branchSpacing: 3,
      leafLength: 10,
      leafWidth: 8,
    },
  },
]

export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { treeHeight, branchSpacing, leafLength, leafWidth } = parameters

  const numBranches = Math.floor((treeHeight - 2) / branchSpacing) - 1

  return [
    posts({ treeHeight }),
    base({ leafLength, leafWidth }),
    Array.from(Array(numBranches).keys()).map((branchIndex) =>
      branch({ branchIndex, branchSpacing, leafLength, leafWidth }),
    ),
    top({ treeHeight, leafLength, leafWidth }),
  ] satisfies Parts
}

type PostOptions = {
  treeHeight: number
}

function posts(options: PostOptions): Parts {
  const { treeHeight } = options

  return [
    GridBeam.Z({
      x: -1,
      y: -1,
      z: [0, treeHeight],
    }),
    GridBeam.Z({
      x: 1,
      y: -1,
      z: [0, treeHeight],
    }),
    GridBeam.Z({
      x: -1,
      y: 1,
      z: [0, treeHeight],
    }),
    GridBeam.Z({
      x: 1,
      y: 1,
      z: [0, treeHeight],
    }),
  ]
}

type BaseOptions = {
  leafLength: number
  leafWidth: number
}

function base(options: BaseOptions): Parts {
  const { leafLength, leafWidth } = options

  const baseLength = Math.ceil((leafLength + 3) / 5) * 5

  return [
    GridBeam.Y({
      x: 0,
      y: [-Math.floor((1 / 2) * baseLength), Math.ceil((1 / 2) * baseLength)],
      z: 0,
    }),
    GridPanel.XY({
      x: [-Math.floor((1 / 2) * leafWidth), Math.ceil((1 / 2) * leafWidth)],
      y: [-2, -2 - leafLength],
      z: 1,
    }),

    GridBeam.X({
      x: [-Math.floor((1 / 2) * baseLength), Math.ceil((1 / 2) * baseLength)],
      y: 0,
      z: 1,
    }),

    GridBeam.Y({
      x: -Math.floor((1 / 2) * baseLength),
      y: [-2, 3],
      z: 0,
    }),
    GridBeam.Z({
      x: -Math.floor((1 / 2) * baseLength) + 1,
      y: 1,
      z: [0, 2],
    }),
    GridPanel.XY({
      x: [-2, -2 - leafLength],
      y: [-Math.floor((1 / 2) * leafWidth) + 1, Math.ceil((1 / 2) * leafWidth) + 1],
      z: 2,
    }),

    GridBeam.Y({
      x: Math.ceil((1 / 2) * baseLength) - 1,
      y: [-2, 3],
      z: 0,
    }),
    GridBeam.Z({
      x: Math.floor((1 / 2) * baseLength) - 1,
      y: 1,
      z: [0, 2],
    }),
  ]
}

type BranchOptions = {
  branchIndex: number
  branchSpacing: number
  leafLength: number
  leafWidth: number
}

function branch(options: BranchOptions): Parts {
  const { branchIndex, branchSpacing, leafLength, leafWidth } = options

  const branchLength = leafLength
  const branchZ = 1 + (branchIndex + 1) * branchSpacing
  const leafNudge = Math.floor((branchIndex + 2) / 4) % 2 === 0 ? 1 : 0

  switch (branchIndex % 4) {
    case 0:
      return [
        GridBeam.Y({
          x: 0,
          y: [-1, -1 + branchLength],
          z: branchZ,
        }),
        GridPanel.XY({
          x: [
            -Math.floor((1 / 2) * leafWidth) + leafNudge,
            Math.ceil((1 / 2) * leafWidth) + leafNudge,
          ],
          y: [2, 2 + leafLength],
          z: branchZ + 1,
        }),
      ]
    case 1:
      return [
        GridBeam.X({
          x: [-1, -1 + branchLength],
          y: 0,
          z: branchZ,
        }),
        GridPanel.XY({
          x: [2, 2 + leafLength],
          y: [
            -Math.floor((1 / 2) * leafWidth) - leafNudge + 1,
            Math.ceil((1 / 2) * leafWidth) - leafNudge + 1,
          ],
          z: branchZ + 1,
        }),
      ]
    case 2:
      return [
        GridBeam.Y({
          x: 0,
          y: [1, 1 - leafLength],
          z: branchZ,
        }),
        GridPanel.XY({
          x: [
            -Math.floor((1 / 2) * leafWidth) - leafNudge + 1,
            Math.ceil((1 / 2) * leafWidth) - leafNudge + 1,
          ],
          y: [-2, -2 - leafLength],
          z: branchZ + 1,
        }),
      ]
    case 3:
      return [
        GridBeam.X({
          x: [1, 1 - branchLength],
          y: 0,
          z: branchZ,
        }),
        GridPanel.XY({
          x: [-2, -2 - leafLength],
          y: [
            -Math.floor((1 / 2) * leafWidth) + leafNudge,
            Math.ceil((1 / 2) * leafWidth) + leafNudge,
          ],
          z: branchZ + 1,
        }),
      ]
    default:
      return []
  }
}

type TopOptions = {
  treeHeight: number
  leafLength: number
  leafWidth: number
}

function top(options: TopOptions): Parts {
  const { treeHeight, leafLength, leafWidth } = options

  return [
    GridBeam.X({
      x: [-Math.floor((1 / 2) * leafLength), Math.ceil((1 / 2) * leafLength)],
      y: 0,
      z: treeHeight - 1,
    }),
    GridPanel.XY({
      x: [-Math.floor((1 / 2) * leafLength), Math.ceil((1 / 2) * leafLength)],
      y: [-Math.floor((1 / 2) * leafWidth) + 1, Math.ceil((1 / 2) * leafWidth) + 1],
      z: treeHeight,
    }),
  ]
}
