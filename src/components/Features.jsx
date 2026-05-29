import {
  Package,
  CreditCard,
  Wallet,
  Receipt,
  BarChart3,
  Users,
  Building2,
  Search,
  Tags,
  FileText,
  MessageSquare,
} from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'AI fleet chat',
    description:
      'Ask “Who’s our best dispatcher?” or “Highest paying loads?” — AI analyzes your database and returns rankings, charts, and tables instantly.',
    accent: 'cyan',
  },
  {
    icon: Package,
    title: 'Load management',
    description:
      'Create, track, and update loads with multi-stop routing, status workflows, tags, dispatcher notes, and full audit history.',
    accent: 'brand',
  },
  {
    icon: CreditCard,
    title: 'Billing & invoices',
    description:
      'Batch billing, broker management, RTS submission, and pay summaries — built for how box truck carriers actually invoice.',
    accent: 'cyan',
  },
  {
    icon: Wallet,
    title: 'Payroll & settlements',
    description:
      'Driver statements, load assignments, deductions, and payout tracking in one place instead of scattered spreadsheets.',
    accent: 'emerald',
  },
  {
    icon: Receipt,
    title: 'Driver expenses',
    description:
      'Capture fuel, tolls, maintenance, and other costs with clear visibility into what each driver and load actually costs.',
    accent: 'amber',
  },
  {
    icon: BarChart3,
    title: 'Analytics dashboard',
    description:
      'Revenue trends, utilization charts, driver performance, status breakdowns, and monthly company reports at a glance.',
    accent: 'brand',
  },
  {
    icon: Users,
    title: 'Drivers & hiring',
    description:
      'Onboard drivers, manage statuses, documents, and HR notes — linked directly to loads and payroll.',
    accent: 'cyan',
  },
  {
    icon: Building2,
    title: 'Multi-company ops',
    description:
      'Run multiple carriers or divisions with role-based access so each team sees only what they need.',
    accent: 'emerald',
  },
  {
    icon: Search,
    title: 'Global search',
    description:
      'Find loads, drivers, brokers, and records instantly from anywhere in the platform.',
    accent: 'amber',
  },
  {
    icon: Tags,
    title: 'Tags & statuses',
    description:
      'Custom tags and status pipelines that match your dispatch workflow — filter and report on what matters.',
    accent: 'brand',
  },
]

const accentMap = {
  brand: 'from-brand-500/20 text-brand-400 ring-brand-500/20',
  cyan: 'from-cyan-500/20 text-cyan-400 ring-cyan-500/20',
  emerald: 'from-emerald-500/20 text-emerald-400 ring-emerald-500/20',
  amber: 'from-amber-500/20 text-amber-400 ring-amber-500/20',
}

export function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Everything in one platform
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            From dispatch to dollars —{' '}
            <span className="text-gradient-brand">no more tool sprawl</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            BoxTruckManage replaces disconnected spreadsheets, billing software, and payroll
            hacks with a single system designed for box truck operations.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon
            const accent = accentMap[f.accent]
            return (
              <article
                key={f.title}
                className="group rounded-2xl glass p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] hover:-translate-y-0.5"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${accent} ring-1`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.description}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-12 flex items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-8">
          <FileText className="h-5 w-5 shrink-0 text-brand-400" />
          <p className="text-center text-sm text-slate-400 sm:text-base">
            <span className="font-medium text-slate-200">Plus:</span> user invites, company settings,
            best-profit load highlights, and batch load operations — all included.
          </p>
        </div>
      </div>
    </section>
  )
}
