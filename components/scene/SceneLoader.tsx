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

/** Fallback estático na mesma composição: raios do logo + lua crescente */
function Fallback() {
  return (
    <div className="hero__fallback" aria-hidden="true">
      <SunRays className="hero__fallback-rays" count={19} />
      <svg viewBox="-80 -80 160 160" className="hero__fallback-moon">
        <defs>
          <linearGradient id="lua" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6e7c4" />
            <stop offset="1" stopColor="#b79a5a" />
          </linearGradient>
        </defs>
        <path d="M44.2 -60.6 A75 75 0 1 0 44.2 60.6 A61.5 61.5 0 1 1 44.2 -60.6 Z" fill="url(#lua)" />
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
