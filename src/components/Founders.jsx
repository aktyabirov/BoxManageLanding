import { Building2 } from 'lucide-react'
import { APP_NAME, COMPANY_NAME } from '../config'

export function Founders() {
  return (
    <section id="founders" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Our team
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Built by operators who{' '}
            <span className="text-gradient-brand">know the road</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            {APP_NAME} is developed and owned by {COMPANY_NAME} — focused on modernizing box truck
            operations with practical software and AI, not generic logistics tools.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-lg">
          <div className="flex items-center gap-4 rounded-2xl panel-brand p-5 sm:p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-600/25 text-brand-300 ring-1 ring-brand-500/30">
              <Building2 className="h-7 w-7" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Owned &amp; operated by
              </p>
              <p className="font-display text-xl font-bold text-ink sm:text-2xl">
                {COMPANY_NAME}
              </p>
              <p className="mt-0.5 text-sm text-slate-400">Parent company of {APP_NAME}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
