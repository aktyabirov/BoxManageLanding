import {
  Smartphone,
  MapPin,
  Gavel,
  Radio,
  Bot,
  Phone,
  Building2,
  CheckCircle2,
  Navigation,
  DollarSign,
  Users,
} from 'lucide-react'
import { APP_NAME } from '../config'

function PhoneFrame({ children }) {
  return (
    <div className="relative mx-auto w-[260px] shrink-0">
      <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-brand-600/40 to-cyan-500/30 blur-2xl" />
      <div className="relative overflow-hidden rounded-[2rem] border-[3px] border-slate-700 bg-[#0a0a12] shadow-2xl">
        <div className="flex items-center justify-center gap-2 border-b border-white/[0.06] bg-[#12121c] py-2">
          <span className="h-1 w-8 rounded-full bg-slate-700" />
        </div>
        <div className="min-h-[420px]">{children}</div>
        <div className="flex justify-center border-t border-white/[0.06] py-2">
          <span className="h-1 w-20 rounded-full bg-slate-700" />
        </div>
      </div>
    </div>
  )
}

function DriverAppMock() {
  return (
    <PhoneFrame>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Driver app</p>
            <p className="font-display text-sm font-bold text-white">Marcus T.</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live GPS
          </span>
        </div>

        <div className="relative mt-4 h-36 overflow-hidden rounded-xl bg-[#12121f] ring-1 ring-white/[0.08]">
          <div className="absolute inset-0 opacity-40">
            <svg viewBox="0 0 200 120" className="h-full w-full">
              <path d="M0,60 L40,45 L80,70 L120,35 L160,50 L200,30" fill="none" stroke="oklch(0.52 0.26 285)" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <span className="absolute -inset-3 animate-ping rounded-full bg-brand-500/30" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 shadow-lg shadow-brand-600/50">
                <Navigation className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 rounded-lg bg-black/60 px-2 py-1 text-[10px] text-slate-300 backdrop-blur">
            <MapPin className="mb-0.5 inline h-3 w-3 text-brand-400" /> Dallas, TX
          </div>
        </div>

        <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Available to bid
        </p>
        <div className="mt-2 space-y-2">
          {[
            { lane: 'DAL → HOU', rate: '$2,840', miles: '239 mi' },
            { lane: 'AUS → SA', rate: '$1,920', miles: '80 mi' },
          ].map((load) => (
            <div
              key={load.lane}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{load.lane}</p>
                  <p className="text-xs text-slate-500">{load.miles}</p>
                </div>
                <p className="font-display text-sm font-bold text-emerald-400">{load.rate}</p>
              </div>
              <button
                type="button"
                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 py-2 text-xs font-semibold text-white"
              >
                <Gavel className="h-3.5 w-3.5" />
                Place bid
              </button>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}

function DispatcherBidsMock() {
  const rows = [
    { id: 'BM-3201', lane: 'DAL → HOU', bids: 3, top: '$2,840', driver: 'Marcus T.', status: 'Open' },
    { id: 'BM-3198', lane: 'ATL → CLT', bids: 2, top: '$1,950', driver: 'Jen L.', status: 'Review' },
    { id: 'BM-3195', lane: 'CHI → IND', bids: 1, top: '$1,480', driver: 'Mike R.', status: 'Open' },
  ]

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a14] shadow-xl">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-white">Load board</p>
          <p className="text-[10px] text-slate-500">Dispatcher view · live driver bids</p>
        </div>
        <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-300">
          6 bids today
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[340px] text-left text-xs">
          <thead>
            <tr className="border-b border-white/[0.06] text-slate-500">
              <th className="px-3 py-2 font-medium">Load</th>
              <th className="px-3 py-2 font-medium">Lane</th>
              <th className="px-3 py-2 font-medium">Bids</th>
              <th className="px-3 py-2 font-medium">Top bid</th>
              <th className="px-3 py-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                <td className="px-3 py-2.5 font-medium text-brand-300">{row.id}</td>
                <td className="px-3 py-2.5 text-slate-300">{row.lane}</td>
                <td className="px-3 py-2.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/15 px-2 py-0.5 text-cyan-300">
                    <Users className="h-3 w-3" />
                    {row.bids}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <span className="font-semibold text-white">{row.top}</span>
                  <p className="text-[10px] text-slate-500">{row.driver}</p>
                </td>
                <td className="px-3 py-2.5">
                  <button
                    type="button"
                    className="rounded-lg bg-emerald-600/90 px-2 py-1 text-[10px] font-semibold text-white"
                  >
                    Bid broker
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-white/[0.06] bg-brand-950/40 px-4 py-2.5">
        <p className="text-[10px] text-slate-400">
          <span className="font-medium text-brand-300">BM-3201:</span> Marcus T. bid $2,840 ·
          Dispatcher submitted $2,900 to Swift Logistics
        </p>
      </div>
    </div>
  )
}

function AiAgentMock() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/10 bg-[#0a0a14] p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-cyan-600">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">AI Booking Agent</p>
            <p className="text-[10px] text-slate-500">Negotiating load #BM-3201</p>
          </div>
          <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400">
            <Radio className="h-3 w-3" />
            Active
          </span>
        </div>

        <div className="space-y-2.5">
          <div className="flex gap-2">
            <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
            <div className="rounded-xl rounded-tl-sm bg-white/[0.05] px-3 py-2 text-xs text-slate-300 ring-1 ring-white/[0.06]">
              <p className="mb-0.5 text-[10px] font-medium text-slate-500">Agent → Broker</p>
              Box truck available DAL→HOU Thursday. Best rate on your posted load?
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <div className="rounded-xl rounded-tr-sm bg-brand-600/20 px-3 py-2 text-xs text-brand-100 ring-1 ring-brand-500/30">
              <p className="mb-0.5 text-right text-[10px] font-medium text-brand-400">Broker</p>
              $2,750 all in, pickup 8 AM
            </div>
          </div>
          <div className="flex gap-2">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
            <div className="rounded-xl rounded-tl-sm bg-white/[0.05] px-3 py-2 text-xs text-slate-300 ring-1 ring-white/[0.06]">
              <p className="mb-0.5 text-[10px] font-medium text-slate-500">Agent → Driver</p>
              Marcus, broker at $2,750 DAL→HOU Thu 8 AM. Can you cover?
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <div className="rounded-xl rounded-tr-sm bg-cyan-600/15 px-3 py-2 text-xs text-cyan-100 ring-1 ring-cyan-500/25">
              <p className="mb-0.5 text-right text-[10px] font-medium text-cyan-400">Driver</p>
              Yes — 45 min from pickup
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2.5 ring-1 ring-emerald-500/25">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <div>
            <p className="text-xs font-semibold text-emerald-300">Load booked autonomously</p>
            <p className="text-[10px] text-slate-500">Rate con sent · driver assigned · dispatch notified</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const pillars = [
  {
    icon: Smartphone,
    title: 'Driver mobile app',
    desc: 'iOS & Android app for your fleet. Drivers share live GPS, see available freight, and stay connected to dispatch.',
  },
  {
    icon: Gavel,
    title: 'Load bidding',
    desc: 'Drivers bid on loads from their phone. Dispatchers see every bid on the load list and submit the best offer to the broker.',
  },
  {
    icon: Bot,
    title: 'AI booking agents',
    desc: 'AI agents negotiate with brokers and coordinate with drivers — booking loads end-to-end without phone tag.',
  },
]

export function MobileFleetSection() {
  return (
    <section id="mobile-fleet" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-transparent to-brand-950/20" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-200">
            <Smartphone className="h-4 w-4" />
            Mobile + AI booking
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Drivers on the road.{' '}
            <span className="text-gradient-brand">Dispatch in control.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            {APP_NAME} connects your driver app, dispatcher load board, and AI agents into one
            workflow — from live location and bids to fully automated load booking.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl glass p-5 text-center sm:text-left">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 sm:mx-0">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-display font-semibold text-white">{title}</h3>
              <p className="mt-1.5 text-sm text-slate-500">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[260px_1fr_320px] lg:gap-8">
          <div className="flex flex-col items-center lg:items-start">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-slate-500 lg:text-left">
              1 · Driver app
            </p>
            <DriverAppMock />
            <p className="mt-4 max-w-[260px] text-center text-xs text-slate-500 lg:text-left">
              Share location in real time. Browse loads and place bids in seconds.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
              2 · Dispatcher load board
            </p>
            <DispatcherBidsMock />
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { icon: MapPin, label: 'Live driver GPS on map' },
                { icon: DollarSign, label: 'Compare driver bids' },
                { icon: Gavel, label: 'Bid to broker in one click' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400"
                >
                  <Icon className="h-3.5 w-3.5 text-brand-400" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
              3 · AI booking agents
            </p>
            <AiAgentMock />
            <p className="mt-4 text-xs text-slate-500">
              Agents talk to brokers and drivers simultaneously — confirming rate, timing, and
              assignment while your team focuses on exceptions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
