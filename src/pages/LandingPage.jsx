import { useRef } from 'react'
import { useReveal } from '../lib/motion'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { DashboardSection } from '../components/DashboardSection'
import { DriversSection } from '../components/DriversSection'
import { MoneySection } from '../components/MoneySection'
import { AppsSection } from '../components/AppsSection'
import { Toolkit } from '../components/Toolkit'
import { DemoCta } from '../components/DemoCta'
import { Faq } from '../components/Faq'
import { Footer } from '../components/Footer'

export function LandingPage() {
  const root = useRef(null)
  useReveal(root)
  return (
    <div ref={root} className="relative min-h-screen">
      <a href="#how" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-sheet focus:px-4 focus:py-2 focus:text-ink focus:shadow-[var(--shadow-2)]">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <DashboardSection />
        <DriversSection />
        <MoneySection />
        <AppsSection />
        <Toolkit />
        <DemoCta />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
