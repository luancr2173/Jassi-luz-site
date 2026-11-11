'use client'
import { useEffect, useState } from 'react'
import { site, waLink } from '@/content/site'
import { SunMark, WhatsIcon } from './Icons'

const links = [
  { href: '#pecas', label: 'Peças' },
  { href: '#porque', label: 'Por que inox' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#comprar', label: 'Como comprar' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#topo" className="logo" aria-label="Jassi Luz, início">
          <SunMark />
          <span>Jassi Luz</span>
        </a>
        <nav className="nav mono" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="pill pill--sm" href={waLink(site.hero.msg)} target="_blank" rel="noopener">
          <WhatsIcon /> Pedir agora
        </a>
        <button className="menu-btn mono" aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen(true)}>
          Menu
        </button>
      </header>

      <div id="menu-mobile" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="logo" style={{ color: 'var(--night-ink)' }}>
            <SunMark />
            <span>Jassi Luz</span>
          </span>
          <button className="mono" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            Fechar
          </button>
        </div>
        <nav aria-label="Menu">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              {i % 2 ? <em>{l.label}</em> : l.label}
            </a>
          ))}
        </nav>
        <a className="pill pill--gold" href={waLink(site.hero.msg)} target="_blank" rel="noopener" tabIndex={open ? 0 : -1}>
          <WhatsIcon /> Chamar no WhatsApp
        </a>
      </div>
    </>
  )
}
