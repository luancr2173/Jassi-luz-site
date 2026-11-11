'use client'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useMotion } from '../ui/MotionProvider'
import { SunRays } from '../ui/Icons'

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false, loading: () => null })

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/** Fallback estático na mesma composição: raios de sol + coração em traço */
function Fallback() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'var(--gold)' }} aria-hidden="true">
      <SunRays className="" />
      <svg viewBox="0 0 100 92" width="34%" style={{ position: 'absolute', maxWidth: 260 }} fill="none" stroke="#8d8f95" strokeWidth="5">
        <path d="M50 86C20 64 6 46 6 28 6 14 17 6 29 6c9 0 16 5 21 12 5-7 12-12 21-12 12 0 23 8 23 22 0 18-14 36-44 58Z" />
      </svg>
    </div>
  )
}

export default function SceneLoader() {
  const { mode, ready } = useMotion()
  const wrap = useRef<HTMLDivElement>(null)
  const [gl, setGl] = useState<boolean | null>(null)
  const [mobile, setMobile] = useState(false)
  const [active, setActive] = useState(true)

  useEffect(() => {
    setGl(hasWebGL())
    const mq = matchMedia('(max-width: 860px)')
    const on = () => setMobile(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // pausa a cena quando o hero sai da tela
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className="hero__scene">
      {gl === false && <Fallback />}
      {gl && ready && <HeroScene key={mobile ? 'm' : 'd'} mobile={mobile} reduced={mode === 'off'} active={active} />}
    </div>
  )
}
