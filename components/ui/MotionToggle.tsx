'use client'
import { useMotion } from './MotionProvider'

export default function MotionToggle() {
  const { mode, setMode } = useMotion()
  return (
    <div className="motion-toggle" role="group" aria-label="Animações">
      <span>Animações:</span>
      <button aria-pressed={mode === 'auto'} onClick={() => setMode('auto')}>
        Auto
      </button>
      <button aria-pressed={mode === 'off'} onClick={() => setMode('off')}>
        Desativadas
      </button>
    </div>
  )
}
