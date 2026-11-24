import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Check, ExternalLink, Link2, Plus, Search } from 'lucide-react'
import { cn } from '../lib/cn'
import { prefersReducedMotion, useInView } from '../lib/motion'
import { SectionHead } from './SectionHead'
import { ContactBtns, Pill } from './mock/ui'
import { BuiltForYou } from './BuiltForYou'

/* ── Tracking: a ZIP is typed for the first truck, Enter saves it and moves to the next. ── */
const TRACK = [
  { unit: 169, name: 'Cody Martinez', veh: 'Large straight', phone: '+1 (404) 555-0159', loc: null, app: 'Invited', disp: 'Marcus B.' },
  { unit: 121, name: 'Arman Edwards', veh: 'Large straight', phone: '+1 (615) 555-0195', loc: ['New Orleans, LA 70112', '3 days ago'], app: 'Connected', disp: 'Kayla B.' },
  { unit: 190, name: 'Russell Lopez', veh: 'Cargo van', phone: '+1 (312) 555-0188', loc: ['Jacksonville, FL 32202', '3 days ago'], app: 'Invited', disp: 'Jordan R.' },
  { unit: 118, name: 'Mateo Haddad', veh: 'Large straight', phone: '+1 (972) 555-0154', loc: ['Cincinnati, OH 45202', '3 days ago'], app: 'Not invited', disp: 'Sofia A.' },
]
const ZIP = '30318'

function Tracking() {
  const box = useRef(null)
  const seen = useInView(box, { once: true, threshold: 0.45 })
  const [typed, setTyped] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!seen) return
    if (prefersReducedMotion()) {
      setTyped(ZIP)
      setSaved(true)
      return
    }
    const timers = []
    ZIP.split('').forEach((_, i) => timers.push(setTimeout(() => setTyped(ZIP.slice(0, i + 1)), 900 + i * 140)))
    timers.push(setTimeout(() => setSaved(true), 900 + ZIP.length * 140 + 420))
    return () => timers.forEach(clearTimeout)
  }, [seen])

  const done = saved ? 18 : 17
  return (
    <div ref={box} className="card-lg overflow-hidden text-[12.5px]">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-4 py-3.5">
        <p className="tnum text-[20px] font-extrabold tracking-tight text-ink">
          {done} of 32
        </p>
        <p className="text-ink2">active trucks have today’s location</p>
        <p className="font-semibold text-brand-ink">{32 - done} left to update</p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-sunk2">
          <div className="h-full origin-left rounded-full bg-green transition-transform duration-500 [transition-timing-function:var(--spring-soft)]" style={{ transform: `scaleX(${done / 32})` }} />
        </div>
      </div>
      <div className="flex items-center gap-4 overflow-hidden border-b border-line px-4 text-[12.5px]">
        <span className="flex items-center gap-1.5 whitespace-nowrap border-b-2 border-brand py-2.5 font-semibold text-brand-ink">
          Needs update <span className="chip h-[18px] bg-accent px-1.5 text-[10.5px] text-white">{32 - done}</span>
        </span>
        <span className="flex items-center gap-1.5 whitespace-nowrap py-2.5 text-ink2">
          <span className="h-1.5 w-1.5 rounded-full bg-green" /> Active <span className="text-ink3">32</span>
        </span>
        <span className="hidden items-center gap-1.5 whitespace-nowrap py-2.5 text-ink2 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-ink4" /> Inactive <span className="text-ink3">2</span>
        </span>
        <span className="hidden items-center gap-1.5 whitespace-nowrap py-2.5 text-ink2 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-red" /> Out of service <span className="text-ink3">2</span>
        </span>
      </div>
      <div className="th hidden grid-cols-[1.3fr_1.2fr_1.1fr_0.9fr] gap-3 border-b border-line px-4 py-2 md:grid">
        <span>Driver</span>
        <span>Location now</span>
        <span>New location</span>
        <span>Driver app</span>
      </div>
      {TRACK.map((t, i) => {
        const focus = (!saved && i === 0) || (saved && i === 1)
        const loc = i === 0 && saved ? ['Atlanta, GA 30318', 'Just now'] : t.loc
        return (
          <div
            key={t.unit}
            className={cn('grid grid-cols-[1fr_auto] items-center gap-3 border-b border-hair px-4 py-3 last:border-0 md:grid-cols-[1.3fr_1.2fr_1.1fr_0.9fr]', focus && 'bg-sel')}
          >
            <span className="min-w-0">
              <span className="block truncate font-bold text-ink">
                #{t.unit} {t.name}
              </span>
              <span className="block truncate text-[11.5px] text-ink3">{t.veh}</span>
            </span>
            <span className="hidden min-w-0 md:block">
              {loc ? (
                <>
                  <span className="block truncate font-semibold text-ink">{loc[0]}</span>
                  <span className={cn('flex items-center gap-1 text-[11.5px]', loc[1] === 'Just now' ? 'text-green' : 'text-red')}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" /> {loc[1]}
                  </span>
                </>
              ) : (
                <>
                  <span className="block font-semibold text-ink">No location</span>
                  <span className="text-[11.5px] text-ink3">Never updated</span>
                </>
              )}
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className={cn(
                  'tnum flex h-8 w-[84px] items-center rounded-lg border bg-sheet px-2.5 text-[12.5px] transition-[border-color,box-shadow] duration-150',
                  focus ? 'border-brand shadow-[0_0_0_3px_color-mix(in_srgb,var(--brand)_20%,transparent)]' : 'border-line'
                )}
              >
                {i === 0 && !saved ? (
                  <span className={cn(typed ? 'text-ink' : 'text-ink4', seen && 'caret')}>{typed || 'New ZIP'}</span>
                ) : i === 0 && saved ? (
                  <span className="flex items-center gap-1 font-semibold text-green" style={{ animation: 'rise 320ms var(--spring) both' }}>
                    <Check className="h-3.5 w-3.5" strokeWidth={3} /> Saved
                  </span>
                ) : (
                  <span className={cn(focus ? 'caret text-ink4' : 'text-ink4')}>New ZIP</span>
                )}
              </span>
              {t.loc && <span className="hidden h-8 items-center gap-1 whitespace-nowrap rounded-lg border border-line px-2 text-[11.5px] text-ink2 xl:flex"><Check className="h-3 w-3" /> Still there</span>}
            </span>
            <span className="hidden md:block">
              {t.app === 'Connected' ? (
                <Pill tone="green" dot={false}>Connected</Pill>
              ) : t.app === 'Invited' ? (
                <span className="flex items-center gap-1.5">
                  <Pill tone="amber" dot={false}>Invited</Pill>
                  <span className="chip border border-line bg-sheet text-ink">Resend</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Pill tone="gray" dot={false}>Not invited</Pill>
                  <span className="chip bg-brand text-white">Invite</span>
                </span>
              )}
            </span>
          </div>
        )
      })}
      <p className="flex flex-wrap items-center gap-1.5 bg-sunk px-4 py-2.5 text-[11.5px] text-ink3">
        Type a ZIP and press <kbd className="rounded border border-line bg-sheet px-1.5 font-sans text-ink2">Enter</kbd>: it saves and moves to the next truck
      </p>
    </div>
  )
}

/* ── Hiring: four columns; one card is carried to the next column along an arc. ── */
const COLS = [
  ['Lead', 'blue', 'Filled in the invite form'],
  ['Called', 'amber', 'Talked to on the phone'],
  ['Ready', 'violet', 'Cleared to start'],
  ['Active', 'green', 'Until their first load'],
]
const START_CARDS = {
  Lead: [['Bakhodir Rivera', '+1 (214) 555-0174', '1d ago'], ['Samuel Watson', '+1 (312) 555-0103', '2d ago']],
  Called: [['Monique Johnson', '+1 (214) 555-0169', '6d ago'], ['Dale Haddad', '+1 (817) 555-0170', '8d ago']],
  Ready: [['Tanya Robinson', '+1 (713) 555-0133', '8d ago']],
  Active: [['Cody Martinez', '+1 (404) 555-0159', 'Apr 30'], ['Nikolai Wright', '+1 (404) 555-0159', 'Mar 22']],
}
const DOT = { blue: 'bg-brand', amber: 'bg-star', violet: 'bg-violet', green: 'bg-green' }

function Hiring() {
  const box = useRef(null)
  const seen = useInView(box, { once: true, threshold: 0.5 })
  const [moved, setMoved] = useState(false)
  const rect = useRef(null)

  useEffect(() => {
    if (!seen) return
    const t = setTimeout(() => setMoved(true), 1100)
    return () => clearTimeout(t)
  }, [seen])

  /* FLIP with an arc: lift, travel over a curve, land with a small squash. */
  useLayoutEffect(() => {
    const el = box.current?.querySelector('[data-mover]')
    if (!el) return
    const now = el.getBoundingClientRect()
    const before = rect.current
    rect.current = now
    if (!moved || !before || prefersReducedMotion()) return
    const dx = before.left - now.left
    const dy = before.top - now.top
    el.animate(
      [
        { transform: `translate(${dx}px, ${dy}px)`, boxShadow: 'var(--shadow)', offset: 0 },
        { transform: `translate(${dx}px, ${dy - 6}px) scale(1.04) rotate(-1.5deg)`, boxShadow: 'var(--shadow-lg)', offset: 0.18 },
        { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 34}px) scale(1.05) rotate(1deg)`, boxShadow: 'var(--shadow-lg)', offset: 0.55 },
        { transform: 'translate(0, 0) scale(1.03, 0.97)', boxShadow: 'var(--shadow-2)', offset: 0.88 },
        { transform: 'none', boxShadow: 'var(--shadow)', offset: 1 },
      ],
      { duration: 900, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' }
    )
  }, [moved])

  const cards = moved
    ? { ...START_CARDS, Called: START_CARDS.Called.slice(1), Ready: [START_CARDS.Called[0], ...START_CARDS.Ready] }
    : START_CARDS

  return (
    <div ref={box} className="card-lg overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3">
        <p className="text-[14px] font-bold text-ink">Hiring</p>
        <span className="hidden h-8 flex-1 items-center gap-2 whitespace-nowrap rounded-lg border border-line px-2.5 text-[12px] text-ink4 xl:flex xl:max-w-[220px]">
          <Search className="h-3.5 w-3.5" /> Search name, email or phone
        </span>
        <span className="ml-auto flex h-8 items-center gap-1.5 rounded-lg border border-line px-2.5 text-[12px] font-semibold text-ink">
          <ExternalLink className="h-3.5 w-3.5" /> Invite link
        </span>
        <span className="flex h-8 items-center gap-1.5 rounded-lg bg-brand px-2.5 text-[12px] font-semibold text-white">
          <Plus className="h-3.5 w-3.5" /> Add request
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 bg-sunk/50 p-2.5 md:grid-cols-4">
        {COLS.map(([col, tone, hint]) => (
          <div key={col} className="min-h-[200px] rounded-xl border border-line bg-sunk/70 p-2">
            <p className="flex items-center gap-1.5 px-1 text-[12.5px] font-bold text-ink">
              <span className={cn('h-2 w-2 rounded-full', DOT[tone])} />
              {col}
              <span className="tnum font-medium text-ink3">{cards[col].length}</span>
            </p>
            <p className="truncate px-1 text-[10.5px] text-ink3">{hint}</p>
            <div className="mt-2 space-y-2">
              {cards[col].map(([name, phone, when]) => (
                <div key={name} data-mover={name === 'Monique Johnson' ? '' : undefined} className="relative rounded-lg border border-line bg-sheet p-2 shadow-[var(--shadow)]">
                  <div className="mb-1.5 h-8 overflow-hidden rounded-md bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] px-1.5 py-1">
                    <span className="block text-[6px] font-bold uppercase tracking-wider text-white/80">Sample state commercial driver license</span>
                    <span className="mt-0.5 flex gap-1">
                      <span className="h-3 w-3 rounded-sm bg-white/40" />
                      <span className="h-1 w-10 self-center rounded bg-white/30" />
                    </span>
                  </div>
                  <p className="truncate text-[12px] font-bold text-ink">{name}</p>
                  <p className="tnum truncate text-[10.5px] text-ink3">{phone}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <ContactBtns className="scale-90 origin-left" />
                    <span className="text-[10px] text-ink3">{when}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Onboarding: summary and the newest requests. ── */
function Onboarding() {
  const rows = [
    ['Bakhodir Rivera', '2 company documents', 'In review', 'amber'],
    ['Samuel Watson', 'No documents yet', 'Invited', 'blue'],
    ['Jason Roberts', '2 company documents', 'In review', 'amber'],
  ]
  return (
    <div className="card-lg overflow-hidden text-[12.5px]">
      <div className="grid grid-cols-2 gap-2 border-b border-line p-3 sm:grid-cols-4">
        {[
          ['New', 9, 'requests not active yet'],
          ['Waiting for the driver', 2, 'no documents yet'],
          ['In review', 7, 'documents in, check and sign'],
          ['Registered this week', 5, 'new requests'],
        ].map(([k, v, sub]) => (
          <div key={k} className="rounded-lg border border-line p-2.5">
            <p className="truncate text-[11.5px] text-ink2">{k}</p>
            <p className="tnum text-[20px] font-extrabold text-ink">{v}</p>
            <p className="truncate text-[10.5px] text-ink3">{sub}</p>
          </div>
        ))}
      </div>
      {rows.map(([name, docs, where, tone]) => (
        <div key={name} className="grid grid-cols-[1.2fr_1fr_auto] items-center gap-3 border-b border-hair px-4 py-2.5 last:border-0">
          <span className="min-w-0">
            <span className="block truncate font-semibold text-ink">{name}</span>
            <span className="block truncate text-[11px] text-ink3">{name.toLowerCase().replace(' ', '.')}@mail.example</span>
          </span>
          <span className="truncate text-ink3">{docs}</span>
          <Pill tone={tone}>{where}</Pill>
        </div>
      ))}
    </div>
  )
}

export function DriversSection() {
  return (
    <section id="drivers" className="relative border-t border-line py-24 lg:py-32">
      <div className="wrap">
        <SectionHead
          eyebrow="Drivers"
          title="Know where every truck is, and who joins next"
          lede="Tracking keeps one location a day for every active truck. Hiring and Onboarding carry a new driver from the first call to the signed contract and their first load."
        />

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div data-reveal style={{ '--i': 3 }}>
            <Tracking />
          </div>
          <div className="space-y-4" data-reveal style={{ '--i': 4 }}>
            <h3 className="text-[24px] font-bold tracking-tight text-ink">Tracking that fills itself in</h3>
            <ul className="space-y-4 text-[16.5px] leading-relaxed text-ink2">
              {[
                ['Drivers on BTM Driver share their location', 'their trucks update on their own and show as Connected.'],
                ['Everyone else takes one ZIP a day', 'type it and press Enter, or press Still there when the truck has not moved.'],
                ['Availability and out of service in the same list', 'so the load board never offers a truck that cannot run.'],
              ].map(([b, t]) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green-bg text-green">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>
                    <b className="font-semibold text-ink">{b}:</b> {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div data-reveal>
            <Hiring />
          </div>
          <div data-reveal style={{ '--i': 1 }}>
            <h3 className="text-[24px] font-bold tracking-tight text-ink">Hiring and onboarding</h3>
            <p className="mt-3 text-[16.5px] leading-relaxed text-ink2">
              Send one invite link. Drivers fill in the form, upload their documents and sign. Drag a driver to the next column as they move
              through hiring; they stay Active until their first load.
            </p>
            <div className="mt-5">
              <Onboarding />
            </div>
            <p className="mt-3 flex items-center gap-2 text-[13px] text-ink3">
              <Link2 className="h-3.5 w-3.5" aria-hidden="true" /> From the invite to the signed contract
            </p>
          </div>
        </div>
        <BuiltForYou className="mt-12">
          Your hiring stages, your documents and contract, leads dealt to your hiring team in turn, and drivers moved in from the system
          you use today.
        </BuiltForYou>
      </div>
    </section>
  )
}
