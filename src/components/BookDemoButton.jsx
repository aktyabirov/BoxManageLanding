import { cn } from '../lib/cn'
import { useDemoModal } from '../context/DemoModalContext'

export function BookDemoButton({
  children = 'Book demo',
  className,
  variant = 'primary',
  onClick,
}) {
  const { openDemo } = useDemoModal()

  const handleClick = () => {
    openDemo()
    onClick?.()
  }

  const variants = {
    primary:
      'rounded-xl btn-brand px-5 py-2.5 text-sm font-semibold hover:btn-brand-hover',
    secondary:
      'rounded-2xl btn-quiet px-8 py-4 text-base font-semibold backdrop-blur hover:border-brand-500/50 hover:bg-line',
    hero: 'group inline-flex items-center justify-center gap-2 rounded-2xl btn-brand px-8 py-4 text-base font-semibold hover:btn-brand-hover hover:-translate-y-px',
    cta: 'inline-flex items-center justify-center gap-2 rounded-2xl btn-brand px-8 py-4 text-base font-semibold hover:btn-brand-hover hover:-translate-y-px',
    card: 'block w-full rounded-xl py-3.5 text-center text-sm font-semibold transition-all',
    cardHighlight:
      'block w-full rounded-xl btn-brand py-3.5 text-center text-sm font-semibold hover:btn-brand-hover',
    cardOutline:
      'block w-full rounded-xl btn-quiet py-3.5 text-center text-sm font-semibold hover:border-brand-500/50 hover:bg-line',
  }

  return (
    <button type="button" onClick={handleClick} className={cn(variants[variant], className)}>
      {children}
    </button>
  )
}
