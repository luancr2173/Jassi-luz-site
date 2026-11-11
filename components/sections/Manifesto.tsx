import { site } from '@/content/site'

/** Faixa oliva com os benefícios do aço inox, rolando devagar (para quando as animações estão desativadas) */
export function Beneficios() {
  const items = [...site.marquee, ...site.marquee]
  return (
    <div className="faixa" aria-label={site.marquee.join(', ')}>
      <div className="faixa__track" aria-hidden="true">
        {[...items, ...items].map((t, i) => (
          <span className="faixa__item caps" key={i}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
