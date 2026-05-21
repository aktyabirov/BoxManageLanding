import { useEffect, useState } from 'react'
import { Box, Menu, X } from 'lucide-react'
import { cn } from '../lib/cn'
import { BookDemoButton } from './BookDemoButton'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#ai', label: 'AI' },
  { href: '#platform', label: 'Platform' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#founders', label: 'Founders' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-white/[0.06] bg-[#06060f]/80 backdrop-blur-xl' : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-600/30">
            <Box className="h-[18px] w-[18px] text-white" strokeWidth={2.25} />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            BoxTruck<span className="text-brand-400">Manage</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex">
          <BookDemoButton />
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-400 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="glass-strong border-t border-white/[0.06] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/[0.06]"
              >
                {l.label}
              </a>
            ))}
            <BookDemoButton
              className="w-full rounded-xl bg-brand-600 px-4 py-2.5 text-center"
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </header>
  )
}
