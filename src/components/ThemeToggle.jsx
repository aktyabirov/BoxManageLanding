import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '../lib/cn'
import { prefersReducedMotion } from '../lib/motion'

const KEY = 'btm-landing-theme'

function apply(theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#070B18' : '#F8FAFC')
}

/**
 * Light and dark, as the demo offers them. The new theme is revealed by a circle that grows
 * from the button (a mask, not a fade), and the sun and moon crossfade with a little scale and blur.
 */
export function ThemeToggle({ className }) {
  const [theme, setTheme] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  )

  useEffect(() => {
    apply(theme)
  }, [theme])

  const toggle = (e) => {
    const next = theme === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* private mode: the choice lasts for this page only */
    }
    if (!document.startViewTransition || prefersReducedMotion()) {
      setTheme(next)
      return
    }
    const r = e.currentTarget.getBoundingClientRect()
    const x = r.left + r.width / 2
    const y = r.top + r.height / 2
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const t = document.startViewTransition(() => {
      apply(next)
      setTheme(next)
    })
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 520, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' }
      )
    })
  }

  const dark = theme === 'dark'
  const icon = 'absolute inset-0 m-auto h-[18px] w-[18px] transition-[opacity,transform,filter] duration-200 ease-out'
  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'relative grid h-11 w-11 place-items-center rounded-xl text-ink2 transition-colors duration-200 hover:bg-sunk hover:text-ink',
        className
      )}
      aria-label={dark ? 'Light theme' : 'Dark theme'}
      title={dark ? 'Light theme' : 'Dark theme'}
    >
      <Moon className={cn(icon, dark ? 'scale-50 opacity-0 blur-[3px]' : 'scale-100 opacity-100 blur-0')} />
      <Sun className={cn(icon, dark ? 'scale-100 opacity-100 blur-0' : 'scale-50 opacity-0 blur-[3px]')} />
    </button>
  )
}
