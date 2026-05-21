import type { Parts, Plugins } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

const castleHeight = 30
const castleWidth = 10
const castleDepth = 10
const shelfOverhang = castleWidth

export const plugins: Plugins = ['smart-fasteners']

export const parts: Parts = [
  posts(),
  level({ z: 2, beamX: [0, castleWidth], panelX: [0, castleWidth] }),
  level({ z: 11, beamX: [-shelfOverhang, castleWidth], panelX: [-shelfOverhang, 0] }),
  level({
    z: 20,
    beamX: [0, castleWidth + shelfOverhang],
    panelX: [0, castleWidth + shelfOverhang],
  }),
  level({ z: 29, beamX: [-shelfOverhang, castleWidth], panelX: [-shelfOverhang, castleWidth] }),
]

function posts(): Parts {
  return [
    GridBeam.Z({
      x: 0,
      y: 0,
      z: [0, castleHeight],
    }),
    GridBeam.Z({
      x: 0,
      y: castleDepth - 1,
      z: [0, castleHeight],
    }),
    GridBeam.Z({
      x: castleWidth - 1,
      y: 0,
      z: [0, castleHeight],
    }),
    GridBeam.Z({
      x: castleWidth - 1,
      y: castleDepth - 1,
      z: [0, castleHeight],
    }),
  ]
}

type LevelOptions = {
  beamX: [number, number]
  panelX: [number, number]
  z: number
}

function level(options: LevelOptions): Parts {
  const { beamX, panelX, z } = options

  return [
    GridBeam.Y({
      x: 1,
      y: [0, castleDepth],
      z: z - 1,
    }),
    GridBeam.Y({
      x: castleWidth - 2,
      y: [0, castleDepth],
      z: z - 1,
    }),
    GridBeam.X({
      x: beamX,
      y: 1,
      z,
    }),
    GridBeam.X({
      x: beamX,
      y: castleDepth - 2,
      z,
    }),
    GridPanel.XY({
      fit: 'bottom',
      x: panelX,
      y: [1, castleDepth - 1],
      z: z + 1,
    }),
  ]
}
