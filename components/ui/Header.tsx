'use client'
import { useEffect, useState } from 'react'
import { site, waLink } from '@/content/site'
import { SunMark, WhatsIcon } from './Icons'

const links = [
  { href: '#pecas', label: 'Peças' },
  { href: '#porque', label: 'Aço inox' },
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
      <div className="aviso caps">
        Cupom {site.cupom} {site.cupomDescricao} · Envio para todo o Brasil
      </div>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <nav className="nav" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#topo" className="logo" aria-label="Jassi Luz, início">
          <SunMark />
          <span>Jassi Luz</span>
        </a>
        <div className="header__end">
          <a className="nav-wa" href={waLink(site.hero.msg)} target="_blank" rel="noopener">
            <WhatsIcon /> <span>Pedir agora</span>
          </a>
          <button className="menu-btn" aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen(true)}>
            Menu
          </button>
        </div>
      </header>

      <div id="menu-mobile" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="mobile-menu__top">
          <span className="logo logo--light">
            <SunMark />
            <span>Jassi Luz</span>
          </span>
          <button onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            Fechar
          </button>
        </div>
        <nav aria-label="Menu">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="btn btn--light" href={waLink(site.hero.msg)} target="_blank" rel="noopener" tabIndex={open ? 0 : -1}>
          <WhatsIcon /> Chamar no WhatsApp
        </a>
      </div>
    </>
  )
}
