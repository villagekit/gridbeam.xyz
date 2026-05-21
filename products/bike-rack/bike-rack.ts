import type { Parts, Plugins } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'

export const plugins: Plugins = ['smart-fasteners']

export const parts: Parts = [
  GridBeam.Z({
    x: -1,
    y: 0,
    z: [0, 20],
  }),
  GridBeam.Z({
    x: 0,
    y: 0,
    z: [0, 5],
  }),
  GridBeam.Z({
    x: 1,
    y: 0,
    z: [0, 20],
  }),

  GridBeam.Z({
    x: -2,
    y: 0,
    z: [15, 45],
  }),
  GridBeam.Z({
    x: 0,
    y: 0,
    z: [15, 45],
  }),
  GridBeam.Z({
    x: 2,
    y: 0,
    z: [15, 45],
  }),
  GridBeam.X({
    x: [-1, 2],
    y: -1,
    z: 19,
  }),
  GridBeam.Y({
    x: -1,
    y: [0, -10],
    z: 20,
  }),
  GridBeam.Y({
    x: 1,
    y: [0, -10],
    z: 20,
  }),
  GridBeam.X({
    x: [-1, 2],
    y: -9,
    z: 21,
  }),

  GridBeam.Z({
    x: -1,
    y: 0,
    z: [33, 38],
  }),
  GridBeam.Z({
    x: 1,
    y: 0,
    z: [33, 38],
  }),
  GridBeam.X({
    x: [-1, 2],
    y: -1,
    z: 37,
  }),
  GridBeam.Y({
    x: -1,
    y: [0, -10],
    z: 38,
  }),
  GridBeam.Y({
    x: 1,
    y: [0, -10],
    z: 38,
  }),
  GridBeam.X({
    x: [-1, 2],
    y: -9,
    z: 39,
  }),

  GridBeam.Z({
    x: -1,
    y: 0,
    z: [40, 60],
  }),
  GridBeam.Z({
    x: 1,
    y: 0,
    z: [40, 60],
  }),
  GridBeam.X({
    x: [-1, 2],
    y: 1,
    z: 58,
  }),
  GridBeam.Y({
    x: 0,
    y: [-2, 3],
    z: 59,
  }),
]
