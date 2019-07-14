import React, { useMemo } from 'react'
import Regl, { Draw } from 'react-regl'
import csgToMesh from 'csg-to-mesh'
import { CSG } from '@jscad/csg'
import mat4 from 'gl-mat4'
// import normals from 'normals'

function GridBeamViewer ({ model }) {
  return (
    <Regl>
      <GridBeamModel model={model} />
    </Regl>
  )
}

function GridBeamModel ({ model }) {
  const mesh = useMemo(() => gridBeamModelToMesh(model), [model])

  return (
    <Draw
      vert={`
        precision mediump float;
        attribute vec3 position;
        uniform mat4 model, view, projection;
        void main() {
          gl_Position = projection * view * model * vec4(position, 1);
        }
      `}
      frag={`
        precision mediump float;
        void main() {
          gl_FragColor = vec4(1, 1, 1, 1);
        }
      `}
      elements={mesh.cells}
      attributes={{
        position: mesh.positions
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

function gridBeamModelToCsg () {
  return CSG.cube({ r: 10, fn: 20 })
}

function gridBeamModelToMesh (model) {
  const csg = gridBeamModelToCsg(model)
  return csgToMesh(csg)
}
