import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useReveal } from '../lib/motion'
import { useDemoModal } from '../context/DemoModalContext'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { CustomSection } from '../components/CustomSection'
import { DashboardSection } from '../components/DashboardSection'
import { DriversSection } from '../components/DriversSection'
import { MoneySection } from '../components/MoneySection'
import { AppsSection } from '../components/AppsSection'
import { Toolkit } from '../components/Toolkit'
import { PricingSection } from '../components/PricingSection'
import { BookCta } from '../components/BookCta'
import { Faq } from '../components/Faq'
import { Footer } from '../components/Footer'

export function LandingPage({ openForm = false }) {
  const root = useRef(null)
  useReveal(root)
  const { openDemo } = useDemoModal()
  const navigate = useNavigate()
  const location = useLocation()

  /* /book-demo (with any utm tags): open the form once the page has painted, and move the address to
   * the home page so closing the form or reloading behaves like the normal page. The tags stay on
   * the address and go to Telegram with the request. */
  useEffect(() => {
    if (!openForm) return
    const via = location.pathname
    const t = setTimeout(() => {
      openDemo(null, `Direct link ${via}`)
      navigate({ pathname: '/', search: location.search }, { replace: true })
    }, 250)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openForm])
  return (
    <div ref={root} className="relative min-h-screen">
      <a href="#how" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-sheet focus:px-4 focus:py-2 focus:text-ink focus:shadow-[var(--shadow-2)]">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <CustomSection />
        <DashboardSection />
        <DriversSection />
        <MoneySection />
        <AppsSection />
        <Toolkit />
        <PricingSection />
        <BookCta />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
