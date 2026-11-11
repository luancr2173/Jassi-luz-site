'use client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type Mode = 'auto' | 'off'
const Ctx = createContext<{ mode: Mode; setMode: (m: Mode) => void; ready: boolean }>({
  mode: 'auto',
  setMode: () => {},
  ready: false,
})

/** Estado compartilhado (sem React por frame) entre o scroll e a cena 3D */
export const motionState = { heroProgress: 0, pointerX: 0, pointerY: 0 }

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>('auto')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let initial: Mode = 'auto'
    try {
      const saved = localStorage.getItem('jl-motion') as Mode | null
      if (saved === 'off' || saved === 'auto') initial = saved
      else if (matchMedia('(prefers-reduced-motion: reduce)').matches) initial = 'off'
    } catch {}
    setModeState(initial)
    setReady(true)
  }, [])

  const setMode = useCallback((m: Mode) => {
    setModeState(m)
    try {
      localStorage.setItem('jl-motion', m)
    } catch {}
  }, [])

  useEffect(() => {
    if (!ready) return
    document.documentElement.dataset.motion = mode
  }, [mode, ready])

  return <Ctx.Provider value={{ mode, setMode, ready }}>{children}</Ctx.Provider>
}

export const useMotion = () => useContext(Ctx)
