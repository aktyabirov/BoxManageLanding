import { Check, Sparkles } from 'lucide-react'
import { cn } from '../lib/cn'
import { BookDemoButton } from './BookDemoButton'

const plans = [
  {
    name: 'Growth',
    rate: '1%',
    rateLabel: 'of monthly gross',
    grossRange: '$0 – $99,999',
    description: 'Pay as you grow — ideal for owner-operators and fleets under $100K monthly gross.',
    features: [
      'Full platform access',
      'Unlimited loads & drivers',
      'AI rate con parsing',
      'Billing, payroll & expenses',
      'Analytics dashboard',
      'Email support',
    ],
    cta: 'Book demo',
    highlighted: false,
    isCustom: false,
  },
  {
    name: 'Scale',
    rate: '0.8%',
    rateLabel: 'of monthly gross',
    grossRange: '$100,000 – $299,999',
    description: 'Lower rate for established carriers with higher monthly volume.',
    features: [
      'Everything in Growth',
      'Priority support',
      'Multi-user roles',
      'Batch billing & RTS',
      'Advanced analytics',
      'Dedicated onboarding',
    ],
    cta: 'Book demo',
    highlighted: true,
    badge: 'Best value',
    isCustom: false,
  },
  {
    name: 'Enterprise',
    rate: null,
    rateLabel: 'custom pricing',
    grossRange: '$300,000+ monthly gross',
    description: 'Tailored rates and terms for high-volume operations and multi-company fleets.',
    features: [
      'Custom fee structure',
      'Multi-company operations',
      'API & integrations',
      'Custom AI broker profiles',
      'Dedicated account manager',
      'SLA & security review',
    ],
    cta: 'Book demo',
    highlighted: false,
    isCustom: true,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Pricing
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pricing that{' '}
            <span className="text-gradient-brand">scales with your revenue</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Simple, performance-based fees tied to monthly gross. No flat subscriptions —
            you pay a percentage of what you actually move.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                'relative flex flex-col rounded-2xl p-8 transition-all duration-300',
                plan.highlighted
                  ? 'border-2 border-brand-500/50 bg-gradient-to-b from-brand-950/80 to-[#0a0a14] shadow-2xl shadow-brand-600/20 scale-[1.02] lg:scale-105'
                  : 'glass hover:border-white/15'
              )}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                  <Sparkles className="h-3 w-3" />
                  {plan.badge}
                </span>
              )}

              <h3 className="font-display text-xl font-bold text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{plan.description}</p>

              <div className="mt-6">
                {plan.isCustom ? (
                  <span className="font-display text-4xl font-extrabold text-white">Custom</span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl font-extrabold text-white">
                      {plan.rate}
                    </span>
                    <span className="text-slate-500">{plan.rateLabel}</span>
                  </div>
                )}
                <p className="mt-2 rounded-lg bg-white/[0.04] px-3 py-2 text-sm font-medium text-brand-200 ring-1 ring-white/[0.06]">
                  Monthly gross: {plan.grossRange}
                </p>
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    {f}
                  </li>
                ))}
              </ul>

              <BookDemoButton
                variant={plan.highlighted ? 'cardHighlight' : 'cardOutline'}
                className="mt-8"
              >
                {plan.cta}
              </BookDemoButton>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          Fees calculated on monthly gross revenue. Tier applied based on your fleet&apos;s gross for the billing month.
        </p>
      </div>
    </section>
  )
}
