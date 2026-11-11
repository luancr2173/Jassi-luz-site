'use client'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, PerformanceMonitor, Sparkles } from '@react-three/drei'
import { motionState } from '../ui/MotionProvider'

const damp = THREE.MathUtils.damp

/* ---------- geometria do coração vazado (argola coração em aço) ---------- */
function heartPoints(scale: number, n = 96) {
  const pts: THREE.Vector2[] = []
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2
    const x = 16 * Math.pow(Math.sin(t), 3)
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
    pts.push(new THREE.Vector2((x / 16) * scale, (y / 16) * scale))
  }
  return pts
}

function useHeartGeometry() {
  return useMemo(() => {
    const outer = new THREE.Shape(heartPoints(1))
    const inner = new THREE.Path(heartPoints(0.74).map((p) => new THREE.Vector2(p.x, p.y - 0.035)).reverse())
    outer.holes.push(inner)
    const g = new THREE.ExtrudeGeometry(outer, {
      depth: 0.16,
      bevelEnabled: true,
      bevelThickness: 0.09,
      bevelSize: 0.07,
      bevelSegments: 12,
      curveSegments: 96,
    })
    g.center()
    g.computeVertexNormals()
    return g
  }, [])
}

/* ---------- corrente: elos instanciados ---------- */
function Chain({ material, count }: { material: THREE.Material; count: number }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const geo = useMemo(() => new THREE.TorusGeometry(0.05, 0.014, 10, 24), [])
  useLayoutEffect(() => {
    {
      const m = ref.current
      if (!m) return
      const o = new THREE.Object3D()
      for (let i = 0; i < count; i++) {
        o.position.set(0, i * 0.082, 0)
        o.rotation.set(0, i % 2 ? Math.PI / 2 : 0, Math.PI / 2)
        o.scale.set(1, 1.55, 1)
        o.updateMatrix()
        m.setMatrixAt(i, o.matrix)
      }
      m.instanceMatrix.needsUpdate = true
    }
  }, [count])
  return <instancedMesh ref={ref} args={[geo, material, count]} />
}

/* ---------- raios de sol do logo ---------- */
function Rays({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null)
  const mat = useRef<THREE.MeshBasicMaterial>(null)
  const rays = useMemo(() => {
    const n = 23
    return Array.from({ length: n }, (_, i) => {
      const a = -Math.PI / 2 + (Math.PI / (n - 1)) * i
      const long = i % 2 === 0
      return { a, inner: long ? 1.15 : 1.5, len: long ? 2.6 : 1.4, w: long ? 0.012 : 0.008 }
    })
  }, [])

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const p = motionState.heroProgress
    const t = state.clock.elapsedTime
    g.rotation.z = damp(g.rotation.z, Math.sin(t * 0.15) * 0.04 - p * 0.25, 3, dt)
    const s = 1 + p * 0.5
    g.scale.x = damp(g.scale.x, s, 3, dt)
    g.scale.y = damp(g.scale.y, s, 3, dt)
    if (mat.current) mat.current.opacity = damp(mat.current.opacity, 0.75 * (1 - p * 0.8), 3, dt)
  })

  return (
    <group ref={group} position={mobile ? [0, -1.05, -1.6] : [0, -0.8, -1.8]}>
      <meshBasicMaterial ref={mat} attach="material" color="#a8862e" transparent opacity={0.75} depthWrite={false} />
      {rays.map((r, i) => (
        <mesh
          key={i}
          position={[Math.sin(r.a) * (r.inner + r.len / 2), Math.cos(r.a) * (r.inner + r.len / 2), 0]}
          rotation={[0, 0, -r.a]}
        >
          <planeGeometry args={[r.w, r.len]} />
          <meshBasicMaterial color="#a8862e" transparent opacity={0.6} depthWrite={false} />
        </mesh>
      ))}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[9, 0.012]} />
        <meshBasicMaterial color="#a8862e" transparent opacity={0.6} depthWrite={false} />
      </mesh>
    </group>
  )
}

/* ---------- pingente ---------- */
function Pendant({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  const geo = useHeartGeometry()
  const swing = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)
  const steel = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#e9e9ee',
        metalness: 1,
        roughness: 0.08,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.5,
      }),
    [],
  )
  const baseY = mobile ? 0.05 : 0.35
  const scale = mobile ? 0.82 : 0.74

  useFrame((state, dt) => {
    const s = swing.current
    const r = spin.current
    if (!s || !r) return
    const t = reduced ? 0 : state.clock.elapsedTime
    const p = motionState.heroProgress
    const px = reduced ? 0 : state.pointer.x
    const py = reduced ? 0 : state.pointer.y
    // pêndulo suave + mouse
    s.rotation.z = damp(s.rotation.z, Math.sin(t * 0.8) * 0.05 - px * 0.12, 2.5, dt)
    s.rotation.x = damp(s.rotation.x, py * 0.08, 2.5, dt)
    s.position.y = damp(s.position.y, baseY + p * 1.4, 3, dt)
    // giro do coração na corrente (lento, acelera com o scroll)
    r.rotation.y = damp(r.rotation.y, Math.sin(t * 0.35) * 0.55 + px * 0.5 + p * Math.PI * 1.3, 2, dt)
  })

  return (
    // o pivô do pêndulo fica no alto, onde a corrente "está presa"
    <group position={[0, 3.2, 0]}>
      <group ref={swing}>
        <group position={[0, -3.2, 0]} scale={scale}>
          <group ref={spin}>
            <mesh geometry={geo} material={steel} position={[0, -0.5, 0]} />
            {/* argola de ligação (bail) */}
            <mesh material={steel} position={[0, 0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[0.085, 0.022, 12, 32]} />
            </mesh>
            <group position={[0, 0.12, 0]}>
              <Chain material={steel} count={mobile ? 40 : 54} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

/* ---------- ambiente de luz construído na cena (sem HDR externo) ---------- */
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <mesh scale={40}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshBasicMaterial color="#7d7366" side={THREE.BackSide} />
      </mesh>
      <Lightformer form="rect" intensity={4} color="#fff7e8" position={[0, 5, -2]} scale={[10, 2, 1]} rotation-x={Math.PI / 2} />
      <Lightformer form="rect" intensity={6} color="#ffd88a" position={[-5, 1, 1]} scale={[2, 8, 1]} rotation-y={Math.PI / 2} />
      <Lightformer form="rect" intensity={3} color="#ffffff" position={[5, 0, 2]} scale={[3, 6, 1]} rotation-y={-Math.PI / 2} />
      <Lightformer form="rect" intensity={8} color="#ffffff" position={[-2, 0, 5]} scale={[0.4, 10, 1]} />
      <Lightformer form="rect" intensity={8} color="#ffffff" position={[2.4, 0, 5]} scale={[0.25, 10, 1]} />
      <Lightformer form="ring" intensity={5} color="#f2c46b" position={[0, 0, 6]} scale={3} />
      <Lightformer form="rect" intensity={1.2} color="#3b2f1c" position={[0, -5, 0]} scale={[10, 10, 1]} rotation-x={-Math.PI / 2} />
    </Environment>
  )
}

/** No desktop o canvas ocupa a tela toda; a joia fica deslocada para a direita */
function Stage({ mobile, children }: { mobile: boolean; children: React.ReactNode }) {
  const w = useThree((s) => s.viewport.width)
  return <group position={[mobile ? 0 : w * 0.22, 0, 0]}>{children}</group>
}

export default function HeroScene({
  reduced,
  mobile,
  active,
}: {
  reduced: boolean
  mobile: boolean
  active: boolean
}) {
  const [dpr, setDpr] = useState(mobile ? 1.25 : 1.75)
  return (
    <Canvas
      dpr={[1, dpr]}
      frameloop={!active ? 'never' : reduced ? 'demand' : 'always'}
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <Studio />
      <ambientLight intensity={0.3} />
      <Stage mobile={mobile}>
        <Rays mobile={mobile} />
        <Pendant mobile={mobile} reduced={reduced} />
      </Stage>
      {!reduced && (
        <Sparkles count={mobile ? 22 : 60} scale={mobile ? [4, 4, 2] : [6, 5, 3]} size={mobile ? 2.4 : 3} speed={0.3} color="#c9a24a" opacity={0.8} />
      )}
    </Canvas>
  )
}
