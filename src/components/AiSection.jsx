import { Sparkles, Upload, MapPin, Clock, CheckCircle2, Cpu, IdCard } from 'lucide-react'
import { APP_NAME } from '../config'

const steps = [
  { icon: Upload, title: 'Drop the rate confirmation', desc: 'A PDF or a photo, from any broker. No typing.' },
  { icon: Cpu, title: 'AI fills the load', desc: 'Broker, reference numbers, rate and every stop, read in 5–10 seconds.' },
  { icon: MapPin, title: 'Times in the right time zone', desc: 'Pickup and delivery windows are set in each facility’s local time.' },
  { icon: CheckCircle2, title: 'Review and dispatch', desc: 'Check the fields, attach the files, assign the truck and go.' },
]

export function AiSection() {
  return (
    <section id="ai-loads" className="relative overflow-hidden py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              Fill from a rate con
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Create loads in{' '}
              <span className="text-gradient-brand">seconds, not minutes</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-400">
              Drop a rate confirmation and {APP_NAME} reads it for you. Your team reviews a filled
              load instead of retyping one, so fewer typos make it to the driver.
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
                      <p className="font-medium text-ink">
                        <span className="mr-2 text-brand-500">{i + 1}.</span>
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-500">{step.desc}</p>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 flex items-start gap-3 rounded-xl border border-dashed border-line px-4 py-3">
              <IdCard className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
              <p className="text-sm text-slate-400">
                <span className="font-medium text-slate-200">Same trick for onboarding:</span> AI
                reads a new driver’s documents and fills their profile for you.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl panel">
              <div className="border-b border-hair px-5 py-4">
                <p className="text-sm font-medium text-ink">New load · Fill from a rate con</p>
                <p className="text-xs text-slate-500">Rate con read · review before saving</p>
              </div>

              <div className="relative p-5">
                <div className="relative overflow-hidden rounded-xl border border-dashed border-brand-500/40 bg-brand-500/5 p-8 text-center">
                  <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-brand-400 to-transparent animate-scan" />
                  <Upload className="mx-auto h-8 w-8 text-brand-400" />
                  <p className="mt-3 text-sm font-medium text-brand-200">swift_ratecon_88412.pdf</p>
                  <p className="mt-1 text-xs text-slate-500">Read in 7.2s</p>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    { label: 'Broker', value: 'Swift Logistics LLC' },
                    { label: 'Pickup', value: 'Dallas, TX · 08:00 CST' },
                    { label: 'Delivery', value: 'Houston, TX · 15:00 CST' },
                    { label: 'Rate', value: '$2,350.00' },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-lg bg-white/[0.03] px-4 py-2.5 ring-1 ring-hair"
                    >
                      <span className="text-xs text-slate-500">{row.label}</span>
                      <span className="text-sm font-medium text-slate-200">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-3 ring-1 ring-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm text-emerald-300">Load ready · assign R. Mendez #74</span>
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
