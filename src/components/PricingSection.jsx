import { useRef } from 'react'
import {
  Bot,
  Headset,
  LayoutDashboard,
  ListChecks,
  MapPin,
  MessagesSquare,
  Receipt,
  Smartphone,
  Sparkles,
  UserRoundCheck,
} from 'lucide-react'
import { DISPATCH_APP_NAME, DRIVER_APP_NAME } from '../config'
import { useInView } from '../lib/motion'
import { BookDemoButton } from './BookDemoButton'
import { TryDemoButton } from './TryDemoButton'

/* What a customer gets: the people and the work behind the software first, then the platform. */
const SERVICE = [
  [Sparkles, 'Custom features for your company', 'Built for how your company works, when you ask for them.'],
  [Bot, 'Automation that fits your workflow exactly', 'The steps your team does by hand today, done by the platform.'],
  [UserRoundCheck, 'A dedicated account manager', 'One person who knows your company and handles your requests.'],
  [Headset, '24/7 support', 'Day shift, night shift and weekends.'],
]
const PLATFORM = [
  [ListChecks, 'Load management', 'Live board, nearest truck, bids and every booked load.'],
  [LayoutDashboard, 'Dashboard', 'The market, your bids, your fleet and the leaderboard.'],
  [MessagesSquare, 'Chat', 'Broker conversations in one inbox, tied to each load.'],
  [MapPin, 'Tracking', 'Where every truck is and whether it can run.'],
  [Receipt, 'Accounting, factoring and payroll automation', 'Payouts, invoices, expenses and pay worked out for you.'],
  [Smartphone, 'Dispatch and driver apps', `${DISPATCH_APP_NAME} and ${DRIVER_APP_NAME} on iPhone and Android.`],
]

function Item({ Icon, title, text, i }) {
  return (
    <li className="flex gap-3.5" data-reveal style={{ '--i': i }}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-ink">
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-[15.5px] font-bold tracking-tight text-ink">{title}</span>
        <span className="mt-0.5 block text-[14px] leading-relaxed text-ink2">{text}</span>
      </span>
    </li>
  )
}

/* The price card: the range only. Where a fleet lands depends on its volume, so no tiers are shown. */
function PriceCard() {
  const ref = useRef(null)
  const on = useInView(ref, { once: true, threshold: 0.4 })
  return (
    <div ref={ref} className="card-lg relative overflow-hidden p-6 sm:p-8" data-reveal style={{ '--i': 2 }}>
      <div className="pointer-events-none absolute right-[-120px] top-[-140px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      <p className="relative text-[13px] font-bold uppercase tracking-[0.08em] text-ink3">Per month</p>
      <p className="relative mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-ink">
        <span className="tnum text-[clamp(44px,6vw,60px)] font-extrabold leading-none tracking-[-0.04em]">$300</span>
        <span className="text-[20px] font-semibold text-ink3">to</span>
        <span className="tnum text-[clamp(44px,6vw,60px)] font-extrabold leading-none tracking-[-0.04em]">$1,200</span>
      </p>
      <p className="relative mt-3 text-[15.5px] leading-relaxed text-ink2">Your price depends on your volume. Everything below is included.</p>

      {/* The range: fills from the minimum to the maximum, both ends marked. */}
      <div className="relative mt-7" aria-hidden="true">
        <div className="h-2.5 overflow-hidden rounded-full bg-sunk2">
          <div
            className="h-full origin-left rounded-full bg-gradient-to-r from-brand/55 to-brand"
            style={{ transform: on ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform 900ms var(--e-io) 200ms' }}
          />
        </div>
        <span
          className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-[3px] border-brand bg-sheet shadow-[var(--shadow)]"
          style={{ transform: `translateY(-50%) scale(${on ? 1 : 0})`, transition: 'transform 420ms var(--spring) 120ms' }}
        />
        <span
          className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-brand shadow-[var(--shadow)]"
          style={{ transform: `translateY(-50%) scale(${on ? 1 : 0})`, transition: 'transform 420ms var(--spring) 1060ms' }}
        />
      </div>
      <div className="mt-3 flex justify-between text-[12.5px] text-ink3">
        <span>
          Minimum <b className="tnum text-ink">$300</b>
        </span>
        <span>
          Maximum <b className="tnum text-ink">$1,200</b>
        </span>
      </div>

      <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
        <BookDemoButton variant="primary" className="btn-lg w-full sm:w-auto">Get your price</BookDemoButton>
        <TryDemoButton place="pricing" size="lg" variant="quiet" className="w-full sm:w-auto" />
      </div>
    </div>
  )
}

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow" data-reveal>
              Pricing
            </p>
            <h2 className="h-section mt-4 text-ink" data-reveal style={{ '--i': 1 }}>
              One monthly price. The software, the apps and a team behind them.
            </h2>
            <p className="lede mt-4" data-reveal style={{ '--i': 2 }}>
              One monthly amount between $300 and $1,200, set by your volume. It covers the whole platform and the people behind it: the
              ones who customize it for you, automate your workflow and answer at any hour.
            </p>
          </div>
          <PriceCard />
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col rounded-[24px] border border-brand/25 bg-brand-soft/40 p-6 sm:p-8">
            <h3 className="text-[19px] font-extrabold tracking-tight text-ink" data-reveal>
              Beyond the software
            </h3>
            <ul className="mt-6 flex flex-1 flex-col justify-between gap-5">
              {SERVICE.map(([Icon, title, text], i) => (
                <Item key={title} Icon={Icon} title={title} text={text} i={i + 1} />
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] border border-line bg-sheet p-6 shadow-[var(--shadow)] sm:p-8">
            <h3 className="text-[19px] font-extrabold tracking-tight text-ink" data-reveal>
              The whole platform
            </h3>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {PLATFORM.map(([Icon, title, text], i) => (
                <Item key={title} Icon={Icon} title={title} text={text} i={i + 1} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
