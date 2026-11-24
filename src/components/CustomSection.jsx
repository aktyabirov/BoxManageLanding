import { useRef } from 'react'
import {
  ArrowRightLeft,
  Check,
  FileSignature,
  Landmark,
  Mail,
  MapPin,
  Plus,
  Radio,
  Sparkles,
  Tags,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
  BadgeDollarSign,
} from 'lucide-react'
import { cn } from '../lib/cn'
import { useInView } from '../lib/motion'

/* Every stage of a fleet's work: what every customer gets, and the kind of step we build for one. */
const LANE = [
  [UserPlus, 'Hiring', ['Hiring board', 'Invite link'], 'Leads dealt to your team in turn'],
  [FileSignature, 'Onboarding', ['Documents', 'E-sign'], 'Your contract and checklist'],
  [Radio, 'Dispatch', ['Live board', 'Nearest truck', 'Bids'], 'Your bid email and truck rules'],
  [MapPin, 'Tracking', ['Daily locations', 'Driver app'], 'Alerts in your team chat'],
  [Wallet, 'Accounting', ['Payouts', 'Factoring', 'Expenses'], 'Your pay rules and factor'],
  [TrendingUp, 'P&L', ['Profit per load', 'Margins'], 'Salaries, bonuses, your reports'],
  [Plus, 'Anything else', [], 'Whatever your team still does by hand'],
]

const STEPS = [
  ['Start with the core', 'Everything you see in the demo: the board, bids, conversations, tracking, hiring, accounting and both apps.'],
  ['Show us how you work', 'We go through each step your team does today, including every spreadsheet, side tool and manual habit.'],
  ['We build the rest', 'Your rules, reports and integrations go into the same platform, one step at a time, until nothing is manual.'],
]

/* Real things built for fleets on BoxTruckManage. */
const BUILT = [
  [BadgeDollarSign, 'Salaries and bonus rules', 'Dispatcher pay with bonus rules that change by date, counted from booked loads.'],
  [Landmark, 'One-click factoring', 'A delivered load’s invoice and paperwork sent to the factoring company with one click.'],
  [Users, 'Leads dealt in turn', 'New driver leads handed to the hiring team one by one, with a notice in their Telegram group.'],
  [ArrowRightLeft, 'Moved in from the old system', 'Drivers, trucks and documents brought over from the software used before.'],
  [Mail, 'Your bid email', 'The bid email in your own words and layout, filled in for every load.'],
  [Tags, 'Your statuses and tags', 'Load statuses and tags named the way your team already talks.'],
]

function Lane() {
  const ref = useRef(null)
  const on = useInView(ref, { once: true, threshold: 0.3 })
  return (
    <div ref={ref} className="card-lg overflow-hidden" data-reveal style={{ '--i': 2 }}>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-line px-5 py-4">
        <p className="text-[15px] font-bold text-ink">Your workflow, in one platform</p>
        <span className="flex items-center gap-1.5 text-[12.5px] text-ink2 sm:ml-auto">
          <span className="grid h-4 w-4 place-items-center rounded bg-sunk2 text-ink2">
            <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
          </span>
          Every fleet gets
        </span>
        <span className="flex items-center gap-1.5 text-[12.5px] text-ink2">
          <span className="grid h-4 w-4 place-items-center rounded bg-brand text-white">
            <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
          </span>
          Built for you
        </span>
      </div>

      <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-7">
        {LANE.map(([Icon, stage, core, custom], i) => {
          const last = i === LANE.length - 1
          return (
            <li key={stage} className={cn('relative flex flex-col gap-2.5 p-4', last ? 'bg-sunk/70' : 'bg-sheet')}>
              {/* Connector to the next stage: draws left to right, one after another. */}
              {!last && (
                <span
                  aria-hidden="true"
                  className="absolute right-[-7px] top-[30px] z-10 hidden h-[2px] w-[14px] origin-left bg-brand lg:block"
                  style={{ transform: on ? 'scaleX(1)' : 'scaleX(0)', transition: `transform 260ms var(--e-out) ${200 + i * 90}ms` }}
                />
              )}
              <p className="flex items-center gap-2 text-[14px] font-bold text-ink">
                <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-lg', last ? 'border border-dashed border-ink4 text-ink2' : 'bg-brand-soft text-brand-ink')}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {stage}
              </p>
              {core.length > 0 && (
                <ul className="space-y-1.5">
                  {core.map((c) => (
                    <li key={c} className="flex items-start gap-1.5 text-[12.5px] leading-snug text-ink2">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-ink3" strokeWidth={3} aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>
              )}
              <p
                className={cn(
                  'mt-auto flex items-start gap-1.5 rounded-lg border border-dashed px-2.5 py-2 text-[12.5px] font-semibold leading-snug',
                  last ? 'border-ink4 text-ink' : 'border-brand/45 bg-brand-soft text-brand-ink'
                )}
                style={{
                  opacity: on ? 1 : 0,
                  transform: on ? 'none' : 'scale(0.9) translateY(6px)',
                  transition: `transform 520ms var(--spring) ${520 + i * 90}ms, opacity 240ms var(--e-out) ${520 + i * 90}ms`,
                }}
              >
                <Sparkles className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                {custom}
              </p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export function CustomSection() {
  return (
    <section id="custom" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute right-[-200px] top-[-120px] h-[520px] w-[720px] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      <div className="wrap relative">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow" data-reveal>
              Built for you
            </p>
            <h2 className="h-section mt-4 text-ink" data-reveal style={{ '--i': 1 }}>
              Not one size fits all. Built around how your fleet works.
            </h2>
            <p className="lede mt-4" data-reveal style={{ '--i': 2 }}>
              You don’t buy software and then bend your company to fit it. Every customer gets everything other fleets use, and then we
              customize BoxTruckManage for you, step by step, until your whole workflow runs in one platform and runs on its own: hiring,
              dispatch, accounting, P&amp;L and whatever else your team needs.
            </p>
          </div>
          <ol className="space-y-3 self-end">
            {STEPS.map(([title, text], i) => (
              <li key={title} className="flex gap-4 rounded-2xl border border-line bg-sheet p-4 shadow-[var(--shadow)]" data-reveal style={{ '--i': 2 + i }}>
                <span className="tnum grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-[13.5px] font-bold text-on-brand">{i + 1}</span>
                <span>
                  <span className="block text-[16px] font-bold tracking-tight text-ink">{title}</span>
                  <span className="mt-0.5 block text-[14.5px] leading-relaxed text-ink2">{text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14">
          <Lane />
        </div>

        <div className="mt-16">
          <h3 className="text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-tight text-ink" data-reveal>
            A few things we have built for fleets on BoxTruckManage
          </h3>
          <p className="mt-2 max-w-[640px] text-[15.5px] leading-relaxed text-ink2" data-reveal style={{ '--i': 1 }}>
            Each one started as a step a customer did by hand. Now it runs inside the platform, next to everything else.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BUILT.map(([Icon, title, text], i) => (
              <article key={title} className="card flex gap-4 p-5" data-reveal style={{ '--i': i % 3 }}>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[16px] font-bold tracking-tight text-ink">{title}</span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-ink2">{text}</span>
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
