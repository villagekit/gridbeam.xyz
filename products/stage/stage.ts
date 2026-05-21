import type { Params, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import { GridPanel } from '@villagekit/part-gridpanel/creator'

export const parameters = {
  unitSizeX: {
    label: 'Unit width',
    shortId: 'uw',
    type: 'number',
    min: 10,
    max: 60,
    step: 5,
  },
  unitSizeY: {
    label: 'Unit depth',
    shortId: 'ud',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  unitNumSupports: {
    label: 'Num supports',
    shortId: 'ns',
    type: 'number',
    min: 0,
    max: 10,
  },
  height: {
    label: 'Height',
    shortId: 'h',
    type: 'number',
    min: 4,
    max: 20,
  },
  numUnitsX: {
    label: 'Number of units wide',
    shortId: 'nuw',
    type: 'number',
    min: 1,
    max: 4,
  },
  numUnitsY: {
    label: 'Number of units deep',
    shortId: 'nud',
    type: 'number',
    min: 1,
    max: 4,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'default',
    label: 'Default',
    values: {
      numUnitsX: 2,
      numUnitsY: 2,
      unitSizeX: 30,
      unitSizeY: 20,
      unitNumSupports: 2,
      height: 5,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { numUnitsX, numUnitsY, unitSizeX, unitSizeY, unitNumSupports, height } = parameters

  return [
    range(numUnitsX).map(
      (xIndex): Parts => [
        range(numUnitsY).map(
          (yIndex): Parts => [
            createStageUnit({
              sizeX: unitSizeX,
              sizeY: unitSizeY,
              numSupports: unitNumSupports,
              height,
              offsetX: xIndex * unitSizeX,
              offsetY: yIndex * unitSizeY,
            }),
          ],
        ),
      ],
    ),
  ]
}

export const plugins: Plugins = ['smart-fasteners']

type StageUnitOptions = {
  sizeX: number
  sizeY: number
  numSupports: number
  height: number
  offsetX: number
  offsetY: number
}

function createStageUnit(options: StageUnitOptions): Parts {
  const { sizeX, sizeY, numSupports, height, offsetX, offsetY } = options

  const parts = [
    // left front beam z
    GridBeam.Z({ x: 1, y: 0, z: [0, height] }),
    // left back beam z
    GridBeam.Z({ x: sizeX - 2, y: 0, z: [0, height] }),
    // right front beam z
    GridBeam.Z({ x: 1, y: sizeY - 1, z: [0, height] }),
    // right front beam z
    GridBeam.Z({ x: sizeX - 2, y: sizeY - 1, z: [0, height] }),

    // front beam x
    GridBeam.X({ x: [0, sizeX], y: 1, z: height - 1 }),
    // back beam x
    GridBeam.X({ x: [0, sizeX], y: sizeY - 2, z: height - 1 }),

    // left beam y
    GridBeam.Y({ x: 0, y: [0, sizeY], z: height - 2 }),
    // right beam y
    GridBeam.Y({ x: sizeX - 1, y: [0, sizeY], z: height - 2 }),

    // supports
    range(numSupports).map((supportIndex) => {
      const supportOffsetMultiplier = 1 / (numSupports + 1)
      const supportOffset = Math.round(supportOffsetMultiplier * sizeY * (supportIndex + 1)) - 1
      return GridBeam.X({ x: [0, sizeX], y: supportOffset, z: height - 1 })
    }),

    // top panel
    GridPanel.XY({ x: [0, sizeX], y: [0, sizeY], z: height }),
  ] satisfies Parts

  return parts.map(function offsetPart(part): Parts {
    if (Array.isArray(part)) return part.map(offsetPart)
    // TODO do this better
    const gridLengthInMeters = 0.04
    return part.translate([offsetX * gridLengthInMeters, offsetY * gridLengthInMeters, 0])
  })
}

function range(end: number) {
  return Array.from(Array(end).keys())
}
