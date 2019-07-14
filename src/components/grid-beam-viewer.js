import React, { useMemo } from 'react'
import Regl, { Draw } from 'react-regl'
import csgToMesh from 'csg-to-mesh'
import csg, { CSG } from '@jscad/csg'
import mat4 from 'gl-mat4'
import meshNormals from 'angle-normals'

console.log('csg', csg)

const BEAM_WIDTH = 1

function GridBeamViewer ({ size, model }) {
  const { beams } = model
  if (size == null) {
    size = [window.innerWidth, window.innerHeight]
  }
  return (
    <Regl width={size[0]} height={size[1]} forceRedrawOnTick>
      <Beams beams={beams} />
    </Regl>
  )
}

function Beams ({ beams }) {
  const mesh = useMemo(() => beamsToMesh(beams), [beams])
  const normal = useMemo(() => meshNormals(mesh.cells, mesh.positions), [mesh])

  return (
    <Draw
      vert={`
        precision mediump float;
        uniform mat4 model, projection, view;
        attribute vec3 position, normal;
        varying vec3 vnormal;
        void main () {
          vnormal = normal;
          gl_Position = projection * view * model * vec4(position, 1.0);
        }
      `}
      frag={`
        precision mediump float;
        varying vec3 vnormal;
        void main() {
          gl_FragColor = vec4(abs(vnormal), 1.0);
        }
      `}
      elements={mesh.cells}
      attributes={{
        position: mesh.positions,
        normal
      }}
      uniforms={{
        model: mat4.identity([]),
        projection: ({ viewportWidth, viewportHeight }) => {
          return mat4.perspective(
            [],
            Math.PI / 4,
            viewportWidth / viewportHeight,
            0.01,
            1000
          )
        },
        view: ({ tick }) => {
          const t = 0.01 * tick
          return mat4.lookAt(
            [],
            [30 * Math.cos(t), 2.5, 30 * Math.sin(t)],
            [0, 2.5, 0],
            [0, 1, 0]
          )
        }
      }}
    />
  )
}

export default GridBeamViewer

function beamToCsg (beam) {
  const { direction, origin, length } = beam

  var radius = [BEAM_WIDTH, BEAM_WIDTH, BEAM_WIDTH]
  radius[directionToIndex(direction)] = BEAM_WIDTH * length

  return CSG.roundedCube({
    radius
  }).translate(origin)
}

function beamsToMesh (beams) {
  var csg
  beams.forEach(beam => {
    var nextCsg = beamToCsg(beam)
    if (csg === undefined) csg = nextCsg
    else csg = csg.union(nextCsg)
  })
  return csgToMesh(csg)
}

function directionToIndex (direction) {
  switch (direction) {
    case 'x':
      return 0
    case 'y':
      return 1
    case 'z':
      return 2
    default:
      throw new Error(`unexpected direction: ${direction}`)
  }
}
