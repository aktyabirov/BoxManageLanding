import { Link } from 'react-router-dom'
import { ArrowLeft, Box } from 'lucide-react'
import { APP_NAME, COMPANY_NAME } from '../config'

export function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-[#06060f] text-slate-300">
      <header className="border-b border-white/[0.06] bg-[#06060f]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
              <Box className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-sm font-bold text-white">{APP_NAME}</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">
          {COMPANY_NAME}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {lastUpdated && (
          <p className="mt-3 text-sm text-slate-500">Last updated: {lastUpdated}</p>
        )}
        <article className="legal-content mt-10 space-y-8 text-sm leading-relaxed sm:text-base">
          {children}
        </article>
      </main>

      <footer className="border-t border-white/[0.06] py-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-6 px-4 text-xs text-slate-600">
          <Link to="/privacy" className="hover:text-slate-400">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-slate-400">
            Terms &amp; Conditions
          </Link>
          <Link to="/delete-account" className="hover:text-slate-400">
            Delete account
          </Link>
          <span>© {new Date().getFullYear()} {COMPANY_NAME}</span>
        </div>
      </footer>
    </div>
  )
}
