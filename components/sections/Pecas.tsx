import { site, waLink } from '@/content/site'
import Title from '../ui/Title'
import { ArrowIcon } from '../ui/Icons'

export default function Pecas() {
  return (
    <section className="pecas" id="pecas">
      <div className="sec-head">
        <Title lines={site.pecasTitulo} />
        <p>{site.pecasTexto}</p>
      </div>

      <ul className="grade">
        {site.pecas.map((p) => (
          <li className="card" key={p.nome} data-fade>
            <a href={waLink(p.msg)} target="_blank" rel="noopener" className="card__link">
              <div className="card__foto">
                <img src={p.foto} alt={`${p.nome} da Jassi Luz`} width={640} height={640} loading="lazy" />
                <span className="card__cta caps">Pedir no WhatsApp</span>
              </div>
              <h3 className="card__nome">{p.nome}</h3>
              <p className="card__tipo">
                {p.tipo}
                {p.preco ? ` · ${p.preco}` : ''}
              </p>
            </a>
          </li>
        ))}
        <li className="card card--ig" data-fade>
          <a href={site.instagram} target="_blank" rel="noopener" className="card__link">
            <div className="card__foto card__foto--ig">
              <span className="card__ig-t">Mais peças no Instagram</span>
              <span className="caps">
                {site.instagramUser} <ArrowIcon />
              </span>
            </div>
            <h3 className="card__nome">Coleção completa</h3>
            <p className="card__tipo">Novidades toda semana</p>
          </a>
        </li>
      </ul>
    </section>
  )
}
