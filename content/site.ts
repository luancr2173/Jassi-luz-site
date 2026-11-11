// Todo o conteúdo do site num lugar só. Para reaproveitar o projeto, troque este arquivo.
// Itens marcados com TODO precisam ser confirmados pela cliente antes de publicar.

export const site = {
  nome: 'Jassi Luz',
  marca: 'Jassi Luz Acessórios',
  // TODO: domínio definitivo (usado em SEO, sitemap e Open Graph)
  url: 'https://jassiluz.com.br',
  cidade: 'Brasília',
  uf: 'DF',

  // TODO: número de WhatsApp real (55 + DDD + número, só dígitos). O Instagram não informa.
  whatsapp: '5561900000000',
  instagram: 'https://www.instagram.com/jassi_luz/',
  instagramUser: '@jassi_luz',
  loja: 'https://jassiluz.lojavirtualnuvem.com.br',
  cupom: 'PRIMEIRA5',
  // TODO: confirmar o que o cupom dá (ex.: 5% na primeira compra)
  cupomDescricao: 'na sua primeira compra',
  // TODO: CNPJ (se houver) e e-mail de contato
  cnpj: '',
  email: '',

  seo: {
    title: 'Jassi Luz · Joias em aço inox que não escurecem',
    description:
      'Colares, brincos e pulseiras em aço inox em Brasília: não oxidam, não escurecem e podem molhar. Envio para todo o Brasil.',
  },

  hero: {
    rotulo: 'Acessórios em aço inox · Brasília · Envio para todo o Brasil',
    // As palavras entre * ficam em itálico oliva
    titulo: ['Joias que', 'não *escurecem.*'],
    subtitulo:
      'Peças delicadas em aço inoxidável pra usar no banho, na academia, no mar e na piscina, e continuar brilhando no dia seguinte.',
    ctaPrincipal: 'Escolher pelo WhatsApp',
    ctaSecundario: 'Ver as peças',
    msg: 'Olá, Jassi! Vi o site e quero conhecer as peças disponíveis.',
  },

  marquee: ['Não oxida', 'Não escurece', 'Não enferruja', 'Hipoalergênico', 'Pode molhar', 'Envio para todo o Brasil'],

  pecasTitulo: ['As *queridinhas*'],
  pecasTexto: 'Aço inoxidável com acabamento polido, pra ficar no corpo o dia todo. Toque na peça e peça direto no WhatsApp.',

  // TODO: preços e disponibilidade de cada peça
  pecas: [
    {
      nome: 'Colar Trevo',
      tipo: 'Colar · aço inox',
      descricao: 'Pingente vazado de trevo de quatro folhas em corrente fina. Sorte que não sai do pescoço.',
      foto: '/fotos/colar-trevo.jpg',
      preco: '', // TODO
      msg: 'Olá! Vi no site e quero o Colar Trevo. Ainda tem?',
    },
    {
      nome: 'Colar Coração Cristal',
      tipo: 'Colar · aço inox + zircônia',
      descricao: 'Coração lapidado que pega a luz de qualquer ângulo. O presente que não tem erro.',
      foto: '/fotos/colar-coracao-cristal.jpg',
      preco: '', // TODO
      msg: 'Olá! Vi no site e quero o Colar Coração Cristal. Ainda tem?',
    },
    {
      nome: 'Argola Coração',
      tipo: 'Brinco · aço inox',
      descricao: 'Argolinha em formato de coração, com fecho click. Pra dormir, treinar e não tirar mais.',
      foto: '/fotos/argola-coracao.jpg',
      preco: '', // TODO
      msg: 'Olá! Vi no site e quero a Argola Coração. Ainda tem?',
    },
    {
      nome: 'Pulseira Elos',
      tipo: 'Pulseira · aço inox',
      descricao: 'Elos espirais com fecho lagosta. Fina o bastante pra usar sozinha, firme o bastante pra combinar.',
      foto: '/fotos/pulseira-elos.jpg',
      preco: '', // TODO
      msg: 'Olá! Vi no site e quero a Pulseira Elos. Ainda tem?',
    },
    {
      nome: 'Brincos Flor',
      tipo: 'Brinco · artesanal',
      // TODO: confirmar material/técnica (parecem quilling em papel) e se os ganchos são de aço inox
      descricao: 'Feitos à mão, um a um, em cores vivas. Cada par sai único.',
      foto: '/fotos/brincos-flor.jpg',
      preco: '', // TODO
      msg: 'Olá! Vi no site e quero saber dos Brincos Flor artesanais. Quais cores têm?',
    },
  ],

  porque: {
    titulo: ['Por que *aço inox?*'],
    texto: 'Joia boa é a que você esquece no corpo. Banho, academia, mar, e ela continua com a luz do primeiro dia.',
    itens: [
      { t: 'Não oxida', d: 'Nada de manchas esverdeadas no pescoço ou na orelha.' },
      { t: 'Não escurece', d: 'O brilho de hoje é o brilho do ano que vem.' },
      { t: 'Não enferruja', d: 'Suor, água e perfume não estragam a peça.' },
      { t: 'Hipoalergênico', d: 'Mais tranquilidade pra pele sensível.' },
      { t: 'Pode molhar', d: 'Banho, academia, mar e piscina. Sem tirar.' },
    ],
  },

  comoComprar: [
    { t: 'Escolha a peça', d: 'Aqui no site ou no Instagram @jassi_luz.' },
    { t: 'Chame no WhatsApp', d: 'A gente confirma estoque, tamanho e frete na hora.' },
    { t: 'Use o cupom', d: 'PRIMEIRA5 na primeira compra.' },
    { t: 'Receba em casa', d: 'Envio de Brasília para todo o Brasil.' },
  ],

  // Depoimentos: deixe enabled=false até ter depoimentos reais com autorização.
  depoimentos: {
    enabled: false,
    itens: [
      { texto: 'TODO: depoimento real de cliente', nome: 'TODO: nome', cidade: 'TODO: cidade' },
    ],
  },

  final: {
    titulo: ['Seu próximo brilho é de *aço.*'],
    texto: 'Chama no WhatsApp, fala qual peça te chamou atenção e a gente separa pra você.',
    msg: 'Olá, Jassi! Quero fazer meu primeiro pedido com o cupom PRIMEIRA5.',
  },
}

export function waLink(msg: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`
}
