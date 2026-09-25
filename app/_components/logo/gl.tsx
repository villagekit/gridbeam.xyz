// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/logo/gl.tsx
import { ResizeObserver } from '@juggle/resize-observer'
import { RoundedBox } from '@react-three/drei'
import { Canvas, type RootState, useFrame, useThree } from '@react-three/fiber'
import { Box, type BoxProps, useChakraContext } from '@villagekit/ui'
import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Box3,
  CircleGeometry,
  Color,
  type Group,
  InstancedMesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  Vector3,
} from 'three'

Object3D.DEFAULT_UP = new Vector3(0, 0, 1)

export interface LogoGlProps extends BoxProps {
  size: BoxProps['width']
}

export function LogoGl(props: LogoGlProps) {
  const { size } = props

  const { token } = useChakraContext()
  const colors: LogoMeshProps['colors'] = useMemo(() => {
    return [token('colors.cyan.400'), token('colors.pink.400'), token('colors.yellow.400')]
  }, [token])

  const onCanvasCreated = useCallback((state: RootState) => {
    // disable events
    state.setEvents({ enabled: false })
  }, [])

  return (
    <Box role="img" aria-label="Grid Beam logo" width={size} height={size} {...props}>
      <Canvas orthographic resize={{ polyfill: ResizeObserver }} onCreated={onCanvasCreated}>
        <LogoMesh colors={colors} />
      </Canvas>
    </Box>
  )
}

type ColorType = Parameters<InstanceType<typeof Color>['set']>[0]

interface LogoMeshProps {
  colors: [ColorType, ColorType, ColorType]
}

function LogoMesh(props: LogoMeshProps) {
  const { colors } = props

  const ref = useRef<Group>(null)
  const {
    camera,
    size: { width, height },
  } = useThree()

  useEffect(() => {
    if (ref.current == null) return

    ref.current.rotation.y = (1 / 4) * Math.PI
    ref.current.rotation.z = (1 / 4) * Math.PI
  }, [])

  useEffect(() => {
    if (ref.current == null) return
    const aabb = new Box3().setFromObject(ref.current)
    const maxZoom = Math.min(width / (aabb.max.x - aabb.min.x), height / (aabb.max.y - aabb.min.y))
    camera.zoom = 0.95 * maxZoom
    camera.updateProjectionMatrix()
  }, [camera, width, height])

  useFrame((_, delta) => {
    if (ref.current == null) return
    ref.current.rotation.x += delta / Math.PI
  })

  return (
    <group ref={ref}>
      <Cube colors={colors} />
      <Holes />
    </group>
  )
}

const CUBE_RADIUS = 0.05

interface CubeProps {
  colors: [ColorType, ColorType, ColorType]
}

const Cube = memo(function Cube(props: CubeProps) {
  const { colors } = props

  const planeGeometry = useMemo(() => {
    return new PlaneGeometry(1 - 2 * CUBE_RADIUS, 1 - 2 * CUBE_RADIUS)
  }, [])

  const planeMaterial = useMemo(() => {
    return new MeshBasicMaterial()
  }, [])

  const planeMesh = useMemo(() => {
    const m = new InstancedMesh(planeGeometry, planeMaterial, 6)
    const color = new Color()
    const dummy = new Object3D()

    // cyan
    color.set(colors[0])

    dummy.rotation.set((3 / 2) * Math.PI, 0, 0)
    dummy.position.set(0, 0.5 + 1e-3, 0)
    dummy.updateMatrix()
    m.setMatrixAt(0, dummy.matrix)
    m.setColorAt(0, color)

    dummy.rotation.set((1 / 2) * Math.PI, 0, 0)
    dummy.position.set(0, -(0.5 + 1e-3), 0)
    dummy.updateMatrix()
    m.setMatrixAt(1, dummy.matrix)
    m.setColorAt(1, color)

    // pink
    color.set(colors[1])

    dummy.rotation.set(0, 0, 0)
    dummy.position.set(0, 0, 0.5 + 1e-3)
    dummy.updateMatrix()
    m.setMatrixAt(2, dummy.matrix)
    m.setColorAt(2, color)

    dummy.rotation.set(Math.PI, 0, 0)
    dummy.position.set(0, 0, -(0.5 + 1e-3))
    dummy.updateMatrix()
    m.setMatrixAt(3, dummy.matrix)
    m.setColorAt(3, color)

    // yellow
    color.set(colors[2])

    dummy.rotation.set(0, (1 / 2) * Math.PI, 0)
    dummy.position.set(0.5 + 1e-3, 0, 0)
    dummy.updateMatrix()
    m.setMatrixAt(4, dummy.matrix)
    m.setColorAt(4, color)

    dummy.rotation.set(0, (3 / 2) * Math.PI, 0)
    dummy.position.set(-(0.5 + 1e-3), 0, 0)
    dummy.updateMatrix()
    m.setMatrixAt(5, dummy.matrix)
    m.setColorAt(5, color)

    return m
  }, [colors, planeGeometry, planeMaterial])

  return (
    <RoundedBox args={[1, 1, 1]} radius={CUBE_RADIUS} smoothness={4}>
      <meshBasicMaterial attach="material" color="black" />
      <primitive object={planeMesh} />
    </RoundedBox>
  )
})

const HOLE_RADIUS = 1 / 6
const HOLE_SEGMENTS = 32

const Holes = memo(function Holes() {
  const material = useMemo(() => {
    return new MeshBasicMaterial({ color: 'black' })
  }, [])

  const geometry = useMemo(() => {
    return new CircleGeometry(HOLE_RADIUS, HOLE_SEGMENTS)
  }, [])

  const mesh = useMemo(() => {
    const m = new InstancedMesh(geometry, material, 4)
    const dummy = new Object3D()

    dummy.rotation.set((3 / 2) * Math.PI, 0, 0)
    dummy.position.set(0, 0.5 + 2e-3, 0)
    dummy.updateMatrix()
    m.setMatrixAt(0, dummy.matrix)

    dummy.rotation.set((1 / 2) * Math.PI, 0, 0)
    dummy.position.set(0, -(0.5 + 2e-3), 0)
    dummy.updateMatrix()
    m.setMatrixAt(1, dummy.matrix)

    dummy.rotation.set(0, (1 / 2) * Math.PI, 0)
    dummy.position.set(0.5 + 2e-3, 0, 0)
    dummy.updateMatrix()
    m.setMatrixAt(2, dummy.matrix)

    dummy.rotation.set(0, (3 / 2) * Math.PI, 0)
    dummy.position.set(-(0.5 + 2e-3), 0, 0)
    dummy.updateMatrix()
    m.setMatrixAt(3, dummy.matrix)

    return m
  }, [material, geometry])

  // dispose of material, geometry, and mesh
  useEffect(() => () => material.dispose(), [material])
  useEffect(() => () => geometry.dispose(), [geometry])
  // InstancedMesh.dispose returns the mesh, and a React 19 effect destructor returns nothing
  useEffect(
    () => () => {
      mesh.dispose()
    },
    [mesh],
  )

  return <primitive object={mesh} />
})

export default LogoGl
