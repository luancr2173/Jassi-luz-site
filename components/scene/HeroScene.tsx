'use client'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, PerformanceMonitor, Sparkles } from '@react-three/drei'
import { motionState } from '../ui/MotionProvider'

const damp = THREE.MathUtils.damp
const OLIVE = '#736115'

/* ---------- geometria da lua crescente (pingente em aço) ----------
   Círculo externo (raio R, centro na origem) menos um círculo interno (raio r, deslocado d para a direita).
   O topo do círculo externo (0, R) fica livre para a argola de ligação. */
const MOON_R = 0.75

function useMoonGeometry() {
  return useMemo(() => {
    const R = MOON_R
    const r = R * 0.82
    const d = R * 0.45
    const ix = (R * R - r * r + d * d) / (2 * d)
    const iy = Math.sqrt(R * R - ix * ix)
    const a = Math.atan2(iy, ix)
    const shape = new THREE.Shape()
    shape.moveTo(ix, iy)
    // borda externa: do chifre de cima, pela esquerda, até o chifre de baixo
    shape.absarc(0, 0, R, a, Math.PI * 2 - a, false)
    // borda interna: volta ao chifre de cima pelo lado esquerdo do círculo interno
    shape.absarc(d, 0, r, Math.atan2(-iy, ix - d), Math.atan2(iy, ix - d), true)
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.05,
      bevelSegments: 12,
      curveSegments: 120,
    })
    g.translate(0, 0, -0.06)
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
  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: OLIVE, transparent: true, opacity: 0.55, depthWrite: false }),
    [],
  )
  const rays = useMemo(() => {
    const n = 19
    return Array.from({ length: n }, (_, i) => {
      const a = -Math.PI / 2 + 0.25 + ((Math.PI - 0.5) / (n - 1)) * i
      const long = i % 2 === 0
      return { a, inner: long ? 0.62 : 0.8, len: long ? 0.95 : 0.45, w: long ? 0.007 : 0.005 }
    })
  }, [])

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const p = motionState.heroProgress
    const t = state.clock.elapsedTime
    g.rotation.z = damp(g.rotation.z, Math.sin(t * 0.15) * 0.03 - p * 0.2, 3, dt)
    const s = 1 + p * 0.4
    g.scale.x = damp(g.scale.x, s, 3, dt)
    g.scale.y = damp(g.scale.y, s, 3, dt)
    mat.opacity = damp(mat.opacity, 0.55 * (1 - p), 3, dt)
  })

  return (
    <group ref={group} position={mobile ? [0, -0.45, -0.6] : [0, 0.36, -0.6]}>
      {rays.map((r, i) => (
        <mesh
          key={i}
          position={[Math.sin(r.a) * (r.inner + r.len / 2), Math.cos(r.a) * (r.inner + r.len / 2), 0]}
          rotation={[0, 0, -r.a]}
          material={mat}
        >
          <planeGeometry args={[r.w, r.len]} />
        </mesh>
      ))}
      <mesh position={[0, 0, 0]} material={mat}>
        <planeGeometry args={[mobile ? 3.2 : 4.2, 0.006]} />
      </mesh>
    </group>
  )
}

/* ---------- pingente ---------- */
function Pendant({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  const geo = useMoonGeometry()
  const swing = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)
  // aço inox com banho dourado, puxado para o tom do logo
  const steel = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#e8cf9a',
        metalness: 1,
        roughness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        envMapIntensity: 1.4,
      }),
    [],
  )
  const baseY = mobile ? 0.62 : 1.46
  const scale = mobile ? 0.72 : 0.6

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
    // giro da lua na corrente (lento, acelera com o scroll)
    r.rotation.y = damp(r.rotation.y, Math.sin(t * 0.35) * 0.55 + px * 0.5 + p * Math.PI * 1.3, 2, dt)
  })

  return (
    // o pivô do pêndulo fica no alto, onde a corrente "está presa"
    <group position={[0, 3.2, 0]}>
      <group ref={swing}>
        <group position={[0, -3.2, 0]} scale={scale}>
          <group ref={spin}>
            {/* lua pendurada pelo topo do arco externo, logo abaixo da argola */}
            <mesh geometry={geo} material={steel} position={[0, -0.1 - MOON_R, 0]} />
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
        <meshBasicMaterial color="#4f4326" side={THREE.BackSide} />
      </mesh>
      <Lightformer form="rect" intensity={4} color="#fff7e8" position={[0, 5, -2]} scale={[10, 2, 1]} rotation-x={Math.PI / 2} />
      <Lightformer form="rect" intensity={5} color="#f3e6cf" position={[-5, 1, 1]} scale={[2, 8, 1]} rotation-y={Math.PI / 2} />
      <Lightformer form="rect" intensity={3} color="#ffffff" position={[5, 0, 2]} scale={[3, 6, 1]} rotation-y={-Math.PI / 2} />
      <Lightformer form="rect" intensity={8} color="#ffffff" position={[-2, 0, 5]} scale={[0.4, 10, 1]} />
      <Lightformer form="rect" intensity={8} color="#ffffff" position={[2.4, 0, 5]} scale={[0.25, 10, 1]} />
      <Lightformer form="ring" intensity={4} color="#e7ddd1" position={[0, 0, 6]} scale={3} />
      <Lightformer form="rect" intensity={1.4} color="#736115" position={[0, -5, 0]} scale={[10, 10, 1]} rotation-x={-Math.PI / 2} />
    </Environment>
  )
}

/** Composição centrada: a lua nasce no lugar do sol do logo */
function Stage({ children }: { children: React.ReactNode }) {
  return <group>{children}</group>
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
      <Stage>
        <Rays mobile={mobile} />
        <Pendant mobile={mobile} reduced={reduced} />
      </Stage>
      {!reduced && (
        <Sparkles count={mobile ? 12 : 26} scale={mobile ? [3, 3, 2] : [5, 4, 3]} size={2} speed={0.25} color="#a3946b" opacity={0.7} />
      )}
    </Canvas>
  )
}
