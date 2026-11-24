import { ArrowRight, Check, Smartphone } from 'lucide-react'
import { DISPATCH_APP_NAME } from '../config'
import { BookDemoButton } from './BookDemoButton'
import { TryDemoButton } from './TryDemoButton'
import { LiveBoard } from './mock/LiveBoard'

/* Entrance order (staging): pill, headline lines behind a mask, text, buttons, then the board,
 * then the two callouts. Each beat starts on its own, 60 to 120 ms after the one before. */
const beat = (ms) => ({ animation: `rise 640ms var(--spring-soft) ${ms}ms both` })
const line = (ms) => ({ animation: `mask-up 760ms var(--e-out) ${ms}ms both` })

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[104px] pb-16 sm:pt-[128px] lg:pb-24">
      <style>{`
        @keyframes mask-up {
          from { clip-path: inset(0 0 100% 0); transform: translate3d(0, 0.45em, 0); }
          to { clip-path: inset(0 0 -0.2em 0); transform: none; }
        }
        @keyframes callout {
          from { opacity: 0; transform: translate3d(0, 12px, 0) scale(0.94); filter: blur(4px); }
          to { opacity: 1; transform: none; filter: none; }
        }
      `}</style>

      {/* Ground: dotted grid fading out, a blue glow, and the app's route marks drawn in. */}
      <div className="dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_20%,#000_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[-280px] h-[640px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      <svg className="pointer-events-none absolute left-1/2 top-[118px] hidden h-[260px] w-[1180px] -translate-x-1/2 lg:block" viewBox="0 0 1180 260" fill="none" aria-hidden="true">
        <path
          d="M40 210 C 220 210, 230 60, 420 70 S 700 200, 860 120 S 1060 40, 1140 60"
          stroke="var(--ink4)"
          strokeWidth="2"
          strokeDasharray="2 9"
          strokeLinecap="round"
          opacity="0.55"
          pathLength="1"
          style={{ strokeDasharray: '0.006 0.012' }}
        />
        <circle cx="40" cy="210" r="7" stroke="var(--brand)" strokeWidth="3" fill="var(--ground)" style={beat(500)} />
        <circle cx="1140" cy="60" r="7" fill="var(--accent)" style={beat(700)} />
      </svg>

      <div className="wrap relative">
        <div className="mx-auto max-w-[880px] text-center">
          <a
            href="#apps"
            style={beat(0)}
            className="group inline-flex min-h-9 items-center gap-2 rounded-full border border-line bg-sheet py-1 pl-1.5 pr-3.5 text-[13.5px] font-semibold text-ink2 shadow-[var(--shadow)] transition-colors hover:border-brand/40 hover:text-ink"
          >
            <span className="chip h-6 bg-brand-soft px-2 text-brand-ink">
              <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
              New
            </span>
            {DISPATCH_APP_NAME} is on the App Store and Google Play
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>

          <h1 className="mt-7 text-[clamp(40px,6.2vw,70px)] font-extrabold leading-[1.03] tracking-[-0.045em] text-ink [&>span]:[text-wrap:balance]">
            <span className="block" style={line(80)}>
              Loads come in.
            </span>
            <span className="block text-brand-ink" style={line(180)}>
              The right truck is already picked.
            </span>
          </h1>

          <p className="lede mx-auto mt-6 max-w-[640px] text-[clamp(17px,1.8vw,19px)]" style={beat(300)}>
            BoxTruckManage is the dispatch platform for box truck fleets, built around how your company works. You get
            everything other fleets use, and we customize the rest for you, from hiring to dispatch, accounting and
            P&amp;L, until every step of your workflow runs in one place.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={beat(380)}>
            <TryDemoButton place="hero" size="lg" className="w-full sm:w-auto" />
            <BookDemoButton className="btn-lg w-full sm:w-auto" />
          </div>

          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13.5px] text-ink3" style={beat(440)}>
            {['No sign-up', 'A sample fleet with live loads', 'Click anything, nothing reaches a broker'].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-green" strokeWidth={3} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-14 w-full max-w-[1290px] px-3 sm:px-6 lg:mt-16">
        <div className="relative" style={{ animation: 'rise 900ms var(--spring-soft) 520ms both' }}>
          <LiveBoard />

          {/* Callouts: the two things the board does that a plain load board does not. */}
          <div
            className="card absolute -left-10 top-[50%] hidden w-[236px] p-3.5 shadow-[var(--shadow-lg)] 2xl:block"
            style={{ animation: 'callout 560ms var(--spring) 1300ms both' }}
            aria-hidden="true"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink3">Nearest truck</p>
            <p className="mt-1 text-[14px] font-bold text-ink">
              Mateo Price #127 · <span className="text-green">3 mi</span>
            </p>
            <p className="mt-0.5 text-[12px] text-ink3">Cargo van, free now, fits the load</p>
          </div>
          <div
            className="card absolute -right-10 top-[12%] hidden w-[248px] p-3.5 shadow-[var(--shadow-lg)] 2xl:block"
            style={{ animation: 'callout 560ms var(--spring) 1480ms both' }}
            aria-hidden="true"
          >
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink3">
              <Smartphone className="h-3 w-3" /> Bid from BTM Driver
            </p>
            <p className="mt-1 text-[14px] font-bold text-ink">
              Dmitri Young #106 · <span className="text-red">$5,150</span>
            </p>
            <p className="mt-0.5 text-[12px] text-ink3">Shows on the load the moment it is sent</p>
          </div>
        </div>
      </div>
    </section>
  )
}
