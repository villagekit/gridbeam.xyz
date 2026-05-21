import type { Parts, Plugins } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

const backHeight = 12
const armHeight = 8
const seatHeight = 4
const chairDepth = 8
const chairWidth = 8

export const plugins: Plugins = ['smart-fasteners']

export const parts: Parts = [
  // front left z
  GridBeam.Z({
    x: 0,
    y: 0,
    z: [0, armHeight],
  }),
  // front right z
  GridBeam.Z({
    x: chairWidth - 1,
    y: 0,
    z: [0, armHeight],
  }),
  // back left z
  GridBeam.Z({
    x: 0,
    y: chairDepth - 1,
    z: [0, backHeight],
  }),
  // back right z
  GridBeam.Z({
    x: chairWidth - 1,
    y: chairDepth - 1,
    z: [0, backHeight],
  }),

  // bottom front x
  GridBeam.X({
    x: [0, chairWidth],
    y: 1,
    z: seatHeight - 2,
  }),
  // bottom back x
  GridBeam.X({
    x: [0, chairWidth],
    y: chairDepth - 2,
    z: seatHeight - 2,
  }),
  // top back x
  GridBeam.X({
    x: [0, chairWidth],
    y: chairDepth,
    z: backHeight - 1,
  }),
  // back panel
  GridPanel.XZ({
    x: [1, chairWidth - 1],
    y: chairDepth - 1,
    z: [backHeight - 2, backHeight + 1],
    fit: 'top',
  }),

  // bottom left y
  GridBeam.Y({
    x: 1,
    y: [0, chairDepth],
    z: seatHeight - 1,
  }),
  // bottom right y
  GridBeam.Y({
    x: chairWidth - 2,
    y: [0, chairDepth],
    z: seatHeight - 1,
  }),
  // seat panel
  GridPanel.XY({
    x: [1, chairWidth - 1],
    y: [0, chairDepth],
    z: seatHeight,
  }),

  // arm left y
  GridBeam.Y({
    x: -1,
    y: [0, chairDepth],
    z: armHeight - 1,
  }),
  // arm right y
  GridBeam.Y({
    x: chairWidth,
    y: [0, chairDepth],
    z: armHeight - 1,
  }),
]
