'use client'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerformanceMonitor, Sparkles } from '@react-three/drei'
import { motionState } from '../ui/MotionProvider'

const damp = THREE.MathUtils.damp
const OLIVE = '#736115'

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
      <Rays mobile={mobile} />
      {!reduced && (
        <Sparkles count={mobile ? 12 : 26} scale={mobile ? [3, 3, 2] : [5, 4, 3]} size={2} speed={0.25} color="#a3946b" opacity={0.7} />
      )}
    </Canvas>
  )
}
