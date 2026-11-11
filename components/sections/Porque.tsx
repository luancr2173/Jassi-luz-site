import { site } from '@/content/site'
import Title from '../ui/Title'
import { SunRays } from '../ui/Icons'

export default function Porque() {
  const { titulo, itens } = site.porque
  return (
    <section className="porque" id="porque">
      <SunRays className="porque__rays" />
      <div className="porque__inner">
        <div className="porque__left">
          <p className="mono" style={{ color: 'rgba(239,231,214,.55)', marginBottom: 28 }}>
            (02) O material
          </p>
          <Title lines={titulo} />
          <div className="porque__progress mono" aria-hidden="true">
            <span>01</span>
            <span className="porque__bar">
              <i />
            </span>
            <span>{String(itens.length).padStart(2, '0')}</span>
          </div>
        </div>
        <ol className="porque__list">
          {itens.map((it, i) => (
            <li className="porque__item" key={it.t}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <h3>{it.t}</h3>
              <p>{it.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
