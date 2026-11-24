import { Copy, MessageCircle, Phone, Star } from 'lucide-react'
import { cn } from '../../lib/cn'

/* Small pieces the product shots share, drawn the way the web app draws them. */

export function Stars({ n = 5, size = 12, className }) {
  return (
    <span className={cn('inline-flex items-center gap-[2px]', className)} aria-label={`${n} of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          aria-hidden="true"
          style={{ width: size, height: size }}
          className={i < n ? 'fill-star text-star' : 'fill-line text-line'}
          strokeWidth={1.5}
        />
      ))}
    </span>
  )
}

/* Call (green), Text (blue), Copy (neutral): the three buttons beside every phone number. */
export function ContactBtns({ labels = false, className }) {
  const base = 'inline-grid h-[22px] place-items-center rounded-md'
  if (labels) {
    return (
      <span className={cn('inline-flex items-center gap-1', className)}>
        <span className="chip h-[20px] gap-1 rounded-md bg-green-bg px-1.5 text-[11px] text-green">
          <Phone className="h-3 w-3" aria-hidden="true" />
          Call
        </span>
        <span className="chip h-[20px] gap-1 rounded-md bg-brand-soft px-1.5 text-[11px] text-brand-ink">
          <MessageCircle className="h-3 w-3" aria-hidden="true" />
          Text
        </span>
        <span className={cn(base, 'w-[22px] bg-sunk text-ink3')}>
          <Copy className="h-3 w-3" aria-hidden="true" />
        </span>
      </span>
    )
  }
  return (
    <span className={cn('inline-flex items-center gap-1', className)} aria-hidden="true">
      <span className={cn(base, 'w-[22px] bg-green-bg text-green')}>
        <Phone className="h-3 w-3" />
      </span>
      <span className={cn(base, 'w-[22px] bg-brand-soft text-brand-ink')}>
        <MessageCircle className="h-3 w-3" />
      </span>
      <span className={cn(base, 'w-[22px] bg-sunk text-ink3')}>
        <Copy className="h-3 w-3" />
      </span>
    </span>
  )
}

const TONES = {
  blue: 'bg-brand-soft text-brand-ink',
  green: 'bg-green-bg text-green',
  amber: 'bg-amber-bg text-amber',
  red: 'bg-red-bg text-red',
  violet: 'bg-violet-bg text-violet',
  gray: 'bg-gray-bg text-gray',
  orange: 'bg-accent-soft text-accent-ink',
}

/* Status chip with the coloured dot in front, as on Loads, Tracking and Accounting. */
export function Pill({ tone = 'blue', dot = true, children, className }) {
  return (
    <span className={cn('chip', TONES[tone], className)}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  )
}

export function Avatar({ name, you = false, className }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
  return (
    <span
      className={cn(
        'inline-grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-bold',
        you ? 'bg-brand text-on-brand' : 'bg-sunk2 text-ink2',
        className
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

/* The pick-up / delivery marks: a blue ring and an orange dot joined by a dashed line. */
export function RouteMarks({ className }) {
  return (
    <span className={cn('flex flex-col items-center', className)} aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full border-2 border-brand" />
      <span className="my-0.5 h-5 border-l-2 border-dashed border-ink4" />
      <span className="h-2.5 w-2.5 rounded-full bg-accent" />
    </span>
  )
}

/* "Live" badge from the page heads. */
export function LiveBadge({ className }) {
  return (
    <span className={cn('chip bg-green-bg text-green', className)}>
      <span className="live-dot h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      Live
    </span>
  )
}

/* A product shot: a card with the app's page head inside. */
export function Shot({ title, live, right, children, className, bodyClass }) {
  return (
    <div className={cn('card overflow-hidden text-[13px]', className)}>
      {(title || right) && (
        <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
          {title && <p className="text-[14px] font-bold tracking-tight text-ink">{title}</p>}
          {live && <LiveBadge />}
          {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
        </div>
      )}
      <div className={bodyClass}>{children}</div>
    </div>
  )
}
