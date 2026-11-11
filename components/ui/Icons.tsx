export function WhatsIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.004 3C8.832 3 3 8.83 3 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.71A12.96 12.96 0 0 0 16 29c7.17 0 13-5.83 13-13S23.18 3 16.004 3Zm0 23.72c-2 0-3.96-.54-5.67-1.55l-.4-.24-3.97 1.02 1.06-3.86-.27-.4A10.7 10.7 0 0 1 5.28 16C5.28 10.09 10.1 5.28 16 5.28 21.9 5.28 26.72 10.1 26.72 16c0 5.91-4.81 10.72-10.72 10.72Zm5.88-8.03c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.15-.14.32-.38.48-.56.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.69 0 1.58 1.16 3.12 1.32 3.33.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.25 1.48.21 2.03.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  )
}

/** Sol nascente com raios finos, inspirado no logo da Jassi Luz */
export function SunMark({ className }: { className?: string }) {
  const rays = [-72, -54, -36, -18, 0, 18, 36, 54, 72]
  return (
    <svg className={className} viewBox="0 0 60 34" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      {rays.map((a, i) => {
        const r = (a * Math.PI) / 180
        const len = i % 2 ? 16 : 26
        return <line key={a} x1={30 + Math.sin(r) * 6} y1={30 - Math.cos(r) * 6} x2={30 + Math.sin(r) * len} y2={30 - Math.cos(r) * len} />
      })}
      <line x1="2" y1="31" x2="58" y2="31" />
    </svg>
  )
}

export function SunRays({ className, count = 41 }: { className?: string; count?: number }) {
  const lines = Array.from({ length: count }, (_, i) => -90 + (180 / (count - 1)) * i)
  return (
    <svg className={className} viewBox="0 0 1000 520" fill="none" stroke="currentColor" aria-hidden="true">
      {lines.map((a, i) => {
        const r = (a * Math.PI) / 180
        const inner = 110 + (i % 3) * 18
        const outer = i % 2 ? 380 : 500
        return (
          <line
            key={i}
            x1={500 + Math.sin(r) * inner}
            y1={500 - Math.cos(r) * inner}
            x2={500 + Math.sin(r) * outer}
            y2={500 - Math.cos(r) * outer}
            strokeWidth={i % 2 ? 1 : 1.6}
          />
        )
      })}
      <line x1="0" y1="501" x2="1000" y2="501" strokeWidth="1.6" />
    </svg>
  )
}

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  )
}
