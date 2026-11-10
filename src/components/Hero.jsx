import {
  ArrowRight,
  Sparkles,
  Truck,
  Radio,
  Smartphone,
  MailCheck,
  Crosshair,
  FileCheck2,
} from 'lucide-react'
import { APP_NAME, DRIVER_APP_NAME, SITE_URL } from '../config'
import { BookDemoButton } from './BookDemoButton'

const pills = [
  { icon: Radio, label: 'Live load board' },
  { icon: Crosshair, label: 'Nearest-truck matching' },
  { icon: Sparkles, label: 'Rate con to load in seconds' },
  { icon: MailCheck, label: 'AI broker replies' },
  { icon: Smartphone, label: `${DRIVER_APP_NAME} app` },
]

const fitTone = {
  Fits: 'bg-emerald-500/15 text-emerald-300',
  Tight: 'bg-amber-500/15 text-amber-300',
  'Too small': 'bg-rose-500/15 text-rose-300',
}

const boardRows = [
  { lane: 'Dallas, TX → Houston, TX', miles: '239 mi', truck: 'R. Mendez #74', away: '18 mi', fit: 'Fits', bid: 'Bid $1,850', fresh: true },
  { lane: 'Atlanta, GA → Charlotte, NC', miles: '244 mi', truck: 'J. Carter #12', away: '9 mi', fit: 'Fits' },
  { lane: 'Chicago, IL → Indianapolis, IN', miles: '183 mi', truck: 'M. Brooks #31', away: '42 mi', fit: 'Tight' },
  { lane: 'Phoenix, AZ → Los Angeles, CA', miles: '372 mi', truck: 'T. Wilson #08', away: '64 mi', fit: 'Too small' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_130%_75%_at_50%_-15%,oklch(0.6954_0.1547_58.38/0.12),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <a
            href="#driver-app"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-200 opacity-0 animate-slide-up hover:bg-brand-500/15"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            <Smartphone className="h-4 w-4 text-brand-400" />
            New: {DRIVER_APP_NAME} is live on iOS &amp; Android
            <ArrowRight className="h-3.5 w-3.5" />
          </a>

          <h1
            className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl opacity-0 animate-slide-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            Loads come in.{' '}
            <span className="text-gradient-brand">The right truck is already picked.</span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl opacity-0 animate-slide-up"
            style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
          >
            {APP_NAME} is the dispatch platform for box truck fleets: a live load board that
            matches every load to your nearest truck, broker emails with AI replies, rate cons
            turned into loads in seconds, and payouts and factoring in the same place.
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
              href="#load-board"
              className="inline-flex items-center gap-2 rounded-2xl btn-quiet px-8 py-4 text-base font-semibold backdrop-blur hover:border-brand-500/50 hover:bg-line"
            >
              See the load board
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
          <div className="relative overflow-hidden rounded-2xl border border-line bg-sheet">
            <div className="flex items-center gap-2 border-b border-hair bg-sunk px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="mx-auto text-xs text-slate-500">{SITE_URL.replace('https://', '')} — Load board</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hair px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-sm font-semibold text-ink">Live</span>
                <span className="text-xs text-slate-500">New loads stream in as they post</span>
              </div>
              <span className="text-xs text-slate-500">Sorted by nearest truck</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-hair text-xs text-slate-500">
                    <th className="px-4 py-2.5 font-medium sm:px-6">Lane</th>
                    <th className="px-4 py-2.5 font-medium">Nearest truck</th>
                    <th className="px-4 py-2.5 font-medium">Vehicle</th>
                    <th className="px-4 py-2.5 font-medium">Driver app</th>
                  </tr>
                </thead>
                <tbody>
                  {boardRows.map((row) => (
                    <tr
                      key={row.lane}
                      className={`border-b border-hair/60 ${row.fresh ? 'bg-brand-500/[0.06]' : ''}`}
                    >
                      <td className="px-4 py-3 sm:px-6">
                        <p className="font-medium text-ink">{row.lane}</p>
                        <p className="text-xs text-slate-500">{row.miles}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="flex items-center gap-1.5 text-slate-200">
                          <Truck className="h-3.5 w-3.5 text-brand-400" />
                          {row.truck}
                        </p>
                        <p className="text-xs text-slate-500">{row.away} from pickup</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${fitTone[row.fit]}`}>
                          {row.fit}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {row.bid ? (
                          <span className="inline-flex items-center gap-1 rounded-full chip-brand px-2.5 py-0.5 text-xs font-medium">
                            <Smartphone className="h-3 w-3" />
                            {row.bid}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-600">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="absolute -right-10 top-[40%] hidden animate-float rounded-xl glass-strong p-4 xl:block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                <FileCheck2 className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Rate con check</p>
                <p className="text-sm font-semibold text-ink">Matches the deal</p>
              </div>
            </div>
          </div>

          <div className="absolute -left-10 bottom-6 hidden animate-float-delayed rounded-xl glass-strong p-4 xl:block">
            <p className="text-xs text-slate-500">Driver bid from the app</p>
            <p className="font-display text-lg font-bold text-brand-300">$1,850</p>
            <p className="text-xs text-emerald-400">R. Mendez · 18 mi away</p>
          </div>
        </div>
      </div>
    </section>
  )
}
