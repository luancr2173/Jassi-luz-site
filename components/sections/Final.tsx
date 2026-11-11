import { site, waLink } from '@/content/site'
import Title from '../ui/Title'
import { ArrowIcon, SunRays, WhatsIcon } from '../ui/Icons'
import MotionToggle from '../ui/MotionToggle'

export function ComoComprar() {
  return (
    <section className="como" id="comprar">
      <div className="sec-head" style={{ borderBottom: 0 }}>
        <Title lines={['Como *comprar*']} />
        <p>
          Do Instagram pra sua casa em quatro passos. Primeira compra? Use <span className="cupom">{site.cupom}</span>.
        </p>
      </div>
      <div className="como__grid">
        {site.comoComprar.map((p, i) => (
          <div className="passo" key={p.t}>
            <span className="mono">Passo {String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Final() {
  return (
    <section className="final" aria-labelledby="final-t">
      <SunRays className="final__sun" />
      <Title lines={site.final.titulo} id="final-t" />
      <p data-fade>{site.final.texto}</p>
      <div className="final__ctas" data-fade>
        <a className="pill" href={waLink(site.final.msg)} target="_blank" rel="noopener">
          <WhatsIcon /> Fazer meu pedido
        </a>
        <a className="pill pill--ghost" href={site.loja} target="_blank" rel="noopener">
          Loja online <ArrowIcon />
        </a>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__wordmark" aria-hidden="true">
        Jassi <em>Luz</em>
      </p>
      <div className="footer__grid">
        <div>
          <h4 className="mono">Contato</h4>
          <a href={waLink('Olá, Jassi! Vim pelo site.')} target="_blank" rel="noopener">
            WhatsApp
          </a>
          <a href={site.instagram} target="_blank" rel="noopener">
            Instagram {site.instagramUser}
          </a>
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
        </div>
        <div>
          <h4 className="mono">Loja</h4>
          <a href={site.loja} target="_blank" rel="noopener">
            Loja online
          </a>
          <a href="#pecas">Peças</a>
          <a href="#comprar">Como comprar</a>
        </div>
        <div>
          <h4 className="mono">Entrega</h4>
          <p>
            {site.cidade} · {site.uf}
          </p>
          <p>Envio para todo o Brasil</p>
        </div>
        <div>
          <h4 className="mono">Primeira compra</h4>
          <p>
            Cupom <strong>{site.cupom}</strong>
          </p>
          <p style={{ color: 'rgba(239,231,214,.55)' }}>{site.cupomDescricao}</p>
        </div>
      </div>
      <div className="footer__bottom mono">
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
