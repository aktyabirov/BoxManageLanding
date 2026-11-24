import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '../lib/cn'
import { prefersReducedMotion } from '../lib/motion'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { BookDemoButton } from './BookDemoButton'
import { TryDemoButton } from './TryDemoButton'

export const NAV_LINKS = [
  { id: 'how', label: 'How it works' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'drivers', label: 'Drivers' },
  { id: 'money', label: 'Money' },
  { id: 'apps', label: 'Apps' },
  { id: 'faq', label: 'FAQ' },
]

/* Which section is under the bar: the last one whose top has passed the middle of the screen. */
function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    let raf = 0
    const run = () => {
      raf = 0
      const mid = window.innerHeight * 0.4
      let cur = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= mid) cur = id
      }
      setActive(cur)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run)
    }
    run()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [ids])
  return active
}

const IDS = NAV_LINKS.map((l) => l.id)

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [menuMounted, setMenuMounted] = useState(false)
  const active = useActiveSection(IDS)
  const linksRef = useRef(null)
  const barRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* One indicator for all links: it slides to the active one (transform only). */
  useLayoutEffect(() => {
    const bar = barRef.current
    const box = linksRef.current
    if (!bar || !box) return
    const a = active && box.querySelector(`[data-id="${active}"]`)
    if (!a) {
      bar.style.opacity = '0'
      return
    }
    const x = a.offsetLeft + 12
    const w = a.offsetWidth - 24
    bar.style.opacity = '1'
    bar.style.transform = `translateX(${x}px) scaleX(${w / 100})`
  }, [active])

  /* Mobile menu: drops from the button (scale 0.95 to 1), leaves 20% faster than it came. */
  useEffect(() => {
    if (open) setMenuMounted(true)
  }, [open])
  useEffect(() => {
    const el = menuRef.current
    if (!menuMounted || !el) return
    if (prefersReducedMotion()) {
      if (!open) setMenuMounted(false)
      return
    }
    if (open) {
      el.animate(
        [
          { opacity: 0, transform: 'scale(0.95) translateY(-6px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 220, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
      )
    } else {
      el.animate(
        [
          { opacity: 1, transform: 'none' },
          { opacity: 0, transform: 'scale(0.95) translateY(-6px)' },
        ],
        { duration: 176, easing: 'cubic-bezier(0.55, 0, 0.75, 0.2)', fill: 'forwards' }
      ).onfinish = () => setMenuMounted(false)
    }
  }, [open, menuMounted])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-out',
        scrolled || open ? 'border-line bg-[var(--glass)] backdrop-blur-xl backdrop-saturate-150' : 'border-transparent bg-transparent'
      )}
    >
      <nav className="wrap flex h-[68px] items-center gap-4" aria-label="Main">
        <a href="#top" className="-ml-1 rounded-lg p-1" aria-label="BoxTruckManage home">
          <Logo size={34} />
        </a>

        <div ref={linksRef} className="relative ml-6 hidden items-center lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              data-id={l.id}
              href={`#${l.id}`}
              className={cn(
                'rounded-lg px-3 py-2.5 text-[14.5px] font-semibold transition-colors duration-150',
                active === l.id ? 'text-ink' : 'text-ink2 hover:text-ink'
              )}
              aria-current={active === l.id ? 'true' : undefined}
            >
              {l.label}
            </a>
          ))}
          <span
            ref={barRef}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0.5 left-0 h-[2px] w-[100px] origin-left rounded-full bg-brand opacity-0 transition-[transform,opacity] duration-300 [transition-timing-function:var(--e-io)]"
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <BookDemoButton className="hidden md:inline-flex" />
          <TryDemoButton place="nav" className="hidden sm:inline-flex">
            Try the demo
          </TryDemoButton>
          <button
            type="button"
            className="relative grid h-11 w-11 place-items-center rounded-xl text-ink2 hover:bg-sunk lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className={cn('absolute h-5 w-5 transition-[opacity,transform,filter] duration-200', open ? 'scale-50 opacity-0 blur-[2px]' : 'opacity-100')} />
            <X className={cn('absolute h-5 w-5 transition-[opacity,transform,filter] duration-200', open ? 'opacity-100' : 'scale-50 opacity-0 blur-[2px]')} />
          </button>
        </div>
      </nav>

      {menuMounted && (
        <div ref={menuRef} id="mobile-menu" className="wrap origin-top-right pb-4 lg:hidden">
          <div className="card-lg p-2">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center rounded-xl px-4 text-[16px] font-semibold text-ink hover:bg-sunk"
                style={{ animation: open ? `rise 260ms var(--e-out) ${i * 30}ms both` : undefined }}
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 grid gap-2 border-t border-line p-2 pt-3 sm:grid-cols-2">
              <TryDemoButton place="nav-mobile" className="w-full" />
              <BookDemoButton className="w-full" onClick={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
