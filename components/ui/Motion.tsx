'use client'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { motionState, useMotion } from './MotionProvider'

gsap.registerPlugin(ScrollTrigger)

/**
 * Liga rolagem suave (Lenis) + as animações de scroll (GSAP), poucas e discretas.
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
          y: 24,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          delay: inHero ? 0.7 : 0,
          scrollTrigger: inHero ? undefined : { trigger: el, start: 'top 92%' },
        })
      })

      // Progresso do hero -> cena 3D
      ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        onUpdate: (s) => (motionState.heroProgress = s.progress),
      })
    })

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      ctx.revert()
      gsap.ticker.remove(raf)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((s) => s.kill())
      motionState.heroProgress = 0
    }
  }, [mode, ready])

  return null
}
