import { useEffect, useState } from 'react'
import { Check, ChevronDown, FileCheck2, Mail, Smartphone } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useCountUp } from '../../lib/motion'
import { ContactBtns, Pill, Stars } from './ui'

/* The five product shots of "How it works". Each takes `active`: when it turns true the shot
 * plays its one piece of motion (a row arriving, a truck being picked, numbers filling in). */

const usd = (n) => `$${Math.round(n).toLocaleString('en-US')}`

/* Re-keys its children every time `active` turns on, so CSS entrance animations replay. */
function useRun(active) {
  const [run, setRun] = useState(0)
  useEffect(() => {
    if (active) setRun((r) => r + 1)
  }, [active])
  return run
}

export function StepPost({ active }) {
  const run = useRun(active)
  const rows = [
    { fresh: true, pu: 'ATLANTA, GA 30303', puT: 'ASAP', del: 'SHREVEPORT, LA 71101', delT: 'Tomorrow 09:40 CST', mi: 647, rate: '$1,560', truck: 'Calvin Perez #130', away: '18 mi', broker: 'Midstate Freight Exchange', stars: 4 },
    { pu: 'MEMPHIS, TN 38103', puT: 'Tomorrow 07:00 CST', del: 'CHICAGO, IL 60607', delT: 'Tomorrow 19:00 CST', mi: 532, truck: 'Eric Ivanov #109', away: '26 mi', broker: 'Wildflower Logistics', stars: 5 },
    { pu: 'PITTSBURGH, PA 15222', puT: 'Today 21:30 EST', del: 'COLUMBUS, OH 43215', delT: 'Direct', mi: 185, rate: '$520', truck: 'Terrence Stewart #145', away: '7 mi', broker: 'Northstar Cargo Partners', stars: 3, seen: true },
  ]
  return (
    <div className="card overflow-hidden" key={run}>
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <p className="text-[14px] font-bold text-ink">Load board</p>
        <Pill tone="green">Live</Pill>
        <span className="ml-auto text-[12px] text-ink3">Sorted by newest</span>
      </div>
      <div className="th hidden grid-cols-[44px_1fr_1fr_1.1fr] gap-3 border-b border-line px-4 py-2 sm:grid">
        <span>Age</span>
        <span>Pick-up</span>
        <span>Delivery</span>
        <span>Nearest truck</span>
      </div>
      {rows.map((r, i) => (
        <div
          key={r.pu}
          className={cn('grid grid-cols-[36px_1fr] items-center gap-3 border-b border-hair px-4 py-3 text-[12.5px] sm:grid-cols-[44px_1fr_1fr_1.1fr]', r.seen && 'bg-sunk/60', r.fresh && 'row-new')}
          style={r.fresh ? { animation: 'rise 520ms var(--spring-soft) 150ms both, flash-new 2.6s var(--e-out) 0.5s both' } : { animation: `rise 420ms var(--e-out) ${i * 30}ms both` }}
        >
          <span className={r.fresh ? 'font-bold text-accent-ink' : 'text-ink3'}>{r.fresh ? 'now' : `${i * 3 + 2}m`}</span>
          <span className="min-w-0 sm:hidden">
            <span className={cn('block truncate text-ink', !r.seen && 'font-bold')}>
              {r.pu.replace(/ \d{5}$/, '')} <span className="font-normal text-ink4">to</span> {r.del.replace(/ \d{5}$/, '')}
            </span>
            <span className="block truncate text-[11.5px] text-ink3">
              {r.truck} · <b className="text-green">{r.away}</b>
              {r.rate && <b className="ml-1.5 text-green">{r.rate}</b>}
            </span>
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className={cn('block truncate text-ink', !r.seen && 'font-bold')}>{r.pu}</span>
            <span className="block truncate text-[11.5px] text-ink3">{r.puT}</span>
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className={cn('block truncate text-ink', !r.seen && 'font-bold')}>{r.del}</span>
            <span className="block truncate text-[11.5px] text-ink3">
              {r.mi} mi{r.rate && <b className="ml-1 text-green">{r.rate}</b>}
            </span>
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block truncate text-ink">
              {r.truck} · <b className="text-green">{r.away}</b>
            </span>
            <span className="flex items-center gap-1 truncate text-[11.5px] text-ink3">
              <span className="truncate">{r.broker}</span> <Stars n={r.stars} size={9} className="shrink-0" />
            </span>
          </span>
        </div>
      ))}
      <p className="flex items-center gap-2 bg-sunk px-4 py-2.5 text-[12px] text-ink2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-accent [animation:ping-ring_1.6s_var(--e-out)_infinite]" />
          <span className="relative h-2 w-2 rounded-full bg-accent" />
        </span>
        New load, a bell rings for the team. Bold rows are the ones nobody opened yet.
      </p>
    </div>
  )
}

const TRUCKS = [
  { name: 'Calvin Perez', unit: 130, phone: '+1 (214) 555-0131', out: 18, veh: 'Cargo van', eq: 'Dolly, E-Tracks', at: 'Atlanta, GA 30318', box: '170x70x72', lb: '3,800 lb' },
  { name: 'Terrence Roberts', unit: 133, phone: '+1 (817) 555-0177', out: 31, veh: 'Cargo van', eq: 'Dolly, Air Ride', at: 'Marietta, GA 30060', box: '170x70x72', lb: '3,800 lb' },
  { name: 'Terrence Stewart', unit: 145, phone: '+1 (469) 555-0166', out: 64, veh: 'Cargo van', eq: 'Load Bars, Blankets', at: 'Athens, GA 30601', box: '144x54x70', lb: '3,500 lb' },
]

export function StepMatch({ active }) {
  const run = useRun(active)
  return (
    <div className="card overflow-hidden" key={run}>
      <div className="flex flex-wrap items-start gap-3 border-b border-line px-4 py-3">
        <div>
          <p className="text-[14px] font-bold text-ink">Trucks near pick-up</p>
          <p className="text-[12px] text-ink3">Pick the truck to bid with. Miles out = empty miles to the pick-up.</p>
        </div>
        <span className="ml-auto flex items-center gap-2 text-[12px] text-ink2">
          4 within 150 mi · 3 fit
          <span className="flex h-8 items-center gap-1 rounded-lg border border-line px-2.5 text-ink">
            Radius <b>150 mi</b> <ChevronDown className="h-3 w-3" />
          </span>
        </span>
      </div>
      <div className="th grid grid-cols-[28px_64px_1.5fr_1fr] gap-3 border-b border-line px-4 py-2 sm:grid-cols-[28px_64px_1.5fr_1fr_1fr]">
        <span />
        <span className="text-right">Miles out</span>
        <span>Driver</span>
        <span>Vehicle</span>
        <span className="hidden sm:block">Box / payload</span>
      </div>
      {TRUCKS.map((t, i) => {
        const on = i === 0
        return (
          <div
            key={t.unit}
            className={cn('relative grid grid-cols-[28px_64px_1.5fr_1fr] items-center gap-3 border-b border-hair px-4 py-3 text-[12.5px] sm:grid-cols-[28px_64px_1.5fr_1fr_1fr]', on && 'bg-sel')}
            style={{ animation: `rise 420ms var(--e-out) ${i * 40}ms both` }}
          >
            {on && <span className="absolute inset-y-0 left-0 w-[3px] bg-brand" style={{ animation: 'fill-y 360ms var(--e-out) 520ms both', transformOrigin: 'top' }} />}
            <span
              className={cn('grid h-[18px] w-[18px] place-items-center rounded-full border-2', on ? 'border-brand' : 'border-ink4')}
              style={on ? { animation: 'pulse-brand 700ms var(--e-out) 600ms' } : undefined}
            >
              {on && <span className="h-2 w-2 rounded-full bg-brand" style={{ animation: 'pop 420ms var(--spring) 520ms both' }} />}
            </span>
            <span className="tnum text-right font-bold text-ink">{t.out} mi</span>
            <span className="min-w-0">
              <span className="block truncate font-semibold text-ink">
                {t.name} <span className="font-normal text-ink3">#{t.unit}</span>
              </span>
              <span className="flex items-center gap-1.5 text-[11.5px] text-ink3">
                <span className="tnum hidden sm:inline">{t.phone}</span>
                <ContactBtns />
              </span>
            </span>
            <span className="min-w-0">
              <span className="block truncate text-ink">{t.veh}</span>
              <span className="block truncate text-[11.5px] text-ink3">{t.eq}</span>
            </span>
            <span className="tnum hidden min-w-0 sm:block">
              <span className="block text-ink">{t.box}</span>
              <span className="block text-[11.5px] text-ink3">{t.lb}</span>
            </span>
          </div>
        )
      })}
      <p className="bg-sunk px-4 py-2.5 text-[12px] text-ink2">
        Only trucks of the right type that fit the box and payload and are free by pick-up time are listed.
      </p>
    </div>
  )
}

export function StepBid({ active }) {
  const run = useRun(active)
  const broker = useCountUp(1975, { start: active, duration: 700 })
  const driver = useCountUp(1490, { start: active, duration: 700 })
  const profit = broker - driver
  const pct = broker ? (profit / broker) * 100 : 0
  return (
    <div className="grid gap-3 sm:grid-cols-[1.05fr_1fr]" key={run}>
      <div className="card p-4">
        <p className="text-[14px] font-bold text-ink">
          New bid <span className="ml-1 text-[12px] font-medium text-ink3">With Calvin Perez #130 · 18 mi out</span>
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            ['Price for broker', broker],
            ['Price for driver', driver],
          ].map(([label, v]) => (
            <div key={label}>
              <p className="text-[12px] text-ink2">{label}</p>
              <p className="tnum mt-1 flex h-10 items-center rounded-lg border border-line bg-sheet px-3 text-[17px] font-bold text-ink">
                {usd(v)}
              </p>
              <p className="tnum mt-1.5 text-[11.5px] text-ink3">${(v / 647).toFixed(2)} / mi</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-lg bg-green-bg px-3 py-2.5">
          <span className="text-[12.5px] font-semibold text-ink">Profit</span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-green-track">
            <span className="block h-full origin-left rounded-full bg-green" style={{ transform: `scaleX(${Math.min(1, pct / 40)})` }} />
          </span>
          <span className="tnum text-[13.5px] font-bold text-green">
            {usd(profit)} · {pct.toFixed(1)}%
          </span>
        </div>
        <span className="btn btn-cta mt-4 w-full" style={{ animation: 'pulse-cta 900ms var(--e-out) 900ms' }}>
          Send bid
        </span>
      </div>
      <div className="card p-4">
        <p className="flex items-center gap-2 text-[14px] font-bold text-ink">
          <Mail className="h-4 w-4 text-ink3" aria-hidden="true" />
          Email to the broker
        </p>
        <p className="mt-1 text-[11.5px] text-ink3">From dispatch@redwoodfreight.example, your own mailbox</p>
        <div className="mt-3 space-y-1.5 rounded-lg border-2 border-dashed border-green-track px-3.5 py-3 text-[12.5px] text-ink">
          <p>
            <b>All in:</b> <b className="tnum text-green">{usd(broker)}</b>
          </p>
          <p>
            <b>Miles out:</b> 18
          </p>
          <p>
            <b>Dimensions:</b> 170 x 70 x 72 in
          </p>
          <p>
            <b>Type:</b> Cargo van
          </p>
          <p>
            <b>MC:</b> 1184520
          </p>
        </div>
        <p className="mt-2.5 text-[11.5px] text-ink3">The template fills in itself. Edit it before you send if you like.</p>
      </div>
    </div>
  )
}

export function StepReply({ active }) {
  const run = useRun(active)
  return (
    <div className="card overflow-hidden" key={run}>
      <div className="border-b border-line px-4 py-3">
        <p className="text-[15px] font-bold text-ink">
          Atlanta, GA <span className="text-ink4">›</span> Shreveport, LA
        </p>
        <p className="mt-0.5 text-[12px] text-ink3">
          <b className="text-ink">Midstate Freight Exchange</b> · Ref 7392454 · Bid by Jordan Reyes at 1:32 PM CST
        </p>
      </div>
      <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-5">
        {[
          ['Our bid', '$1,975'],
          ['Agreed', '$1,850', '-$125'],
          ['Driver pay', '$1,490'],
          ['Margin', '$360', '19.5%', 'green'],
          ['Driver', 'Calvin Perez'],
        ].map(([k, v, d, tone]) => (
          <div key={k} className="bg-sunk px-3 py-2.5">
            <p className="text-[11px] text-ink3">{k}</p>
            <p className={cn('tnum mt-0.5 text-[14px] font-bold', tone ? 'text-green' : 'text-ink')}>
              {v}
              {d && <span className={cn('ml-1 text-[11px] font-semibold', tone ? 'text-green' : 'text-red')}>{d}</span>}
            </p>
          </div>
        ))}
      </div>
      <div className="space-y-3 bg-ground/60 px-4 py-4">
        <div className="ml-auto max-w-[340px] rounded-xl border border-brand/25 bg-brand-soft px-3.5 py-3" style={{ animation: 'rise 420ms var(--e-out) 80ms both' }}>
          <p className="th">Bid email</p>
          <div className="tnum mt-1.5 grid grid-cols-3 gap-2 text-[12px]">
            <span>
              <span className="block text-ink3">Rate</span>
              <b className="text-green">$1,975</b>
            </span>
            <span>
              <span className="block text-ink3">Miles out</span>
              <b className="text-ink">18</b>
            </span>
            <span>
              <span className="block text-ink3">Vehicle</span>
              <b className="text-ink">Cargo van</b>
            </span>
          </div>
        </div>
        <div className="max-w-[380px]" style={{ animation: 'rise 480ms var(--spring-soft) 520ms both' }}>
          <p className="mb-1 text-[11.5px] text-ink3">
            <b className="text-ink">Midstate Freight Exchange</b> · 2:11 PM CST
          </p>
          <div className="rounded-xl border border-line bg-sheet px-3.5 py-3 text-[13px] text-ink shadow-[var(--shadow)]">
            Appreciate it. Could you do $1,850? I have two other carriers close to that.
            <p className="mt-2 text-ink2">Taylor Fox</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function StepPaid({ active }) {
  const run = useRun(active)
  const [stage, setStage] = useState(0)
  useEffect(() => {
    if (!active) return
    setStage(0)
    const t1 = setTimeout(() => setStage(1), 900)
    const t2 = setTimeout(() => setStage(2), 1900)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [active])
  const STAGES = [
    ['Pending', 'amber'],
    ['Confirmed', 'blue'],
    ['Paid', 'green'],
  ]
  return (
    <div className="space-y-3" key={run}>
      <div className="card flex items-start gap-3 p-4" style={{ animation: 'rise 420ms var(--e-out) both' }}>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-green-bg text-green" style={{ animation: 'pulse-ok 900ms var(--e-out) 400ms' }}>
          <FileCheck2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[14px] font-bold text-ink">Rate con checked: it matches</p>
          <p className="mt-0.5 text-[12.5px] text-ink2">RateCon_7392454.pdf · $1,850 · stops and dates match the deal</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {['Price', 'Locations', 'Dates'].map((k) => (
              <Pill key={k} tone="green" dot={false}>
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" /> {k}
              </Pill>
            ))}
          </div>
        </div>
      </div>

      <div className="card overflow-hidden" style={{ animation: 'rise 420ms var(--e-out) 80ms both' }}>
        <div className="th grid grid-cols-[1fr_1fr_auto] gap-3 border-b border-line px-4 py-2 sm:grid-cols-[60px_1fr_1fr_auto_auto]">
          <span className="hidden sm:block">Pick-up</span>
          <span>Invoice</span>
          <span>Driver</span>
          <span className="hidden text-right sm:block">Payout</span>
          <span>Status</span>
        </div>
        <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-3 px-4 py-3 text-[12.5px] sm:grid-cols-[60px_1fr_1fr_auto_auto]">
          <span className="hidden text-ink sm:block">Today</span>
          <span>
            <b className="block text-ink">SH-4778</b>
            <span className="text-[11.5px] text-ink3">7392454</span>
          </span>
          <span>
            <span className="block text-ink">Calvin Perez</span>
            <span className="text-[11.5px] text-ink3">Unit 130</span>
          </span>
          <span className="tnum hidden text-right font-bold text-ink sm:block">$1,490.00</span>
          <span className="relative grid">
            {STAGES.map(([label, tone], i) => (
              <span
                key={label}
                className="col-start-1 row-start-1 transition-[opacity,transform,filter] duration-300"
                style={{
                  opacity: stage === i ? 1 : 0,
                  transform: stage === i ? 'none' : stage > i ? 'translateY(-6px)' : 'translateY(6px)',
                  filter: stage === i ? 'none' : 'blur(2px)',
                  transitionTimingFunction: stage === i ? 'var(--e-out)' : 'var(--e-in)',
                }}
              >
                <Pill tone={tone}>{label}</Pill>
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[12px] text-ink3">
        <span className="chip bg-sunk text-ink2">
          <Smartphone className="h-3 w-3" aria-hidden="true" /> Driver sees it in BTM Driver
        </span>
        <span className="chip bg-sunk text-ink2">Quick Pay fee taken at booking</span>
        <span className="chip bg-sunk text-ink2">Open expenses come off the payout</span>
      </div>
    </div>
  )
}
