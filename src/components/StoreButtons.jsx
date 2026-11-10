import { cn } from '../lib/cn'
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../config'

function AppleGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.19-1.73-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.75 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.71.71 2.88.69 1.19-.02 1.94-1.08 2.67-2.14.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.31-.89-2.33-3.54zM14.2 6.13c.61-.74 1.02-1.76.91-2.78-.88.04-1.94.59-2.57 1.32-.56.65-1.06 1.69-.93 2.69.98.08 1.98-.5 2.59-1.23z" />
    </svg>
  )
}

function PlayGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="#34d399" d="M3.6 2.3 13.4 12l-9.8 9.7c-.35-.2-.6-.6-.6-1.1V3.4c0-.5.25-.9.6-1.1z" />
      <path fill="#fcd34d" d="m16.8 8.6-3.4 3.4 3.4 3.4 3.8-2.2c.8-.5.8-1.7 0-2.2l-3.8-2.4z" />
      <path fill="#fda4af" d="M13.4 12 3.6 21.7c.35.2.8.2 1.2 0l12-6.3-3.4-3.4z" />
      <path fill="#7dd3fc" d="M4.8 2.3c-.4-.2-.85-.2-1.2 0L13.4 12l3.4-3.4-12-6.3z" />
    </svg>
  )
}

const stores = [
  { href: APP_STORE_URL, glyph: AppleGlyph, small: 'Download on the', big: 'App Store' },
  { href: GOOGLE_PLAY_URL, glyph: PlayGlyph, small: 'Get it on', big: 'Google Play' },
]

export function StoreButtons({ className }) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {stores.map(({ href, glyph: Glyph, small, big }) => (
        <a
          key={big}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-xl btn-quiet px-4 py-2.5 hover:border-brand-500/50 hover:bg-line"
        >
          <Glyph className="h-6 w-6 text-ink" />
          <span className="text-left leading-tight">
            <span className="block text-[10px] text-slate-400">{small}</span>
            <span className="block font-display text-sm font-semibold text-ink">{big}</span>
          </span>
        </a>
      ))}
    </div>
  )
}
