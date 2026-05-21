import type { Params, Part, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
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
    min: 10,
    max: 30,
    step: 10,
  },
  height: {
    label: 'Height',
    shortId: 'h',
    type: 'number',
    min: 8,
    max: 30,
  },
  shouldIncludePanels: {
    label: 'Top panels',
    description: 'Should include panels on top',
    shortId: 'p',
    type: 'boolean',
  },
  hasWidthwiseBottoms: {
    label: 'Width-wise bottoms',
    description: 'Should include width-wise bottom beams',
    shortId: 'bw',
    type: 'boolean',
  },
  hasDepthwiseBottoms: {
    label: 'Depth-wise bottoms',
    description: 'Should include depth-wise bottom beams',
    shortId: 'bd',
    type: 'boolean',
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'large',
    label: 'Large',
    values: {
      depth: 30,
      hasDepthwiseBottoms: false,
      hasWidthwiseBottoms: false,
      height: 20,
      shouldIncludePanels: true,
      width: 60,
    },
  },
  {
    id: 'large-tall',
    label: 'Large Tall',
    values: {
      depth: 30,
      hasDepthwiseBottoms: true,
      hasWidthwiseBottoms: true,
      height: 30,
      shouldIncludePanels: true,
      width: 60,
    },
  },
  {
    id: 'large-short',
    label: 'Large Short',
    values: {
      depth: 30,
      hasDepthwiseBottoms: false,
      hasWidthwiseBottoms: false,
      height: 10,
      shouldIncludePanels: true,
      width: 60,
    },
  },
  {
    id: 'medium',
    label: 'Medium',
    values: {
      depth: 30,
      hasDepthwiseBottoms: false,
      hasWidthwiseBottoms: false,
      height: 20,
      shouldIncludePanels: true,
      width: 30,
    },
  },
  {
    id: 'medium-tall',
    label: 'Medium Tall',
    values: {
      depth: 30,
      hasDepthwiseBottoms: true,
      hasWidthwiseBottoms: true,
      height: 30,
      shouldIncludePanels: true,
      width: 30,
    },
  },
  {
    id: 'medium-short',
    label: 'Medium Short',
    values: {
      depth: 30,
      hasDepthwiseBottoms: false,
      hasWidthwiseBottoms: false,
      height: 10,
      shouldIncludePanels: true,
      width: 30,
    },
  },
  {
    id: 'small',
    label: 'Small',
    values: {
      depth: 20,
      hasDepthwiseBottoms: false,
      hasWidthwiseBottoms: false,
      height: 20,
      shouldIncludePanels: true,
      width: 20,
    },
  },
  {
    id: 'small-tall',
    label: 'Small Tall',
    values: {
      depth: 20,
      hasDepthwiseBottoms: true,
      hasWidthwiseBottoms: true,
      height: 30,
      shouldIncludePanels: true,
      width: 20,
    },
  },
  {
    id: 'small-short',
    label: 'Small Short',
    values: {
      depth: 20,
      hasDepthwiseBottoms: false,
      hasWidthwiseBottoms: false,
      height: 10,
      shouldIncludePanels: true,
      width: 20,
    },
  },
]

export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { width, depth, height, hasWidthwiseBottoms, hasDepthwiseBottoms, shouldIncludePanels } =
    parameters

  const panelWidth = 10
  const numPanels = Math.floor(depth / panelWidth)

  const panelSupportsPer = 20
  const numPanelSupports = Math.ceil(width / panelSupportsPer) + 1
  const gridsPerPanelSupport = Math.floor(width / (numPanelSupports - 1))

  return [
    shouldIncludePanels &&
      range(numPanels).map((index: number): Part => {
        return GridPanel.XY({
          x: [0, width],
          y: [index * panelWidth, (index + 1) * panelWidth],
          z: height,
        })
      }),

    range(numPanelSupports - 1).map((index: number): Part => {
      const xOffset = index / numPanelSupports < 1 / 2 ? 1 : -1

      return GridBeam.Y({
        x: index * gridsPerPanelSupport + xOffset,
        y: [0, depth],
        z: height - 1,
      })
    }),
    GridBeam.Y({
      x: width - 1,
      y: [0, depth],
      z: height - 1,
    }),

    range(numPanelSupports - 1).map((index: number): Parts => {
      return [
        GridBeam.Z({
          x: index * gridsPerPanelSupport,
          y: 1,
          z: [0, height],
        }),
        GridBeam.Z({
          x: index * gridsPerPanelSupport,
          y: depth - 2,
          z: [0, height],
        }),
      ]
    }),
    GridBeam.Z({
      x: width - 2,
      y: 1,
      z: [0, height],
    }),
    GridBeam.Z({
      x: width - 2,
      y: depth - 2,
      z: [0, height],
    }),

    GridBeam.X({
      x: [0, width],
      y: 0,
      z: height - 2,
    }),
    GridBeam.X({
      x: [0, width],
      y: depth - 1,
      z: height - 2,
    }),

    hasDepthwiseBottoms && [
      range(numPanelSupports - 1).map((index: number): Part => {
        const xOffset = index / numPanelSupports < 1 / 2 ? 1 : -1

        return GridBeam.Y({
          x: index * gridsPerPanelSupport + xOffset,
          y: [0, depth],
          z: 1,
        })
      }),
      GridBeam.Y({
        x: width - 1,
        y: [0, depth],
        z: 1,
      }),

      !hasWidthwiseBottoms && [
        range(numPanelSupports - 1).map((index: number): Parts => {
          const xOffset = index / numPanelSupports < 1 / 2 ? 1 : -1

          return [
            GridBeam.X({
              x: [index * gridsPerPanelSupport, index * gridsPerPanelSupport + 2 * xOffset],
              y: 0,
              z: 2,
            }),
            GridBeam.X({
              x: [index * gridsPerPanelSupport, index * gridsPerPanelSupport + 2 * xOffset],
              y: depth - 1,
              z: 2,
            }),
          ]
        }),

        GridBeam.X({
          x: [width - 2, width],
          y: 0,
          z: 2,
        }),
        GridBeam.X({
          x: [width - 2, width],
          y: depth - 1,
          z: 2,
        }),
      ],
    ],

    hasWidthwiseBottoms && [
      GridBeam.X({
        x: [0, width],
        y: 0,
        z: 2,
      }),
      GridBeam.X({
        x: [0, width],
        y: depth - 1,
        z: 2,
      }),

      !hasDepthwiseBottoms && [
        range(numPanelSupports - 1).map((index: number): Parts => {
          const xOffset = index / numPanelSupports < 1 / 2 ? 1 : -1

          return [
            GridBeam.Y({
              x: index * gridsPerPanelSupport + xOffset,
              y: [0, 2],
              z: 1,
            }),
            GridBeam.Y({
              x: index * gridsPerPanelSupport + xOffset,
              y: [depth - 2, depth],
              z: 1,
            }),
          ]
        }),
        GridBeam.Y({
          x: width - 1,
          y: [0, 2],
          z: 1,
        }),
        GridBeam.Y({
          x: width - 1,
          y: [depth - 2, depth],
          z: 1,
        }),
      ],
    ],
  ] satisfies Parts
}

function range(end: number) {
  return Array.from(Array(end).keys())
}
