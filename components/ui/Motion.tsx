'use client'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { motionState, useMotion } from './MotionProvider'

gsap.registerPlugin(ScrollTrigger)

/**
 * Liga rolagem suave (Lenis) + todas as animações de scroll (GSAP).
 * Com animações desativadas, nada disso roda e todo o conteúdo fica visível no estado final.
 */
export default function Motion() {
  const { mode, ready } = useMotion()

  useEffect(() => {
    if (!ready || mode === 'off') {
      motionState.heroProgress = 0
      return
    }

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      // Títulos: palavras saindo da máscara
      gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
        const words = el.querySelectorAll('.word')
        const inHero = !!el.closest('.hero')
        gsap.from(words, {
          yPercent: 115,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.06,
          delay: inHero ? 0.25 : 0,
          scrollTrigger: inHero ? undefined : { trigger: el, start: 'top 88%' },
        })
      })

      // Entradas suaves
      gsap.utils.toArray<HTMLElement>('[data-fade]').forEach((el) => {
        const inHero = !!el.closest('.hero')
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          delay: inHero ? 0.7 : 0,
          scrollTrigger: inHero ? undefined : { trigger: el, start: 'top 90%' },
        })
      })

      // Manifesto acendendo palavra a palavra
      const mWords = gsap.utils.toArray<HTMLElement>('[data-words] .w')
      if (mWords.length) {
        gsap.fromTo(
          mWords,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: { trigger: '[data-words]', start: 'top 80%', end: 'bottom 45%', scrub: true },
          },
        )
      }

      // Galeria: revelação por clip-path + paralaxe interna
      gsap.utils.toArray<HTMLElement>('.g').forEach((fig) => {
        gsap.from(fig, {
          clipPath: 'inset(100% 0% 0% 0%)',
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: fig, start: 'top 88%' },
        })
      })
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -9 },
          { yPercent: 0, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })

      // Itens das listas
      gsap.utils.toArray<HTMLElement>('.peca, .passo').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 40, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 92%' } })
      })

      // Progresso do hero -> cena 3D
      ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        onUpdate: (s) => (motionState.heroProgress = s.progress),
      })

      // CTA final: sol subindo
      gsap.fromTo('.final__sun', { yPercent: 18, rotate: -6 }, { yPercent: -4, rotate: 0, ease: 'none', scrollTrigger: { trigger: '.final', start: 'top bottom', end: 'bottom bottom', scrub: true } })

      // "Por que aço inox": seção pinada no desktop
      mm.add('(min-width: 861px)', () => {
        const items = gsap.utils.toArray<HTMLElement>('.porque__item')
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '.porque__inner', start: 'top top', end: '+=120%', pin: true, scrub: 0.6 },
        })
        tl.fromTo('.porque__bar i', { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: items.length }, 0)
        items.forEach((it, i) => {
          tl.fromTo(it, { opacity: 0.18 }, { opacity: 1, duration: 0.6 }, i * 0.9)
        })
        tl.fromTo('.porque__rays', { rotate: -20 }, { rotate: 8, ease: 'none', duration: items.length }, 0)
      })
      mm.add('(max-width: 860px)', () => {
        gsap.utils.toArray<HTMLElement>('.porque__item').forEach((el) => {
          gsap.from(el, { opacity: 0, x: -20, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
        })
      })
    })

    // Letreiro que acelera com a velocidade da rolagem
    const tracks = gsap.utils.toArray<HTMLElement>('.marquee__track')
    const pos = tracks.map(() => 0)
    const tick = () => {
      const v = Math.min(Math.abs(lenis.velocity) * 0.35, 14)
      tracks.forEach((t, i) => {
        const half = t.scrollWidth / 2
        pos[i] -= 0.6 + v
        if (-pos[i] >= half) pos[i] += half
        t.style.transform = `translate3d(${pos[i]}px,0,0)`
      })
    }
    gsap.ticker.add(tick)

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      gsap.ticker.remove(tick)
      tracks.forEach((t) => (t.style.transform = ''))
      ctx.revert()
      mm.revert()
      gsap.ticker.remove(raf)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((s) => s.kill())
      motionState.heroProgress = 0
    }
  }, [mode, ready])

  return null
}
