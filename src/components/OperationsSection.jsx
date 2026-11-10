import { Trophy, CalendarDays, Wallet, Landmark, UserPlus, PenLine, Link2, ChevronRight } from 'lucide-react'

const leaders = [
  { medal: '🥇', name: 'Aziz K.', gross: '$48,920', profit: '$9,410' },
  { medal: '🥈', name: 'Laura P.', gross: '$41,300', profit: '$8,120' },
  { medal: '🥉', name: 'Daniel R.', gross: '$37,850', profit: '$6,980' },
]

/* 1 = bonus day hit, 0 = missed, null = upcoming. */
const calendar = [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, null, null, null, null, null, null, null]

function Pipeline({ stages }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {stages.map((s, i) => (
        <span key={s.label} className="flex items-center gap-1.5">
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${s.tone}`}>
            {s.label} <span className="figure opacity-80">· {s.count}</span>
          </span>
          {i < stages.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-slate-600" />}
        </span>
      ))}
    </div>
  )
}

export function OperationsSection() {
  return (
    <section id="operations" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Team &amp; money
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Know who’s winning.{' '}
            <span className="text-gradient-brand">Know who gets paid.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            The dashboard shows how each dispatcher is doing, and accounting carries every load
            through to the driver’s payout and the factoring company.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl panel p-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              <h3 className="font-display text-lg font-semibold text-ink">Dispatch leaderboard</h3>
            </div>
            <div className="mt-5 space-y-2">
              {leaders.map((l) => (
                <div key={l.name} className="flex items-center justify-between rounded-xl panel-hi px-4 py-3">
                  <span className="flex items-center gap-3 text-sm font-medium text-ink">
                    <span className="text-lg" aria-hidden="true">{l.medal}</span>
                    {l.name}
                  </span>
                  <span className="text-right">
                    <span className="figure block text-sm font-semibold text-ink">{l.gross}</span>
                    <span className="figure block text-xs text-emerald-300">{l.profit} profit</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-brand-400" />
              <p className="text-sm font-medium text-ink">Performance calendar</p>
              <span className="ml-auto text-xs text-slate-500">Bonus when daily goal is hit</span>
            </div>
            <div className="mt-3 grid grid-cols-7 gap-1.5">
              {calendar.map((d, i) => (
                <div
                  key={i}
                  className={`flex aspect-square items-center justify-center rounded-lg text-[11px] ${
                    d === 1
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : d === 0
                        ? 'bg-white/[0.04] text-slate-500'
                        : 'border border-dashed border-hair text-slate-600'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl panel p-6">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-emerald-400" />
                <h3 className="font-display text-lg font-semibold text-ink">Driver payouts</h3>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                Quick Pay fees, holds and expenses are applied before anything goes out.
              </p>
              <div className="mt-4">
                <Pipeline
                  stages={[
                    { label: 'Pending', count: 14, tone: 'bg-white/[0.06] text-slate-300' },
                    { label: 'Confirmed', count: 9, tone: 'bg-amber-500/15 text-amber-300' },
                    { label: 'Paid', count: 52, tone: 'bg-emerald-500/15 text-emerald-300' },
                  ]}
                />
              </div>
            </div>

            <div className="rounded-2xl panel p-6">
              <div className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-cyan-400" />
                <h3 className="font-display text-lg font-semibold text-ink">Factoring</h3>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                Track every delivered load until the money lands, and flag short pays.
              </p>
              <div className="mt-4">
                <Pipeline
                  stages={[
                    { label: 'Good to invoice', count: 6, tone: 'bg-white/[0.06] text-slate-300' },
                    { label: 'Invoiced', count: 11, tone: 'bg-cyan-500/15 text-cyan-300' },
                    { label: 'Paid', count: 48, tone: 'bg-emerald-500/15 text-emerald-300' },
                  ]}
                />
              </div>
            </div>

            <div className="rounded-2xl panel p-6">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-brand-400" />
                <h3 className="font-display text-lg font-semibold text-ink">Driver onboarding</h3>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Link2, label: 'One invite link' },
                  { icon: PenLine, label: 'W-9 & agreement e-sign' },
                  { icon: UserPlus, label: 'AI fills the profile' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 rounded-xl panel-hi px-3 py-2.5 text-xs text-slate-300">
                    <Icon className="h-4 w-4 shrink-0 text-brand-400" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
