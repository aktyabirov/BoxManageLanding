import { cn } from '../lib/cn'

/* The BoxManage cube, straight from public/logo. `logo-mark-dark.svg` is the dark-skin
 * cut — its three faces are exactly --logo-f1 / --logo-f2 / --logo-f3. */
export function LogoMark({ className }) {
  return (
    <img
      src="/logo/logo-mark-dark.svg"
      alt=""
      aria-hidden="true"
      draggable={false}
      className={cn('select-none', className ?? 'h-8 w-8')}
    />
  )
}

/* Mark + wordmark, the pair used in the navbar, footer and legal header. */
export function Logo({ className, markClassName, textClassName }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark className={markClassName} />
      <span className={cn('font-display font-bold tracking-tight text-ink', textClassName)}>
        BoxTruck<span className="text-brand-400">Manage</span>
      </span>
    </span>
  )
}
