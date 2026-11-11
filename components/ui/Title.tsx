import { Fragment, createElement } from 'react'

type Props = { lines: string[]; as?: 'h1' | 'h2' | 'h3'; className?: string; id?: string }

/**
 * Título em linhas mascaradas, palavra por palavra (para a animação de entrada).
 * Trechos entre *asteriscos* viram itálico dourado. Os espaços ficam fora dos spans.
 */
export default function Title({ lines, as = 'h2', className = '', id }: Props) {
  return createElement(
    as,
    { className: `display ${className}`, 'data-split': '', id },
    lines.map((line, li) => {
      const parts = line.split(/(\*[^*]+\*)/).filter(Boolean)
      const words: { w: string; em: boolean }[] = []
      parts.forEach((p) => {
        const em = p.startsWith('*')
        p.replace(/\*/g, '')
          .split(' ')
          .filter(Boolean)
          .forEach((w) => words.push({ w, em }))
      })
      return (
        <span className="line" key={li}>
          {words.map((x, i) => (
            <Fragment key={i}>
              {i > 0 && ' '}
              <span className="word">{x.em ? <em>{x.w}</em> : x.w}</span>
            </Fragment>
          ))}
        </span>
      )
    }),
  )
}
