import { Radio, Crosshair, Gavel, Mail, Bell, Smartphone, Truck, History } from 'lucide-react'

const points = [
  {
    icon: Radio,
    title: 'Streams in live',
    desc: 'Loads land on the board as brokers post them. No refreshing, no second tab.',
  },
  {
    icon: Crosshair,
    title: 'Matched to your fleet',
    desc: 'Each load shows the nearest available truck, the distance to pickup and whether the vehicle fits.',
  },
  {
    icon: Gavel,
    title: 'Bid with the margin in front of you',
    desc: 'Enter the broker rate and driver pay and the profit bar updates as you type.',
  },
  {
    icon: Mail,
    title: 'Sent from your own email',
    desc: 'The bid goes out from the dispatcher’s mailbox, so the broker replies to a real person.',
  },
]

function BidWindow() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-sheet">
      <div className="flex items-center justify-between border-b border-hair bg-sunk px-5 py-3">
        <div>
          <p className="text-sm font-semibold text-ink">Bid · Dallas, TX → Houston, TX</p>
          <p className="text-xs text-slate-500">239 mi · Pickup tomorrow 08:00 CST · 26ft box</p>
        </div>
        <Bell className="h-4 w-4 text-brand-400" />
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between rounded-xl panel-hi px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400">
              <Truck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-ink">R. Mendez · Truck #74</p>
              <p className="text-xs text-slate-500">18 mi from pickup · Available</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
            Fits
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-xl chip-brand px-4 py-2.5 text-xs">
          <Smartphone className="h-3.5 w-3.5 shrink-0" />
          <span>
            <span className="font-semibold">Driver bid $1,850</span> from the app ·
            “Can be there by 7:30”
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Broker rate', value: '$2,400' },
            { label: 'Driver pay', value: '$1,850' },
          ].map((f) => (
            <div key={f.label} className="rounded-xl field px-4 py-2.5">
              <p className="text-[11px] text-slate-500">{f.label}</p>
              <p className="figure font-display text-lg font-bold text-ink">{f.value}</p>
            </div>
          ))}
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-slate-500">Profit</span>
            <span className="figure font-semibold text-emerald-300">$550 · 22.9%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-sunk">
            <div className="h-full w-[23%] rounded-full bg-emerald-400" />
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-2 rounded-xl btn-brand py-3 text-sm font-semibold">
          <Mail className="h-4 w-4" />
          Send bid from dispatch@yourfleet.com
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <History className="h-3.5 w-3.5" />
          Bid history keeps every offer on this load, from you and from drivers.
        </div>
      </div>
    </div>
  )
}

export function LoadBoardSection() {
  return (
    <section id="load-board" className="relative overflow-hidden py-24 lg:py-32 section-tint">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
              Load board
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              See the load.{' '}
              <span className="text-gradient-brand">Know the truck. Send the bid.</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-400">
              The board does the matching your dispatchers used to do in their heads, so the
              first good bid on a load is yours.
            </p>

            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {points.map(({ icon: Icon, title, desc }) => (
                <li key={title}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600/20 text-brand-400 ring-1 ring-brand-500/30">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-3 font-medium text-ink">{title}</p>
                  <p className="mt-1 text-sm text-slate-500">{desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <BidWindow />
        </div>
      </div>
    </section>
  )
}
