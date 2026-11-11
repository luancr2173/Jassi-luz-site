import { site, waLink } from '@/content/site'
import Title from '../ui/Title'
import { WhatsIcon } from '../ui/Icons'
import SceneLoader from '../scene/SceneLoader'

export default function Hero() {
  return (
    <section className="hero" id="topo">
      <div className="hero__glow" aria-hidden="true" />
      <SceneLoader />
      <div className="hero__content">
        <p className="hero__label mono" data-fade>
          {site.hero.rotulo}
        </p>
        <Title as="h1" lines={site.hero.titulo} />
        <div className="hero__bottom">
          <p className="hero__sub" data-fade>
            {site.hero.subtitulo}
          </p>
          <div className="hero__ctas" data-fade>
            <a className="pill" href={waLink(site.hero.msg)} target="_blank" rel="noopener">
              <WhatsIcon /> {site.hero.ctaPrincipal}
            </a>
            <a className="pill pill--ghost" href="#pecas">
              {site.hero.ctaSecundario}
            </a>
          </div>
        </div>
      </div>
      <div className="hero__aside mono" aria-hidden="true">
        <span>Cupom 1ª compra · {site.cupom}</span>
        <span className="scroll-cue">
          Role <i />
        </span>
      </div>
    </section>
  )
}
