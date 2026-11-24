import { cn } from '../lib/cn'
import { useDemoModal } from '../context/DemoModalContext'

/* Opens the "Book a demo" form (a person walks you through it). */
export function BookDemoButton({ children = 'Book a demo', className, onClick }) {
  const { openDemo } = useDemoModal()
  return (
    <button
      type="button"
      onClick={(e) => {
        openDemo(e)
        onClick?.()
      }}
      className={cn('btn btn-quiet', className)}
    >
      {children}
    </button>
  )
}
