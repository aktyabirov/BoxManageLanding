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
      'rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:shadow-brand-500/40 hover:brightness-110',
    secondary:
      'rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all hover:border-white/20 hover:bg-white/[0.08]',
    hero: 'group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand-600/30 transition-all hover:scale-[1.02] hover:shadow-brand-500/40',
    cta: 'inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-[#06060f] transition-all hover:bg-slate-100',
    card: 'block w-full rounded-xl py-3.5 text-center text-sm font-semibold transition-all',
    cardHighlight:
      'block w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:brightness-110',
    cardOutline:
      'block w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 text-center text-sm font-semibold text-white transition-all hover:bg-white/[0.08]',
  }

  return (
    <button type="button" onClick={handleClick} className={cn(variants[variant], className)}>
      {children}
    </button>
  )
}
