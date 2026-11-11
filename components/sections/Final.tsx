import { site, waLink } from '@/content/site'
import Title from '../ui/Title'
import { ArrowIcon, SunMark, WhatsIcon } from '../ui/Icons'
import MotionToggle from '../ui/MotionToggle'

export function ComoComprar() {
  return (
    <section className="como" id="comprar">
      <div className="sec-head">
        <Title lines={['Como *comprar*']} />
        <p>
          Do Instagram pra sua casa em quatro passos. Primeira compra? Use o cupom <span className="cupom">{site.cupom}</span>.
        </p>
      </div>
      <ol className="como__grid">
        {site.comoComprar.map((p, i) => (
          <li className="passo" key={p.t} data-fade>
            <span className="passo__n">{String(i + 1).padStart(2, '0')}</span>
            <h3>{p.t}</h3>
            <p>{p.d}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Final() {
  return (
    <section className="final" aria-labelledby="final-t">
      <SunMark className="final__mark" />
      <Title lines={site.final.titulo} id="final-t" />
      <p data-fade>{site.final.texto}</p>
      <div className="final__ctas" data-fade>
        <a className="btn btn--light" href={waLink(site.final.msg)} target="_blank" rel="noopener">
          <WhatsIcon /> Fazer meu pedido
        </a>
        <a className="link link--light" href={site.loja} target="_blank" rel="noopener">
          Loja online <ArrowIcon />
        </a>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <span className="logo logo--light">
            <SunMark />
            <span>Jassi Luz</span>
          </span>
          <p>Joias em aço inox que não escurecem. {site.cidade} · {site.uf}, envio para todo o Brasil.</p>
        </div>
        <div>
          <h4 className="caps">Contato</h4>
          <a href={waLink('Olá, Jassi! Vim pelo site.')} target="_blank" rel="noopener">
            WhatsApp
          </a>
          <a href={site.instagram} target="_blank" rel="noopener">
            Instagram {site.instagramUser}
          </a>
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
        </div>
        <div>
          <h4 className="caps">Loja</h4>
          <a href={site.loja} target="_blank" rel="noopener">
            Loja online
          </a>
          <a href="#pecas">Peças</a>
          <a href="#comprar">Como comprar</a>
        </div>
        <div>
          <h4 className="caps">Primeira compra</h4>
          <p>
            Cupom <strong>{site.cupom}</strong> {site.cupomDescricao}
          </p>
        </div>
      </div>
      <div className="footer__bottom">
        <span>
          © {new Date().getFullYear()} {site.marca}
          {site.cnpj ? ` · CNPJ ${site.cnpj}` : ''}
        </span>
        <MotionToggle />
        <a href="https://ionext.com.br" target="_blank" rel="noopener">
          Site por IONEXT
        </a>
      </div>
    </footer>
  )
}
