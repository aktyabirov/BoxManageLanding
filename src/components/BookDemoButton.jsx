import { ArrowRight } from 'lucide-react'
import { cn } from '../lib/cn'
import { useDemoModal } from '../context/DemoModalContext'

/* The main call to action: opens the Book a demo form. `place` says which button it was, and goes
 * with the request to Telegram. */
export function BookDemoButton({ children = 'Book a demo', place, variant = 'primary', size, arrow = false, className, onClick }) {
  const { openDemo } = useDemoModal()
  return (
    <button
      type="button"
      onClick={(e) => {
        openDemo(e, place ? `${place} button` : '')
        onClick?.()
      }}
      className={cn('btn group', variant === 'quiet' ? 'btn-quiet' : 'btn-primary', size === 'lg' && 'btn-lg', className)}
    >
      {children}
      {arrow && (
        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
      )}
    </button>
  )
}
