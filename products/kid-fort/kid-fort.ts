import type { Params, Parts, PartsFn, Presets } from '@villagekit/design/kit'
import { radToDeg } from '@villagekit/math'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import type { RotateOptions } from '@villagekit/part/creator'

export const parameters = {
  fortHeight: {
    label: 'Fort Height',
    shortId: 'fh',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  fortWidth: {
    label: 'Fort Width',
    shortId: 'fw',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  fortDepth: {
    label: 'Fort Depth',
    shortId: 'fd',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  supportSpacing: {
    label: 'Support Spacing',
    shortId: 'sp',
    type: 'number',
    min: 4,
    max: 12,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'default',
    label: 'Default',
    values: {
      fortHeight: 30,
      fortWidth: 30,
      fortDepth: 30,
      supportSpacing: 8,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { fortHeight, fortWidth, fortDepth, supportSpacing } = parameters

  const supportPosition = fortHeight - supportSpacing - 1

  const gridLength = 0.04

  const supportLength = fortHeight
  const supportAngle = calculateSupportAngle(supportLength, supportPosition)

  return [
    // front left z beam
    GridBeam.Z({
      x: 0,
      y: 0,
      z: [0, fortHeight],
    }),
    // front right z beam
    GridBeam.Z({
      x: fortWidth - 1,
      y: 0,
      z: [0, fortHeight],
    }),
    // back left z beam
    GridBeam.Z({
      x: 0,
      y: fortDepth - 1,
      z: [0, fortHeight],
    }),
    // back right z beam
    GridBeam.Z({
      x: fortWidth - 1,
      y: fortDepth - 1,
      z: [0, fortHeight],
    }),
    // front x beam
    GridBeam.X({
      x: [0, fortWidth],
      y: 1,
      z: fortHeight - 1,
    }),
    // back x beam
    GridBeam.X({
      x: [0, fortWidth],
      y: fortDepth - 2,
      z: fortHeight - 1,
    }),
    // left y beam
    GridBeam.Y({
      x: 1,
      y: [0, fortDepth],
      z: fortHeight - 2,
    }),
    // right y beam
    GridBeam.Y({
      x: fortWidth - 2,
      y: [0, fortDepth],
      z: fortHeight - 2,
    }),

    // left supports
    rotateGroup(
      [
        GridBeam.X({
          x: [1 - supportLength, 1],
          y: 1,
          z: supportPosition,
        }),
        GridBeam.X({
          x: [1 - supportLength, 1],
          y: fortDepth - 2,
          z: supportPosition,
        }),
        GridBeam.Y({
          x: 4 - supportLength,
          y: [0, fortDepth],
          z: supportPosition + 1,
        }),
      ],
      {
        direction: [0, 1, 0],
        angle: -supportAngle,
        origin: [0, 0, supportPosition * gridLength],
      },
    ),

    // left supports
    rotateGroup(
      [
        GridBeam.X({
          x: [fortWidth - 1, fortWidth - 1 + supportLength],
          y: 1,
          z: supportPosition,
        }),
        GridBeam.X({
          x: [fortWidth - 1, fortWidth - 1 + supportLength],
          y: fortDepth - 2,
          z: supportPosition,
        }),
        GridBeam.Y({
          x: fortWidth - 1 + supportLength - 4,
          y: [0, fortDepth],
          z: supportPosition + 1,
        }),
      ],
      {
        direction: [0, 1, 0],
        angle: supportAngle,
        origin: [(fortWidth - 1) * gridLength, 0, supportPosition * gridLength],
      },
    ),
  ] satisfies Parts
}

function calculateSupportAngle(supportLength: number, supportPosition: number) {
  // We calculate the support angle by using your childhood favorite: SOHCAHTOA.
  //
  // First create a right triangle with what you know:
  //   opposite = (H + 0.5)gu
  //   hypotenuse = (L - 0.5)gu
  //
  // So:
  //   cos(theta) = (H + 0.5)gu / (L - 0.5)gu
  //   theta = acos((H + 0.5) / (L - 0.5))
  //
  // And then the angle we want is actually 90 - theta.

  const height = supportPosition + 0.5
  const length = supportLength - 0.5
  const rads = Math.acos(height / length)
  return 90 - radToDeg(rads)
}

function rotateGroup(parts: Array<GridBeam>, rotation: RotateOptions) {
  return parts.map((part) => part.rotate(rotation))
}
