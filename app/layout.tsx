import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { site } from '@/content/site'
import './globals.css'

const serif = localFont({
  src: [
    { path: './fonts/cormorant-garamond-latin-300-normal.woff2', weight: '300', style: 'normal' },
    { path: './fonts/cormorant-garamond-latin-300-italic.woff2', weight: '300', style: 'italic' },
    { path: './fonts/cormorant-garamond-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/cormorant-garamond-latin-400-italic.woff2', weight: '400', style: 'italic' },
    { path: './fonts/cormorant-garamond-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/cormorant-garamond-latin-500-italic.woff2', weight: '500', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

const sans = localFont({
  src: [
    { path: './fonts/instrument-sans-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/instrument-sans-latin-500-normal.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seo.title,
  description: site.seo.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: site.url,
    siteName: site.marca,
    title: site.seo.title,
    description: site.seo.description,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Jassi Luz · joias em aço inox' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seo.title,
    description: site.seo.description,
    images: ['/og-image.jpg'],
  },
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
}

export const viewport: Viewport = {
  themeColor: '#e7ddd1',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'JewelryStore',
  name: site.marca,
  url: site.url,
  image: `${site.url}/og-image.jpg`,
  logo: `${site.url}/apple-touch-icon.png`,
  description: site.seo.description,
  telephone: `+${site.whatsapp}`,
  address: { '@type': 'PostalAddress', addressLocality: site.cidade, addressRegion: site.uf, addressCountry: 'BR' },
  areaServed: { '@type': 'Country', name: 'Brasil' },
  sameAs: [site.instagram, site.loja],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script
          // aplica a preferência de animação antes da pintura, evitando piscar
          dangerouslySetInnerHTML={{
            __html: `try{var m=localStorage.getItem('jl-motion');if(m==='off'||(!m&&matchMedia('(prefers-reduced-motion: reduce)').matches))document.documentElement.dataset.motion='off'}catch(e){}`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  )
}
