import { Box } from 'lucide-react'
import { APP_NAME } from '../config'
import { useDemoModal } from '../context/DemoModalContext'

const footerLinks = [
  { href: '#features', label: 'Features' },
  { href: '#ai', label: 'AI' },
  { href: '#platform', label: 'Platform' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#founders', label: 'Founders' },
]

export function Footer() {
  const { openDemo } = useDemoModal()

  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <Box className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="font-display text-sm font-bold text-white">{APP_NAME}</p>
            <p className="text-xs text-slate-600">Box Truck Management Platform</p>
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
          <button
            type="button"
            onClick={openDemo}
            className="text-sm text-slate-500 transition-colors hover:text-slate-300"
          >
            Book demo
          </button>
        </nav>

        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
