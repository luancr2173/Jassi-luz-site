import { MotionProvider } from '@/components/ui/MotionProvider'
import Motion from '@/components/ui/Motion'
import Header from '@/components/ui/Header'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Hero from '@/components/sections/Hero'
import Manifesto, { Marquee } from '@/components/sections/Manifesto'
import Pecas from '@/components/sections/Pecas'
import Porque from '@/components/sections/Porque'
import Galeria from '@/components/sections/Galeria'
import { ComoComprar, Final, Footer } from '@/components/sections/Final'

export default function Page() {
  return (
    <MotionProvider>
      <Motion />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Pecas />
        <Porque />
        <Galeria />
        <ComoComprar />
        <Final />
      </main>
      <Footer />
      <WhatsAppButton />
    </MotionProvider>
  )
}
