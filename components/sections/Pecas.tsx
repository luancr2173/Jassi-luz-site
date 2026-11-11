'use client'
import { useEffect, useRef, useState } from 'react'
import { site, waLink } from '@/content/site'
import Title from '../ui/Title'
import { WhatsIcon } from '../ui/Icons'

export default function Pecas() {
  const img = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<number | null>(null)

  // imagem que segue o cursor (desktop), com inércia
  useEffect(() => {
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0
    const move = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const loop = () => {
      x += (tx - x) * 0.14
      y += (ty - y) * 0.14
      if (img.current) img.current.style.left = `${x}px`, img.current.style.top = `${y}px`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="pecas" id="pecas">
      <div className="sec-head">
        <Title lines={['As *peças*']} />
        <p>Aço inoxidável com acabamento polido. Cada uma pensada pra ficar no corpo o dia todo, todo dia.</p>
      </div>

      <ul className="pecas__list" onPointerLeave={() => setHover(null)}>
        {site.pecas.map((p, i) => (
          <li className="peca" key={p.nome} onPointerEnter={() => setHover(i)}>
            <span className="peca__n mono">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="peca__nome">
                {p.nome.split(' ').slice(0, -1).join(' ')} <em>{p.nome.split(' ').slice(-1)}</em>
              </h3>
              <span className="peca__tipo mono">
                {p.tipo}
                {p.preco ? ` · ${p.preco}` : ''}
              </span>
            </div>
            <div className="peca__thumb">
              <img src={p.foto} alt={`${p.nome} da Jassi Luz`} width={640} height={640} loading="lazy" />
            </div>
            <p className="peca__desc">{p.descricao}</p>
            <a className="pill pill--ghost pill--sm" href={waLink(p.msg)} target="_blank" rel="noopener">
              <WhatsIcon /> Quero essa
            </a>
          </li>
        ))}
      </ul>

      <div ref={img} className={`cursor-img ${hover !== null ? 'is-on' : ''}`} aria-hidden="true">
        {site.pecas.map((p, i) => (
          <img
            key={p.foto}
            src={p.foto}
            alt=""
            width={640}
            height={640}
            style={{ position: 'absolute', inset: 0, opacity: hover === i ? 1 : 0, transition: 'opacity .35s' }}
          />
        ))}
      </div>
    </section>
  )
}
