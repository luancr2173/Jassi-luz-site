import { site, waLink } from '@/content/site'
import Title from '../ui/Title'
import { WhatsIcon } from '../ui/Icons'
import SceneLoader from '../scene/SceneLoader'

export default function Hero() {
  return (
    <section className="hero" id="topo">
      <SceneLoader />
      <div className="hero__content">
        <p className="hero__label caps" data-fade>
          {site.hero.rotulo}
        </p>
        <Title as="h1" lines={site.hero.titulo} />
        <p className="hero__sub" data-fade>
          {site.hero.subtitulo}
        </p>
        <div className="hero__ctas" data-fade>
          <a className="btn" href={waLink(site.hero.msg)} target="_blank" rel="noopener">
            <WhatsIcon /> {site.hero.ctaPrincipal}
          </a>
          <a className="link" href="#pecas">
            {site.hero.ctaSecundario}
          </a>
        </div>
      </div>
    </section>
  )
}
