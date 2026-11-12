# Jassi Luz · site imersivo 3D

Site one-page de venda para a **Jassi Luz Acessórios** (@jassi_luz), loja de joias em aço inox de Brasília com envio para todo o Brasil. Feito pela IONEXT.

## ⚠️ TODO: confirmar com a cliente antes de publicar

1. **Número de WhatsApp.** O Instagram não informa, então todos os botões usam um número provisório (`5561900000000`). Troque em `content/site.ts` → `whatsapp`.
2. **Domínio definitivo.** `url` em `content/site.ts` (usado em SEO, sitemap, Open Graph). Está como `https://jassiluz.com.br`.
3. **Preços** de cada peça (`pecas[].preco`, hoje vazios e escondidos). Quando preenchidos, aparecem embaixo do nome na grade.
4. **Brincos Flor:** confirmar material/técnica (parecem quilling em papel) e se os ganchos são de aço inox.
5. **Cupom PRIMEIRA5:** confirmar o desconto (o texto diz só "na sua primeira compra").
6. **Loja online** (`jassiluz.lojavirtualnuvem.com.br`) estava em manutenção em 11/11/2026. Confirmar se o link continua valendo.
7. **CNPJ e e-mail** (opcionais, aparecem no rodapé se preenchidos).
8. **Depoimentos:** desligados (`depoimentos.enabled = false`). Só ligue com depoimentos reais e autorizados.

## Conceito

- **Ideia central:** o logo da marca é um sol nascendo no horizonte. O hero recria esse sol em 3D, só com os raios finos e a linha do horizonte em oliva, com um brilho leve no ar. Os raios são estáticos, como no logo.
- **Paleta (tirada do logo):** bege `#e7ddd1` de fundo, oliva `#736115` como cor da marca (títulos, botões, faixa de benefícios, CTA final e rodapé) e branco sobre o oliva. Texto corrido em oliva escuro `#3a300c`.
- **Layout minimalista** (referência: capimestrela.com.br): barra de aviso fina, logo centralizado com menu pequeno, grade de produtos com foto quadrada e nome pequeno, seções centralizadas com muito respiro, sem tipografia gigante.
- **Tipografia:** Cormorant Garamond (ecoa a serifa do logo) nos títulos, com itálico nas palavras de ênfase. Instrument Sans no resto.
- **Movimento:** discreto. Títulos saindo da máscara palavra a palavra, fade suave nos cards, faixa de benefícios rolando devagar.

## Stack

Next.js 16 (App Router, `output: 'export'`) · React Three Fiber + drei · GSAP/ScrollTrigger · Lenis · fontes auto-hospedadas via `next/font/local` (arquivos @fontsource, licença OFL).

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera o site estático em out/
```

Deploy na Vercel: importe o repositório, sem configuração extra.

## Estrutura

```
content/site.ts          TODOS os textos, contatos, peças e links
app/layout.tsx           metadata, fontes, JSON-LD (JewelryStore)
app/page.tsx             monta as seções
components/scene/        cena 3D dos raios do logo (HeroScene) + loader com fallback sem WebGL
components/sections/     Hero, Faixa de benefícios, Peças (grade), Por que inox, Como comprar, CTA final, Footer
components/ui/           Header, WhatsApp flutuante, toggle de animações, Motion (Lenis + GSAP)
public/fotos/            fotos do Instagram da cliente (640×640)
```

Para trocar conteúdo, edite só `content/site.ts`. Para trocar fotos, substitua os arquivos em `public/fotos/` mantendo os nomes. Para mudar as cores, edite as variáveis no topo de `app/globals.css` (e a constante `OLIVE` em `components/scene/HeroScene.tsx`).

## Obrigatórios atendidos

- WhatsApp flutuante + cada peça da grade abre o WhatsApp com mensagem pré-preenchida.
- SEO: `lang="pt-BR"`, um `h1`, title/description, Open Graph + Twitter (`og-image.jpg` 1200×630), JSON-LD, sitemap e robots.
- Toggle **Animações: Auto / Desativadas** no rodapé (salvo em `localStorage`; `prefers-reduced-motion` começa desativado). Desativado = sem Lenis, sem ScrollTrigger, cena parada, faixa parada, conteúdo todo visível.
- Mobile: composição própria da cena (raios no terço superior, título abaixo), fallback em SVG dos raios sem WebGL, canvas pausado fora da tela.

## Créditos

- Fotos: Instagram @jassi_luz (da própria cliente). São 640px; para mais nitidez, peça os originais.
- Fontes: Cormorant Garamond e Instrument Sans (SIL Open Font License).
- Cena 3D: raios gerados em código (sem arquivos externos).
- Revisão visual feita no navegador em 1440×900 e 390×844, com animações em Auto e Desativadas.
