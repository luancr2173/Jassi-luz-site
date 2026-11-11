import { site } from '@/content/site'
import Title from '../ui/Title'

export default function Porque() {
  const { titulo, texto, itens } = site.porque
  return (
    <section className="porque" id="porque">
      <div className="porque__head">
        <Title lines={titulo} />
        <p>{texto}</p>
      </div>
      <ol className="porque__list">
        {itens.map((it, i) => (
          <li className="porque__item" key={it.t} data-fade>
            <span className="porque__n">{String(i + 1).padStart(2, '0')}</span>
            <h3>{it.t}</h3>
            <p>{it.d}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
