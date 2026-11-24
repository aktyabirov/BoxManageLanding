import { asset } from '../config'
import { cn } from '../lib/cn'

/* The BoxTruckManage cube, the same file the web app uses on both skins. */
export function LogoMark({ size = 32, className }) {
  return (
    <img
      src={asset('logo/logo-mark.svg')}
      alt=""
      aria-hidden="true"
      draggable={false}
      width={size}
      height={size}
      className={cn('block shrink-0 select-none', className)}
      style={{ width: size, height: size }}
    />
  )
}

/* Mark beside the two-line wordmark (BOXTRUCK over a letter-spaced MANAGE), as in the app. */
export function Logo({ size = 32, className, tone = 'ink' }) {
  const word = Math.round(size * 0.47)
  const sub = Math.max(8, Math.round(word * 0.56))
  const light = tone === 'light'
  return (
    <span className={cn('flex items-center', className)} style={{ gap: Math.round(size * 0.3) }}>
      <LogoMark size={size} />
      <span className="flex flex-col items-start gap-[3px]">
        <span
          className={cn('font-extrabold tracking-[-0.03em]', light ? 'text-white' : 'text-ink')}
          style={{ fontSize: word, lineHeight: 1 }}
        >
          <span className={light ? 'text-[#8AB4FF]' : 'text-brand-ink'}>BOX</span>TRUCK
        </span>
        <span
          className={cn('font-semibold uppercase tracking-[0.38em]', light ? 'text-white/55' : 'text-ink3')}
          style={{ fontSize: sub, lineHeight: 1 }}
        >
          Manage
        </span>
      </span>
    </span>
  )
}
