import { site, waLink } from '@/content/site'
import { WhatsIcon } from './Icons'

export default function WhatsAppButton() {
  return (
    <a
      className="wa-float"
      href={waLink('Olá, Jassi! Vim pelo site e quero tirar uma dúvida sobre as peças.')}
      target="_blank"
      rel="noopener"
      aria-label={`Conversar com a ${site.nome} no WhatsApp`}
    >
      <WhatsIcon />
    </a>
  )
}
