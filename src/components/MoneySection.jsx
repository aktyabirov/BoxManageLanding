import { useRef, useState } from 'react'
import { Ban, Check, FileText, Landmark, Receipt, Wallet } from 'lucide-react'
import { cn } from '../lib/cn'
import { useCountUp, useInView } from '../lib/motion'
import { SectionHead } from './SectionHead'
import { Pill, Stars } from './mock/ui'

const money = (n) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function Sum({ to, start }) {
  const v = useCountUp(to, { start, duration: 1100 })
  return <>{money(Math.round(v * 100) / 100)}</>
}

const TABS = [
  { key: 'payouts', label: 'Payouts', Icon: Wallet, count: 26 },
  { key: 'factoring', label: 'Factoring', Icon: Landmark, count: 47 },
  { key: 'expenses', label: 'Expenses', Icon: Receipt, count: 33 },
]

const PAYOUTS = [
  ['Nov 27', 'SH-4777', '5725074', 'Andre Green', 'Unit 151', 'Dispatched', '$789.47', '-$39.47 fee', null, '$750.00', 'Quick Pay'],
  ['Nov 26', 'SH-4776', 'PO-06825', 'Nikolai Green', 'Unit 193', 'Dispatched', '$2,110.53', '-$105.53 fee', '-$575.00', '$1,430.00', 'Quick Pay'],
  ['Nov 26', 'SH-4775', 'CE759688', 'Edwin Robinson', 'Unit 196', 'Dispatched', '$1,955.00', null, null, '$1,955.00', 'Regular Pay'],
  ['Nov 26', 'SH-4773', '4377495', 'Carlos Ward', 'Unit 139', 'Rejected', '$790.00', null, null, '$790.00', 'Regular Pay'],
]
const FACTORING = [
  ['SH-4761', 'Granite Peak Transport', '$2,400.00', 'Good to invoice', 'amber'],
  ['SH-4758', 'Harborview Freight Co', '$1,850.00', 'Invoiced', 'blue'],
  ['SH-4752', 'Bold Eagle Freight', '$3,120.00', 'Paid', 'green'],
  ['SH-4749', 'Midstate Freight Exchange', '$1,315.00', 'Short pay $85.00', 'red'],
]
const EXPENSES = [
  ['Andre Green', 'Fuel advance', 'Fuel card load at Pilot, Amarillo', '-$150.00', 'Open', 'amber'],
  ['Nikolai Green', 'Insurance', 'Cargo insurance share, monthly', '-$185.00', 'On a payout', 'blue'],
  ['Carlos Ward', 'ELD', 'ELD subscription, monthly', '-$40.00', 'On a payout', 'blue'],
  ['Edwin Novak', 'Tolls', 'Tolls on the Dallas run', '-$60.00', 'Settled', 'green'],
]

function Accounting() {
  const box = useRef(null)
  const start = useInView(box, { once: true, threshold: 0.3 })
  const [tab, setTab] = useState('payouts')

  return (
    <div ref={box} className="card-lg overflow-hidden text-[12.5px]">
      <div role="tablist" aria-label="Accounting" className="flex items-center gap-4 overflow-x-auto border-b border-line px-4">
        {TABS.map(({ key, label, Icon, count }) => (
          <button
            key={key}
            role="tab"
            type="button"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={cn(
              'flex min-h-11 items-center gap-1.5 whitespace-nowrap border-b-2 text-[13px] transition-colors duration-150',
              tab === key ? 'border-brand font-semibold text-brand-ink' : 'border-transparent text-ink2 hover:text-ink'
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {label}
            <span className={cn('chip h-[18px] px-1.5 text-[10.5px]', tab === key ? 'bg-brand text-white' : 'bg-sunk text-ink2')}>{count}</span>
          </button>
        ))}
        <span className="ml-auto hidden whitespace-nowrap text-[11.5px] text-ink3 xl:block">From the booked load to paid</span>
      </div>

      <div className="grid grid-cols-2 gap-px border-b border-line bg-line lg:grid-cols-4">
        {[
          ['Pending', 'amber', 32980, '26 payouts to confirm · 3 on hold'],
          ['Confirmed', 'blue', 10325, '7 waiting for management to pay'],
          ['Paid, last 7 days', 'green', 26390, '18 payouts'],
          ['Expenses taken off', 'gray', 11635, 'Last 30 days, open expenses'],
        ].map(([k, tone, v, sub]) => (
          <div key={k} className="bg-sheet px-4 py-3">
            <p className="flex items-center gap-1.5 text-[12px] text-ink2">
              <span className={cn('h-1.5 w-1.5 rounded-full', { amber: 'bg-star', blue: 'bg-brand', green: 'bg-green', gray: 'bg-ink3' }[tone])} />
              {k}
            </p>
            <p className="tnum mt-0.5 text-[19px] font-extrabold tracking-tight text-ink">
              <Sum to={v} start={start} />
            </p>
            <p className="truncate text-[11px] text-ink3">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid min-h-[236px]">
        {/* Old and new tab overlap: one leaves while the other arrives. */}
        {[
          ['payouts', <Payouts key="p" />],
          ['factoring', <Factoring key="f" />],
          ['expenses', <Expenses key="e" />],
        ].map(([key, el]) => (
          <div
            key={key}
            role="tabpanel"
            aria-hidden={tab !== key}
            className="col-start-1 row-start-1 transition-[opacity,transform,filter]"
            style={{
              opacity: tab === key ? 1 : 0,
              transform: tab === key ? 'none' : 'translateY(6px)',
              filter: tab === key ? 'none' : 'blur(3px)',
              pointerEvents: tab === key ? 'auto' : 'none',
              transitionDuration: tab === key ? '260ms' : '208ms',
              transitionTimingFunction: tab === key ? 'var(--e-out)' : 'var(--e-in)',
            }}
          >
            {el}
          </div>
        ))}
      </div>
    </div>
  )
}

function Payouts() {
  return (
    <div>
      <div className="th hidden grid-cols-[64px_1fr_1.1fr_1fr_0.9fr_1fr] gap-3 border-b border-line px-4 py-2 md:grid">
        <span className="whitespace-nowrap">Pick-up</span>
        <span>Invoice</span>
        <span>Driver</span>
        <span className="text-right">Driver pay</span>
        <span className="text-right">Payout</span>
        <span>Payment</span>
      </div>
      {PAYOUTS.map(([day, inv, ref, name, unit, st, pay, fee, exp, out, type]) => (
        <div key={inv} className="tnum grid grid-cols-[1fr_auto] items-center gap-3 border-b border-hair px-4 py-2.5 last:border-0 md:grid-cols-[64px_1fr_1.1fr_1fr_0.9fr_1fr]">
          <span className="hidden text-ink md:block">{day}</span>
          <span className="min-w-0">
            <b className="block text-ink">{inv}</b>
            <span className="text-[11px] text-ink3">{ref}</span>
          </span>
          <span className="hidden min-w-0 md:block">
            <span className="block truncate text-ink">{name}</span>
            <span className="text-[11px] text-ink3">{unit}</span>
          </span>
          <span className="hidden text-right md:block">
            <span className="block text-ink">{pay}</span>
            {fee && <span className="block text-[11px] font-semibold text-accent-ink">{fee}</span>}
            {exp && <span className="block text-[11px] font-semibold text-accent-ink">{exp} expense</span>}
          </span>
          <span className="text-right font-bold text-ink">{out}</span>
          <span className="hidden md:block">
            <Pill tone={type === 'Quick Pay' ? 'red' : 'green'} dot={false}>
              {type}
            </Pill>
            {st === 'Rejected' && (
              <Pill tone="red" className="ml-1">
                Rejected
              </Pill>
            )}
          </span>
        </div>
      ))}
    </div>
  )
}

function Factoring() {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5 border-b border-line px-4 py-2.5 text-[12px]">
        {['Good to invoice 6', 'Invoiced 11', 'Paid 48', 'Short pay 2'].map((t, i) => (
          <span key={t} className={cn('rounded-lg px-2.5 py-1', i === 1 ? 'bg-sunk font-semibold text-ink' : 'text-ink2')}>
            {t}
          </span>
        ))}
      </div>
      {FACTORING.map(([inv, broker, amt, st, tone]) => (
        <div key={inv} className="tnum grid grid-cols-[1fr_auto] items-center gap-3 border-b border-hair px-4 py-2.5 last:border-0 sm:grid-cols-[80px_1.4fr_1fr_auto]">
          <b className="text-ink">{inv}</b>
          <span className="hidden truncate text-ink sm:block">{broker}</span>
          <span className="hidden text-right font-bold text-ink sm:block">{amt}</span>
          <Pill tone={tone}>{st}</Pill>
        </div>
      ))}
    </div>
  )
}

function Expenses() {
  return (
    <div>
      {EXPENSES.map(([name, type, what, amt, st, tone]) => (
        <div key={what} className="tnum grid grid-cols-[1fr_auto] items-center gap-3 border-b border-hair px-4 py-2.5 last:border-0 sm:grid-cols-[1fr_1.5fr_auto_auto]">
          <span className="truncate font-semibold text-ink">{name}</span>
          <span className="hidden min-w-0 sm:block">
            <span className="block truncate text-ink">{type}</span>
            <span className="block truncate text-[11px] text-ink3">{what}</span>
          </span>
          <span className="hidden font-bold text-accent-ink sm:block">{amt}</span>
          <Pill tone={tone}>{st}</Pill>
        </div>
      ))}
      <p className="px-4 py-2.5 text-[11.5px] text-ink3">Open expenses come off the driver’s next pending payout.</p>
    </div>
  )
}

const BROKERS = [
  ['Arrowhead Shipping', 'MC 1052585', 5, 'Strict on check calls every 2 hours.'],
  ['Atlas Ridge Freight', 'MC 716960', 4, 'Appointment heavy, detention paid.'],
  ['Bayside Cargo Solutions', 'MC 1027450', 4, 'Good lanes out of Texas. Ask for Megan.'],
  ['Black Rock Expedite', 'MC 444341', 2, 'Slow to pay, check before booking.', true],
]

function Brokers() {
  return (
    <div className="card overflow-hidden text-[12.5px]">
      <div className="grid grid-cols-3 gap-px border-b border-line bg-line">
        {[
          ['Brokers on file', '60'],
          ['Rated 4 to 5', '35'],
          ['Blacklisted', '6'],
        ].map(([k, v]) => (
          <div key={k} className="bg-sheet px-3.5 py-2.5">
            <p className="truncate text-[11.5px] text-ink2">{k}</p>
            <p className="tnum text-[18px] font-extrabold text-ink">{v}</p>
          </div>
        ))}
      </div>
      {BROKERS.map(([name, mc, n, note, black]) => (
        <div key={name} className={cn('grid grid-cols-[1fr_auto] items-center gap-3 border-b border-hair px-4 py-2.5 last:border-0', black && 'bg-red-bg/60')}>
          <span className="min-w-0">
            <span className="flex items-center gap-2">
              <b className="truncate text-ink">{name}</b>
              {black && (
                <span className="chip h-[18px] bg-red px-1.5 text-[10px] text-white">
                  <Ban className="h-2.5 w-2.5" aria-hidden="true" /> Blacklisted
                </span>
              )}
            </span>
            <span className="block truncate text-[11.5px] text-ink3">
              {mc} · &ldquo;{note}&rdquo;
            </span>
          </span>
          <Stars n={n} size={11} />
        </div>
      ))}
    </div>
  )
}

export function MoneySection() {
  return (
    <section id="money" className="relative py-24 lg:py-32">
      <div className="wrap">
        <SectionHead
          eyebrow="Money"
          title="Every load carried through to the driver’s payout"
          lede="Accounting picks up each booked load: the driver payout with Quick Pay fees and expenses already worked out, factoring from good to invoice to paid, and every expense that comes off a payout."
        />

        <div className="mt-12" data-reveal style={{ '--i': 3 }}>
          <Accounting />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="card p-5" data-reveal>
            <p className="flex items-center gap-2 text-[15px] font-bold text-ink">
              <FileText className="h-4 w-4 text-ink3" aria-hidden="true" />
              Loads, with the totals on top
            </p>
            <p className="mt-1.5 text-[14px] text-ink2">Every booked load with its broker, driver, status and tags. The totals follow your filters.</p>
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {[
                ['Loads', '644', 'Match the filters'],
                ['Carrier pay', '$1,266,375', 'Gross'],
                ['Driver pay', '$950,840', 'Paid out'],
                ['Profit', '$315,535', '24.9% margin', true],
              ].map(([k, v, sub, good]) => (
                <div key={k} className="rounded-xl border border-line p-3">
                  <p className="text-[11.5px] text-ink2">{k}</p>
                  <p className={cn('tnum mt-0.5 text-[16px] font-extrabold tracking-tight', good ? 'text-green' : 'text-ink')}>{v}</p>
                  <p className="truncate text-[11px] text-ink3">{sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {[
                ['Dispatched', 'blue', 13],
                ['In transit', 'violet', 11],
                ['Delivered', 'green', 17],
                ['Invoiced', 'amber', 377],
                ['Factored', 'gray', 193],
                ['TONU', 'blue', 12],
                ['Cancelled', 'red', 21],
              ].map(([k, tone, n]) => (
                <Pill key={k} tone={tone}>
                  {k} <span className="tnum opacity-70">{n}</span>
                </Pill>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 text-[13px] text-ink3">
              <Check className="h-3.5 w-3.5 text-green" strokeWidth={3} aria-hidden="true" />
              Add a load by dropping the rate con: the reader fills broker, stops and rate in 5 to 10 seconds.
            </p>
          </div>

          <div data-reveal style={{ '--i': 1 }}>
            <p className="text-[15px] font-bold text-ink">Brokers your team rates</p>
            <p className="mt-1.5 text-[14px] text-ink2">
              Ratings and team comments show on the load board and in the load window. Blacklisted brokers disappear from the board.
            </p>
            <div className="mt-4">
              <Brokers />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
