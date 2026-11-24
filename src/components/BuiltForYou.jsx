import { Sparkles } from 'lucide-react'
import { cn } from '../lib/cn'

/* The one-line reminder at the end of a product section: what we build on top of it for each fleet. */
export function BuiltForYou({ children, className }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1.5 rounded-2xl border border-dashed border-brand/40 bg-brand-soft/50 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-3',
        className
      )}
      data-reveal
    >
      <span className="flex shrink-0 items-center gap-1.5 text-[13.5px] font-bold text-brand-ink">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        Built for you
      </span>
      <span className="text-[14.5px] leading-relaxed text-ink2">{children}</span>
      <a href="#custom" className="shrink-0 text-[13.5px] font-semibold text-brand-ink hover:underline sm:ml-auto">
        How it works
      </a>
    </div>
  )
}
