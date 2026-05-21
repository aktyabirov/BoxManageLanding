import { Sparkles, Upload, MapPin, Clock, CheckCircle2, Cpu } from 'lucide-react'

const steps = [
  { icon: Upload, title: 'Upload rate confirmation', desc: 'Drop a PDF or image — no manual typing.' },
  { icon: Cpu, title: 'AI extracts every field', desc: 'GPT & Gemini parse broker-specific formats.' },
  { icon: MapPin, title: 'Stops auto-populate', desc: 'Pickup, drop, partial, and trailer stops built for you.' },
  { icon: CheckCircle2, title: 'Load ready to dispatch', desc: 'Review, assign driver, and go — in under 30 seconds.' },
]

export function AiSection() {
  return (
    <section id="ai" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-950/50 via-transparent to-transparent" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-brand-600/15 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              AI-powered
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Create loads in{' '}
              <span className="text-gradient-brand">seconds, not hours</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-400">
              Upload a rate confirmation and let BoxTruckManage&apos;s AI read brokers, lanes, rates,
              and every stop. Your team reviews instead of retyping — cutting data entry errors
              and dispatch lag dramatically.
            </p>

            <ul className="mt-8 space-y-4">
              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <li key={step.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600/20 text-brand-400 ring-1 ring-brand-500/30">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        <span className="mr-2 text-brand-500">{i + 1}.</span>
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-500">{step.desc}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a14] shadow-2xl">
              <div className="border-b border-white/[0.06] px-5 py-4">
                <p className="text-sm font-medium text-white">New load — AI assist</p>
                <p className="text-xs text-slate-500">Rate con uploaded · parsing complete</p>
              </div>

              <div className="relative p-5">
                <div className="relative overflow-hidden rounded-xl border border-dashed border-brand-500/40 bg-brand-500/5 p-8 text-center">
                  <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-brand-400 to-transparent animate-scan" />
                  <Upload className="mx-auto h-8 w-8 text-brand-400" />
                  <p className="mt-3 text-sm font-medium text-brand-200">rate_con_2847.pdf</p>
                  <p className="mt-1 text-xs text-slate-500">Parsed in 11.4s</p>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    { label: 'Broker', value: 'Swift Logistics LLC' },
                    { label: 'Lane', value: 'Dallas, TX → Houston, TX' },
                    { label: 'Rate', value: '$2,840.00' },
                    { label: 'Stops', value: '4 locations extracted' },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-lg bg-white/[0.03] px-4 py-2.5 ring-1 ring-white/[0.06]"
                    >
                      <span className="text-xs text-slate-500">{row.label}</span>
                      <span className="text-sm font-medium text-slate-200">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-3 ring-1 ring-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm text-emerald-300">Load draft ready — assign driver</span>
                  <Clock className="ml-auto h-4 w-4 text-slate-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
