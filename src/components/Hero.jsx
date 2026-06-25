import {
  ArrowRight,
  Sparkles,
  Truck,
  Zap,
  Shield,
  MessageSquare,
  Smartphone,
  Bot,
} from 'lucide-react'
import { APP_NAME, SITE_URL } from '../config'
import { BookDemoButton } from './BookDemoButton'

const pills = [
  { icon: Smartphone, label: 'Driver mobile app' },
  { icon: Bot, label: 'AI booking agents' },
  { icon: MessageSquare, label: 'AI fleet insights' },
  { icon: Sparkles, label: 'AI rate con parsing' },
  { icon: Zap, label: 'Loads in seconds' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="pointer-events-none absolute -left-32 top-20 h-[500px] w-[500px] rounded-full bg-brand-600/20 blur-[120px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-20 top-40 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[100px] animate-pulse-glow" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-200 opacity-0 animate-slide-up"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            <Truck className="h-4 w-4 text-brand-400" />
            Built for box truck fleets &amp; owner-operators
          </div>

          <h1
            className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl opacity-0 animate-slide-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            Run your box truck business{' '}
            <span className="text-gradient-brand">from one command center</span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl opacity-0 animate-slide-up"
            style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
          >
            {APP_NAME} combines AI-powered load creation, billing, payroll, driver expenses,
            and real-time dashboards — so dispatchers spend less time on paperwork and more
            time moving freight.
          </p>

          <div
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row opacity-0 animate-slide-up"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            <BookDemoButton variant="hero">
              Book demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </BookDemoButton>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all hover:border-white/20 hover:bg-white/[0.08]"
            >
              View pricing
            </a>
          </div>

          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-3 opacity-0 animate-slide-up"
            style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}
          >
            {pills.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-slate-300 sm:text-sm"
              >
                <Icon className="h-3.5 w-3.5 text-brand-400" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div
          className="relative mx-auto mt-16 max-w-5xl opacity-0 animate-slide-up lg:mt-20"
          style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-brand-600/20 via-transparent to-accent/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c18] shadow-2xl glow-brand">
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="mx-auto text-xs text-slate-500">{SITE_URL.replace('https://', '')} — Dashboard</span>
            </div>
            <div className="grid gap-4 p-4 sm:grid-cols-4 sm:p-6">
              {[
                { label: 'Active loads', value: '47', delta: '+12%', color: 'from-brand-500/20' },
                { label: 'Revenue (MTD)', value: '$284K', delta: '+18%', color: 'from-emerald-500/20' },
                { label: 'Fleet utilization', value: '94%', delta: '+6%', color: 'from-cyan-500/20' },
                { label: 'Driver payout', value: '$62K', delta: 'On track', color: 'from-amber-500/20' },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className={`rounded-xl bg-gradient-to-br ${kpi.color} to-transparent p-4 ring-1 ring-white/[0.06]`}
                >
                  <p className="text-xs text-slate-500">{kpi.label}</p>
                  <p className="mt-1 font-display text-2xl font-bold text-white">{kpi.value}</p>
                  <p className="mt-1 text-xs font-medium text-emerald-400">{kpi.delta}</p>
                </div>
              ))}
            </div>
            <div className="mx-4 mb-4 h-32 rounded-xl bg-gradient-to-t from-brand-900/40 to-transparent sm:mx-6 sm:mb-6 sm:h-40">
              <svg viewBox="0 0 400 120" className="h-full w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.52 0.26 285)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="oklch(0.52 0.26 285)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,90 L40,75 L80,82 L120,55 L160,60 L200,35 L240,45 L280,25 L320,40 L360,15 L400,20 L400,120 L0,120 Z"
                  fill="url(#chartFill)"
                />
                <path
                  d="M0,90 L40,75 L80,82 L120,55 L160,60 L200,35 L240,45 L280,25 L320,40 L360,15 L400,20"
                  fill="none"
                  stroke="oklch(0.62 0.22 285)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          <div className="absolute -right-4 top-1/4 hidden animate-float rounded-xl glass-strong p-4 shadow-xl lg:block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                <Shield className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Load #BM-2847</p>
                <p className="text-sm font-semibold text-white">AI parsed · 12s</p>
              </div>
            </div>
          </div>

          <div
            className="absolute -left-6 bottom-1/4 hidden animate-float-delayed rounded-xl glass-strong p-4 shadow-xl lg:block"
          >
            <p className="text-xs text-slate-500">Best profit today</p>
            <p className="font-display text-lg font-bold text-brand-300">$2,840</p>
            <p className="text-xs text-emerald-400">Dallas → Houston</p>
          </div>
        </div>
      </div>
    </section>
  )
}
