import { useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { useInView, useInterval, useReducedMotion } from '../lib/motion'
import { SectionHead } from './SectionHead'
import { StepBid, StepMatch, StepPaid, StepPost, StepReply } from './mock/steps'

const STEPS = [
  {
    title: 'A load posts',
    text: 'Loads land on the board the second brokers post them, with pick-up and delivery in local time, miles, the posted rate when there is one, and your team’s rating of the broker.',
    Shot: StepPost,
  },
  {
    title: 'The nearest truck is already picked',
    text: 'Every load shows your closest truck that can haul it: right type, box and payload that fit, free by pick-up. Miles out are the empty miles to the pick-up.',
    Shot: StepMatch,
  },
  {
    title: 'Bid with the profit in view',
    text: 'Type the price for the broker and for the driver and the profit line updates as you type. The bid email fills in itself and goes out from the dispatcher’s own mailbox.',
    Shot: StepBid,
  },
  {
    title: 'Broker replies land in Conversations',
    text: 'Every answer to a bid comes back into one inbox, tied to its load, with the bid, the agreed rate, driver pay and margin pinned on top.',
    Shot: StepReply,
  },
  {
    title: 'Booked, checked and paid',
    text: 'The rate con is checked against the deal: price, stops and dates. The load moves to Accounting, and the driver payout goes from pending to paid.',
    Shot: StepPaid,
  },
]

const STEP_MS = 6000

/* Wide screens: a step list beside one stage. The steps advance by themselves while the section
 * is on screen (a bar under the open step shows the time left) and stop for good once someone
 * picks a step. The old shot leaves while the new one arrives, so the two states overlap.
 * Narrow screens: the steps simply follow each other, each with its own shot. */
export function HowItWorks() {
  const stage = useRef(null)
  const inView = useInView(stage, { threshold: 0.4 })
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const [manual, setManual] = useState(false)
  const [hold, setHold] = useState(false)
  const auto = inView && !manual && !hold && !reduce

  useInterval(() => setStep((s) => (s + 1) % STEPS.length), STEP_MS, auto)

  const pick = (i) => {
    setManual(true)
    setStep(i)
  }

  const onKey = (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const i = (step + (e.key === 'ArrowDown' ? 1 : STEPS.length - 1)) % STEPS.length
    pick(i)
    document.getElementById(`how-tab-${i}`)?.focus()
  }

  return (
    <section id="how" className="relative border-t border-line bg-sheet py-24 lg:py-32">
      <div className="wrap">
        <SectionHead
          eyebrow="How it works"
          title="From posted load to paid driver, in one place"
          lede="The board, the bid, the broker’s reply, the rate con and the payout are one record, so nobody copies a load from one tool into another."
        />

        {/* Wide: list and stage. */}
        <div ref={stage} className="mt-14 hidden grid-cols-[minmax(300px,380px)_1fr] gap-12 lg:grid" onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)}>
          <div role="tablist" aria-orientation="vertical" aria-label="Steps" onKeyDown={onKey} className="space-y-1.5" data-reveal style={{ '--i': 3 }}>
            {STEPS.map((s, i) => {
              const on = step === i
              return (
                <button
                  key={s.title}
                  id={`how-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="how-stage"
                  tabIndex={on ? 0 : -1}
                  onClick={() => pick(i)}
                  className={cn(
                    'relative w-full overflow-hidden rounded-2xl border px-5 py-3.5 text-left transition-[background-color,border-color,box-shadow] duration-200',
                    on ? 'border-line bg-ground shadow-[var(--shadow-2)]' : 'border-transparent hover:bg-ground/70'
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        'tnum grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] font-bold transition-colors duration-200',
                        on ? 'bg-brand text-on-brand' : 'bg-sunk2 text-ink2'
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className={cn('text-[16px] font-bold tracking-tight transition-colors', on ? 'text-ink' : 'text-ink2')}>{s.title}</span>
                  </span>
                  <span className={cn('block pl-10 pt-1.5 text-[14.5px] leading-relaxed transition-colors duration-200', on ? 'text-ink2' : 'text-ink3')}>{s.text}</span>
                  {on && auto && (
                    <span className="absolute inset-x-5 bottom-0 h-[2px] overflow-hidden rounded-full bg-line" aria-hidden="true">
                      <span key={step} className="block h-full origin-left bg-brand" style={{ animation: `fill-x ${STEP_MS}ms linear both` }} />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div id="how-stage" role="tabpanel" aria-labelledby={`how-tab-${step}`} className="relative grid items-start self-start lg:sticky lg:top-28" data-reveal style={{ '--i': 4 }}>
            {STEPS.map(({ title, Shot }, i) => {
              const on = step === i
              return (
                <div
                  key={title}
                  aria-hidden={!on}
                  className="col-start-1 row-start-1 transition-[opacity,transform,filter]"
                  style={{
                    opacity: on ? 1 : 0,
                    transform: on ? 'none' : 'translateY(8px) scale(0.985)',
                    filter: on ? 'none' : 'blur(4px)',
                    pointerEvents: on ? 'auto' : 'none',
                    transitionDuration: on ? '320ms' : '256ms',
                    transitionTimingFunction: on ? 'var(--e-out)' : 'var(--e-in)',
                    transitionDelay: on ? '60ms' : '0ms',
                  }}
                >
                  <div className="rounded-[22px] border border-line bg-ground p-3 sm:p-4">
                    <Shot active={on && inView} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Narrow: one after another. */}
        <ol className="mt-12 space-y-12 lg:hidden">
          {STEPS.map((s, i) => (
            <NarrowStep key={s.title} s={s} i={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}

function NarrowStep({ s, i }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, threshold: 0.3 })
  const { Shot } = s
  return (
    <li ref={ref}>
      <div className="flex items-center gap-3" data-reveal>
        <span className="tnum grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-[13px] font-bold text-on-brand">{i + 1}</span>
        <h3 className="text-[18px] font-bold tracking-tight text-ink">{s.title}</h3>
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-ink2" data-reveal style={{ '--i': 1 }}>
        {s.text}
      </p>
      <div className="mt-4 rounded-[20px] border border-line bg-ground p-2.5" data-reveal style={{ '--i': 2 }}>
        <Shot active={seen} />
      </div>
    </li>
  )
}
