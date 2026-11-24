import { ArrowUpRight } from 'lucide-react'
import { cn } from '../lib/cn'
import { demoHref } from '../config'

/* The main call to action: the live demo, no sign-up. `place` goes into utm_content. */
export function TryDemoButton({ place, children = 'Try the live demo', variant = 'primary', className, size }) {
  return (
    <a
      href={demoHref(place)}
      target="_blank"
      rel="noopener"
      className={cn('btn group', variant === 'quiet' ? 'btn-quiet' : 'btn-primary', size === 'lg' && 'btn-lg', className)}
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  )
}
