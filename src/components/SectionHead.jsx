import { cn } from '../lib/cn'

/* Eyebrow, heading and lede for a section; arrives in three beats. */
export function SectionHead({ eyebrow, title, lede, center = false, className, children }) {
  return (
    <div className={cn(center ? 'mx-auto max-w-[940px] text-center' : 'max-w-[880px]', className)}>
      {eyebrow && (
        <p className="eyebrow" data-reveal>
          {eyebrow}
        </p>
      )}
      <h2 className="h-section mt-4 text-ink" data-reveal style={{ '--i': 1 }}>
        {title}
      </h2>
      {lede && (
        <p className={cn('lede mt-5', center && 'mx-auto max-w-[760px]')} data-reveal style={{ '--i': 2 }}>
          {lede}
        </p>
      )}
      {children}
    </div>
  )
}
