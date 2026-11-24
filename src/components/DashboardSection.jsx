import { useRef } from 'react'
import { ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/cn'
import { useCountUp, useInView } from '../lib/motion'
import { SectionHead } from './SectionHead'
import { StateMap, LOADS } from './mock/StateMap'
import { Avatar, LiveBadge } from './mock/ui'
import { BuiltForYou } from './BuiltForYou'

function Count({ to, start, format = (n) => Math.round(n).toLocaleString('en-US') }) {
  const v = useCountUp(to, { start, duration: 1000 })
  return <>{format(v)}</>
}

function Kpi({ label, value, sub, chip, chipTone = 'green', start, format }) {
  return (
    <div className="rounded-xl border border-line bg-sheet p-3.5">
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-ink2">
        {label}
        {chip && (
          <span className={cn('chip h-[19px] px-1.5 text-[11px]', chipTone === 'green' ? 'bg-green-bg text-green' : 'bg-red-bg text-red')}>
            <ArrowUp className="h-3 w-3" aria-hidden="true" />
            {chip}
          </span>
        )}
      </p>
      <p className="tnum mt-1 text-[26px] font-extrabold leading-none tracking-tight text-ink">
        {typeof value === 'number' ? <Count to={value} start={start} format={format} /> : value}
      </p>
      <p className="mt-1.5 truncate text-[12px] text-ink3">{sub}</p>
    </div>
  )
}

const TOP = Object.entries(LOADS)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 8)
const TRUCKS = { TX: 2, OH: 3, NC: 0, SC: 0, FL: 2, PA: 1, CA: 0, MO: 3 }
const NAMES = { TX: 'Texas', OH: 'Ohio', NC: 'North Carolina', SC: 'South Carolina', FL: 'Florida', PA: 'Pennsylvania', CA: 'California', MO: 'Missouri' }

const LEADERS = [
  ['Jordan Reyes', 18, 106, 10845],
  ['Devon Carter', 21, 107, 10325],
  ['Kayla Brooks', 13, 116, 5600],
  ['Tyler Nguyen', 12, 112, 4980],
  ['Sofia Alvarez', 9, 109, 4140],
  ['Marcus Bell', 7, 106, 2495],
]

/* Running total of profit booked (thousands) and loads booked, day by day to the 23rd. */
const PROFIT = [0, 1.2, 2.4, 3.4, 4.0, 4.1, 7.6, 8.0, 10.3, 11.9, 12.6, 14.5, 16.0, 16.5, 17.4, 18.6, 19.6, 21.0, 25.2, 27.6, 29.3, 31.4, 37.1]
const LOADS_BOOKED = [0, 3, 5, 7, 8, 8, 14, 15, 19, 22, 24, 27, 30, 31, 33, 35, 37, 39, 47, 52, 55, 59, 77]

function Chart({ start }) {
  const W = 560
  const H = 230
  const pad = { l: 52, r: 30, t: 10, b: 26 }
  const x = (i) => pad.l + (i / 29) * (W - pad.l - pad.r)
  const yP = (v) => pad.t + (1 - v / 40) * (H - pad.t - pad.b)
  const yL = (v) => pad.t + (1 - v / 80) * (H - pad.t - pad.b)
  const line = (arr, y) => arr.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const p = line(PROFIT, yP)
  const area = `${p} L${x(22)} ${yP(0)} L${x(0)} ${yP(0)} Z`
  const draw = (delay) => ({
    strokeDasharray: 1,
    strokeDashoffset: start ? 0 : 1,
    transition: `stroke-dashoffset 1400ms var(--e-io) ${delay}ms`,
  })
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Running total for November: profit booked climbs to $37,110 and loads booked to 77 by the 23rd.">
      {[0, 10, 20, 30, 40].map((v) => (
        <g key={v}>
          <line x1={pad.l} x2={W - pad.r} y1={yP(v)} y2={yP(v)} stroke="var(--hair)" />
          <text x={pad.l - 8} y={yP(v) + 4} textAnchor="end" fontSize="11" fill="var(--ink3)">
            {v ? `$${v}.0k` : '$0'}
          </text>
          <text x={W - pad.r + 8} y={yP(v) + 4} fontSize="11" fill="var(--ink3)">
            {v * 2}
          </text>
        </g>
      ))}
      {[1, 5, 10, 15, 20, 23, 25, 30].map((d) => (
        <text key={d} x={x(d - 1)} y={H - 6} textAnchor="middle" fontSize="11" fontWeight={d === 23 ? 700 : 400} fill={d === 23 ? 'var(--brand-ink)' : 'var(--ink3)'}>
          {d}
        </text>
      ))}
      {/* The area is revealed left to right by a mask, the lines draw themselves. */}
      <defs>
        <clipPath id="reveal">
          <rect x="0" y="0" height={H} width={W} style={{ transform: start ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transformBox: 'fill-box', transition: 'transform 1400ms var(--e-io)' }} />
        </clipPath>
      </defs>
      <path d={area} fill="var(--brand)" opacity="0.12" clipPath="url(#reveal)" />
      <path d={line(LOADS_BOOKED, yL)} fill="none" stroke="var(--accent)" strokeWidth="2.25" strokeLinejoin="round" pathLength="1" style={draw(80)} />
      <path d={p} fill="none" stroke="var(--brand)" strokeWidth="2.25" strokeLinejoin="round" pathLength="1" style={draw(0)} />
      <g style={{ opacity: start ? 1 : 0, transition: 'opacity 240ms var(--e-out) 1400ms' }}>
        <circle cx={x(22)} cy={yL(77)} r="4" fill="var(--accent)" stroke="var(--sheet)" strokeWidth="2" />
        <circle cx={x(22)} cy={yP(37.1)} r="4" fill="var(--brand)" stroke="var(--sheet)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function DashboardSection() {
  const ref = useRef(null)
  const start = useInView(ref, { once: true, threshold: 0.2 })
  const lb = useRef(null)
  const lbStart = useInView(lb, { once: true, threshold: 0.3 })

  return (
    <section id="dashboard" className="relative border-t border-line bg-sheet py-24 lg:py-32">
      <div className="wrap">
        <SectionHead
          eyebrow="Dashboard"
          title="See the market, your bids and your fleet at a glance"
          lede="Where the loads are today, how fast the team bids, how many brokers answer, and where every truck is. Each number compares itself with the same stretch of the period before."
        />

        <div ref={ref} className="mt-12 rounded-[24px] border border-line bg-sunk/50 p-3 sm:p-4" data-reveal style={{ '--i': 3 }}>
          <div className="flex flex-wrap items-center gap-3 px-1 pb-3">
            <p className="text-[17px] font-bold tracking-tight text-ink">Dashboard</p>
            <LiveBadge />
            <div className="ml-auto flex items-center gap-1 rounded-xl border border-line bg-sheet p-1 text-[12px]">
              {['Today', '7 days', 'This month', '30 days'].map((t, i) => (
                <span key={t} className={cn('rounded-lg px-2.5 py-1', i === 0 ? 'bg-sunk font-semibold text-ink' : 'text-ink2', i === 3 && 'hidden sm:inline')}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.05fr_1.55fr_0.7fr]">
            <div className="rounded-2xl border border-line bg-sheet/60 p-3">
              <p className="th mb-2 px-0.5">The market</p>
              <div className="grid grid-cols-2 gap-2.5">
                <Kpi label="Loads posted" value={1225} chip="251%" sub="Posted today, all carriers" start={start} />
                <Kpi label="Avg bid speed" value="5m 47s" chip="9.5%" chipTone="red" sub="From posting to our first bid" />
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-sheet/60 p-3">
              <p className="th mb-2 px-0.5">Our bids</p>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                <Kpi label="Bids we sent" value={32} chip="700%" sub="By 7 dispatchers" start={start} />
                <Kpi label="Broker response" value={19} sub="59.4% of 32 got a reply" start={start} />
                <Kpi label="Loads booked" value={3} sub="9.4% of 32 bids" start={start} />
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-sheet/60 p-3">
              <p className="th mb-2 px-0.5">Our fleet</p>
              <div className="rounded-xl border border-line bg-sheet p-3.5">
                <p className="text-[12.5px] text-ink2">Trucks</p>
                <p className="tnum mt-1 text-[26px] font-extrabold leading-none tracking-tight text-ink">
                  <Count to={30} start={start} />
                </p>
                <p className="mt-1.5 text-[12px] text-ink3">In 18 states</p>
                <div className="mt-2.5 flex h-1.5 gap-1 overflow-hidden rounded-full">
                  {[['var(--brand)', 52], ['color-mix(in srgb, var(--brand) 55%, var(--sheet))', 28], ['color-mix(in srgb, var(--brand) 30%, var(--sheet))', 20]].map(([c, w], i) => (
                    <span key={i} className="h-full origin-left rounded-full" style={{ width: `${w}%`, background: c, transform: start ? 'scaleX(1)' : 'scaleX(0)', transition: `transform 700ms var(--e-out) ${300 + i * 80}ms` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1.7fr_1fr]">
            <div className="rounded-2xl border border-line bg-sheet p-4">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <p className="text-[14px] font-bold text-ink">
                  Loads and trucks by state <span className="font-medium text-ink3">Today · pick-up state</span>
                </p>
                <span className="ml-auto flex items-center gap-2 text-[11.5px] text-ink3">
                  <span className="h-1.5 w-16 rounded-full bg-gradient-to-r from-brand-soft to-brand" />
                  Loads posted, 0 to 181
                </span>
              </div>
              <div className="mt-2">
                <StateMap />
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-line bg-sheet">
              <div className="flex gap-1 border-b border-line p-2 text-[12px]">
                <span className="rounded-lg bg-sunk px-2.5 py-1 font-semibold text-ink">All 51</span>
                <span className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-ink2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" /> No trucks 21
                </span>
                <span className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-ink2">
                  <span className="h-1.5 w-1.5 rounded-full bg-star" /> Few loads 6
                </span>
              </div>
              <div className="th grid grid-cols-[1fr_56px_52px_60px] gap-2 border-b border-line px-4 py-2">
                <span>State</span>
                <span className="text-right">Loads</span>
                <span className="text-right">Trucks</span>
                <span className="text-right">Per truck</span>
              </div>
              {TOP.map(([a, n], i) => (
                <div
                  key={a}
                  className="tnum grid grid-cols-[1fr_56px_52px_60px] items-center gap-2 border-b border-hair px-4 py-2 text-[12.5px] last:border-0"
                  style={{ opacity: start ? 1 : 0, transform: start ? 'none' : 'translateY(6px)', transition: `opacity 300ms var(--e-out) ${200 + i * 30}ms, transform 420ms var(--e-out) ${200 + i * 30}ms` }}
                >
                  <span className="truncate text-ink">
                    <b>{a}</b> <span className="text-ink2">{NAMES[a]}</span>
                  </span>
                  <span className="relative text-right font-bold text-ink">
                    <span className="absolute inset-y-[-3px] right-0 rounded bg-brand-soft" style={{ width: `${(n / 181) * 100}%` }} />
                    <span className="relative">{n}</span>
                  </span>
                  <span className={cn('text-right', TRUCKS[a] ? 'text-ink' : 'text-ink4')}>{TRUCKS[a]}</span>
                  <span className={cn('text-right', TRUCKS[a] ? 'text-ink' : 'text-ink4')}>{TRUCKS[a] ? Math.round(n / TRUCKS[a]) : '-'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mt-20 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-14">
          <div>
            <h3 className="text-[clamp(24px,2.4vw,36px)] font-extrabold tracking-tight text-ink" data-reveal>
              A leaderboard the team checks on its own
            </h3>
            <p className="lede mt-3" data-reveal style={{ '--i': 1 }}>
              Dispatchers rank by profit booked this month. Click a person to see their month day by day: profit, loads and bids for every day,
              and the loads behind each one.
            </p>
          </div>
          <ul className="space-y-3 text-[16.5px] text-ink2" data-reveal style={{ '--i': 2 }}>
            {['Profit = carrier pay minus driver pay', 'Cancelled and rejected loads are left out', 'Days in Central time, updates by itself'].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <div ref={lb} className="card-lg overflow-hidden" data-reveal style={{ '--i': 2 }}>
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <p className="text-[14px] font-bold text-ink">
                Leaderboard <span className="font-medium text-ink3">Profit booked, by pick-up date</span>
              </p>
              <span className="ml-auto hidden items-center gap-2 text-[12.5px] font-semibold text-ink sm:flex">
                <ChevronLeft className="h-3.5 w-3.5 text-ink3" aria-hidden="true" /> November <ChevronRight className="h-3.5 w-3.5 text-ink3" aria-hidden="true" />
              </span>
            </div>
            <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
              <div className="border-b border-line p-3 md:border-b-0 md:border-r">
                {LEADERS.map(([name, loads, bids, profit], i) => (
                  <div key={name} className="flex items-center gap-3 rounded-lg px-1.5 py-2">
                    <span
                      className={cn(
                        'tnum grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11.5px] font-bold',
                        i === 0 ? 'bg-[#FDE68A] text-[#854D0E]' : i === 1 ? 'bg-[#E2E8F0] text-[#334155]' : i === 2 ? 'bg-[#FED7AA] text-[#9A3412]' : 'text-ink3'
                      )}
                    >
                      {i + 1}
                    </span>
                    <Avatar name={name} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-ink">{name}</span>
                      <span className="tnum block text-[11.5px] text-ink3">
                        {loads} loads · {bids} bids
                      </span>
                    </span>
                    <span className="w-[92px] shrink-0 text-right">
                      <span className="tnum block text-[13px] font-bold text-ink">${profit.toLocaleString('en-US')}</span>
                      <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-sunk2">
                        <span
                          className="block h-full origin-left rounded-full bg-brand"
                          style={{ width: `${(profit / 10845) * 100}%`, transform: lbStart ? 'scaleX(1)' : 'scaleX(0)', transition: `transform 700ms var(--e-out) ${i * 40}ms` }}
                        />
                      </span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-4">
                <p className="text-[13.5px] font-bold text-ink">Performance</p>
                <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    ['Profit booked', '$37,110'],
                    ['Loads booked', '77'],
                    ['Bids sent', '660'],
                    ['Best day', '$4,135'],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-lg bg-sunk px-2.5 py-2">
                      <p className="truncate text-[11px] text-ink3">{k}</p>
                      <p className="tnum text-[15px] font-extrabold text-ink">{v}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 flex items-center gap-4 text-[11.5px] text-ink3">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-brand" /> Profit
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-accent" /> Loads booked
                  </span>
                </p>
                <div className="mt-1">
                  <Chart start={lbStart} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <BuiltForYou className="mt-10">
          The numbers your management reads, laid out your way: your KPIs and goals, your P&amp;L by week or month, and the reports you send
          today from spreadsheets.
        </BuiltForYou>
      </div>
    </section>
  )
}
