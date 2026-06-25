import { DemoModalProvider } from './context/DemoModalContext'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { MobileFleetSection } from './components/MobileFleetSection'
import { AiSection } from './components/AiSection'
import { AiChatSection } from './components/AiChatSection'
import { PlatformPreview } from './components/PlatformPreview'
import { Pricing } from './components/Pricing'
import { Founders } from './components/Founders'
import { Cta } from './components/Cta'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <DemoModalProvider>
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <MobileFleetSection />
        <AiSection />
        <AiChatSection />
        <PlatformPreview />
        <Pricing />
        <Founders />
        <Cta />
      </main>
      <Footer />
    </div>
    </DemoModalProvider>
  )
}
