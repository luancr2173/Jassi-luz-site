import { site } from '@/content/site'
import Title from '../ui/Title'
import { ArrowIcon } from '../ui/Icons'

const fotos = [
  { src: '/fotos/colar-trevo.jpg', alt: 'Colar com pingente de trevo em aço inox no pescoço', cap: 'Colar Trevo' },
  { src: '/fotos/argola-coracao.jpg', alt: 'Par de brincos argola em formato de coração sobre espelho', cap: 'Argola Coração' },
  { src: '/fotos/brincos-flor.jpg', alt: 'Brincos artesanais coloridos em formato de flor na palma da mão', cap: 'Brincos Flor' },
  { src: '/fotos/colar-coracao-cristal.jpg', alt: 'Colar com pingente de coração em cristal na mão', cap: 'Coração Cristal' },
  { src: '/fotos/pulseira-elos.jpg', alt: 'Pulseira de elos em aço inox sobre tecido bege', cap: 'Pulseira Elos' },
]

export default function Galeria() {
  return (
    <section className="galeria" id="galeria">
      <Title lines={['No *corpo,*', 'na *luz*']} className="galeria__title" />
      <div className="galeria__grid">
        {fotos.map((f, i) => (
          <figure className={`g g--${i + 1}`} key={f.src} style={{ margin: 0 }}>
            <img src={f.src} alt={f.alt} width={640} height={640} loading="lazy" data-parallax />
            <figcaption className="mono">{f.cap}</figcaption>
          </figure>
        ))}
      </div>
      <div className="galeria__ig">
        <a className="pill pill--ghost" href={site.instagram} target="_blank" rel="noopener">
          Ver mais no {site.instagramUser} <ArrowIcon />
        </a>
      </div>
    </section>
  )
}
