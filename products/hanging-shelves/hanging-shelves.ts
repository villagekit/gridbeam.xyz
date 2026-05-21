import type { Parts, Plugins } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

const panelShortY: [number, number] = [-2, 3]
const panelLongY: [number, number] = [-7, 8]

export const plugins: Plugins = ['smart-fasteners']

export const parts: Parts = [
  post({
    x: 0,
    footSide: 'right',
  }),
  post({
    x: 15,
    footSide: 'right',
  }),
  post({
    x: 29,
    footSide: 'left',
  }),
  post({
    x: 44,
    footSide: 'left',
  }),

  // first row
  GridBeam.X({
    x: [15, 45],
    y: 1,
    z: 10,
  }),
  GridBeam.X({
    x: [15, 45],
    y: -1,
    z: 10,
  }),
  GridPanel.XY({
    x: [16, 29],
    y: panelShortY,
    z: 11,
  }),
  GridPanel.XY({
    x: [30, 44],
    y: panelShortY,
    z: 11,
  }),

  // second row
  GridBeam.X({
    x: [0, 30],
    y: 1,
    z: 18,
  }),
  GridBeam.X({
    x: [0, 30],
    y: -1,
    z: 18,
  }),
  GridPanel.XY({
    x: [1, 15],
    y: panelLongY,
    z: 19,
  }),
  GridPanel.XY({
    x: [16, 29],
    y: panelShortY,
    z: 19,
  }),

  // third row
  GridBeam.X({
    x: [15, 45],
    y: 1,
    z: 26,
  }),
  GridBeam.X({
    x: [15, 45],
    y: -1,
    z: 26,
  }),
  GridPanel.XY({
    x: [16, 29],
    y: panelShortY,
    z: 27,
  }),
  GridPanel.XY({
    x: [30, 44],
    y: panelShortY,
    z: 27,
  }),

  // fourth row
  GridBeam.X({
    x: [15, 30],
    y: 1,
    z: 34,
  }),
  GridBeam.X({
    x: [15, 30],
    y: -1,
    z: 34,
  }),
  GridPanel.XY({
    x: [16, 29],
    y: panelShortY,
    z: 35,
  }),

  // fifth row
  GridBeam.X({
    x: [0, 30],
    y: 1,
    z: 42,
  }),
  GridBeam.X({
    x: [0, 30],
    y: -1,
    z: 42,
  }),
  GridPanel.XY({
    x: [1, 15],
    y: panelShortY,
    z: 43,
  }),
  GridPanel.XY({
    x: [16, 29],
    y: panelShortY,
    z: 43,
  }),

  // sixth row
  GridBeam.X({
    x: [0, 30],
    y: -1,
    z: 50,
  }),
  GridBeam.X({
    x: [15, 45],
    y: 1,
    z: 50,
  }),
  GridPanel.XY({
    x: [1, 15],
    y: panelShortY,
    z: 51,
  }),
  GridPanel.XY({
    x: [16, 29],
    y: panelShortY,
    z: 51,
  }),
  GridPanel.XY({
    x: [30, 44],
    y: panelShortY,
    z: 51,
  }),
]

type PostOptions = {
  x: number
  footSide: 'right' | 'left'
}

function post(options: PostOptions): Parts {
  const { x, footSide } = options

  return [
    // bottom post
    GridBeam.Z({
      x,
      y: 0,
      z: [0, 30],
    }),
    // top post
    GridBeam.Z({
      x,
      y: 0,
      z: [30, 60],
    }),
    // post joiner
    GridBeam.Z({
      x,
      y: 1,
      z: [28, 33],
    }),

    // bottom feet
    GridBeam.X({
      x: footSide === 'right' ? [x, x + 2] : [x - 1, x + 1],
      y: 1,
      z: 1,
    }),
    GridBeam.Y({
      x: footSide === 'right' ? x + 1 : x - 1,
      y: [-2, 4],
      z: 0,
    }),

    // top extension
    GridBeam.Z({
      x,
      y: 1,
      z: [58, 63],
    }),

    // top feet
    GridBeam.X({
      x: footSide === 'right' ? [x, x + 2] : [x - 1, x + 1],
      y: 0,
      z: 61,
    }),
    GridBeam.Y({
      x: footSide === 'right' ? x + 1 : x - 1,
      y: [-2, 4],
      z: 62,
    }),
  ]
}
