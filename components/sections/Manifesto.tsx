import { Fragment } from 'react'
import { site } from '@/content/site'
import { SunMark } from '../ui/Icons'

export function Marquee() {
  const items = [...site.marquee, ...site.marquee]
  return (
    <div className="marquee" aria-label={site.marquee.join(', ')}>
      <div className="marquee__track" aria-hidden="true">
        {[...items, ...items].map((t, i) => (
          <span className="marquee__item" key={i}>
            {t} <SunMark />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Manifesto() {
  const words = site.manifesto.split(' ')
  return (
    <section className="manifesto" aria-label="Manifesto">
      <span className="manifesto__label mono">(01) A ideia</span>
      <p data-words>
        {words.map((w, i) => (
          <Fragment key={i}>
            {i > 0 && ' '}
            <span className="w">{w}</span>
          </Fragment>
        ))}
      </p>
    </section>
  )
}
