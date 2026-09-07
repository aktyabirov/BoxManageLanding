import { Link } from 'react-router-dom'
import { LogoMark } from './Logo'
import { APP_NAME, COMPANY_NAME } from '../config'
import { useDemoModal } from '../context/DemoModalContext'

const footerLinks = [
  { href: '#features', label: 'Features' },
  { href: '#mobile-fleet', label: 'Mobile' },
  { href: '#ai-chat', label: 'AI Chat' },
  { href: '#ai-loads', label: 'AI Loads' },
  { href: '#platform', label: 'Platform' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#founders', label: 'Founders' },
]

export function Footer() {
  const { openDemo } = useDemoModal()

  return (
    <footer className="border-t border-hair py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <LogoMark className="-ml-1 h-10 w-10" />
          <div>
            <p className="font-display text-sm font-bold text-ink">{APP_NAME}</p>
            <p className="text-xs text-slate-600">by {COMPANY_NAME}</p>
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-500 transition-colors hover:text-slate-300"
            >
              {l.label}
            </a>
          ))}
          <Link to="/privacy" className="text-sm text-slate-500 transition-colors hover:text-slate-300">
            Privacy
          </Link>
          <Link to="/terms" className="text-sm text-slate-500 transition-colors hover:text-slate-300">
            Terms
          </Link>
          <Link to="/deleteaccount" className="text-sm text-slate-500 transition-colors hover:text-slate-300">
            Delete account
          </Link>
          <button
            type="button"
            onClick={openDemo}
            className="text-sm text-slate-500 transition-colors hover:text-slate-300"
          >
            Book demo
          </button>
        </nav>

        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
