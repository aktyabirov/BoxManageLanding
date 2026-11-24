import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { COMPANY_NAME } from '../config'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

export function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-ground text-ink2">
      <header className="sticky top-0 z-40 border-b border-line bg-[var(--glass)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" className="flex min-h-11 items-center gap-2 text-sm font-semibold text-ink2 transition-colors hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link to="/" aria-label="BoxTruckManage home" className="rounded-lg p-1">
              <Logo size={30} />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="eyebrow">{COMPANY_NAME}</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">{title}</h1>
        {lastUpdated && <p className="mt-3 text-sm text-ink3">Last updated: {lastUpdated}</p>}
        <article className="legal-content mt-10 space-y-8 text-[15px] leading-relaxed sm:text-base">{children}</article>
      </main>

      <footer className="border-t border-line py-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-6 px-4 text-[13px] text-ink3">
          <Link to="/privacy" className="hover:text-ink">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-ink">
            Terms &amp; Conditions
          </Link>
          <Link to="/deleteaccount" className="hover:text-ink">
            Delete account
          </Link>
          <span>
            © {new Date().getFullYear()} {COMPANY_NAME}
          </span>
        </div>
      </footer>
    </div>
  )
}
