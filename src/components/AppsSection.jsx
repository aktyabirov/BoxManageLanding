import { Check } from 'lucide-react'
import { DISPATCH_APP, DISPATCH_APP_NAME, DRIVER_APP, DRIVER_APP_NAME, asset } from '../config'
import { cn } from '../lib/cn'
import { SectionHead } from './SectionHead'
import { StoreButtons } from './StoreButtons'

/* Real screens from the store listings, in a plain phone frame. */
function Phone({ src, alt, className, style }) {
  return (
    <div className={cn('w-[min(220px,42vw)] shrink-0 rounded-[34px] border border-line bg-inv p-[7px] shadow-[var(--shadow-lg)] dark:bg-[#1A2135]', className)} style={style}>
      <img src={src} alt={alt} width={600} height={1305} loading="lazy" decoding="async" className="block w-full rounded-[27px]" />
    </div>
  )
}

const APPS = [
  {
    name: DRIVER_APP_NAME,
    who: 'For your drivers',
    app: DRIVER_APP,
    lede: 'Drivers join your company in the app, keep their profile, truck and documents in one place, and bid on loads near them from the road.',
    points: [
      'Loads near the driver, with filters',
      'A bid goes to your board; nothing reaches the broker until you send it',
      'Shares location, so Tracking stays current by itself',
      'Payouts: what is coming, what is on hold, what was paid',
    ],
    shots: [
      [asset('apps/driver-loads.webp'), 'BTM Driver loads list: loads near Chicago within 150 miles, each with pick-up, delivery, miles and a Bid button'],
      [asset('apps/driver-bid.webp'), 'BTM Driver bid screen: the driver sets a price and picks which carriers bid for them'],
    ],
  },
  {
    name: DISPATCH_APP_NAME,
    who: 'For your dispatchers',
    app: DISPATCH_APP,
    lede: 'The live board, the load window and the broker inbox on a phone, for the hours away from the desk.',
    points: [
      'The live board, with filters and a radius around your trucks',
      'Pick the nearest driver and bid in a tap',
      'Driver bids show right on the load',
      'Broker replies and your own numbers, wherever you are',
    ],
    shots: [
      [asset('apps/dispatch-board.webp'), 'BTM Dispatch board: live loads with a driver bid of $900 shown on one of them'],
      [asset('apps/dispatch-inbox.webp'), 'BTM Dispatch inbox: a broker reply to a bid with an answer box under it'],
    ],
  },
]

export function AppsSection() {
  return (
    <section id="apps" className="relative overflow-hidden border-t border-line py-24 lg:py-32">
      <div className="wrap">
        <SectionHead
          center
          eyebrow="Mobile apps"
          title="Two apps on iPhone and Android"
          lede="Both connect to the same company in BoxTruckManage, so a bid from a driver’s phone shows on the dispatcher’s board, on the web and in the app."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {APPS.map((a, k) => (
            <article key={a.name} className="relative overflow-hidden rounded-[28px] border border-line bg-sheet p-6 shadow-[var(--shadow)] sm:p-8" data-reveal style={{ '--i': 3 + k }}>
              <div className="flex items-center gap-3">
                <img src={asset('logo/logo-mark.svg')} alt="" className="h-11 w-11 rounded-xl bg-sheet p-1.5 shadow-[var(--shadow)]" />
                <div>
                  <h3 className="text-[26px] font-extrabold tracking-tight text-ink">{a.name}</h3>
                  <p className="text-[15px] font-semibold text-brand-ink">{a.who}</p>
                </div>
              </div>
              <p className="mt-4 text-[17px] leading-relaxed text-ink2">{a.lede}</p>
              <ul className="mt-5 space-y-2.5">
                {a.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[16px] text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" strokeWidth={3} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <StoreButtons app={a.app} name={a.name} className="mt-6" />

              <div className="relative mt-8 flex h-[330px] justify-center sm:h-[400px]">
                <Phone src={a.shots[1][0]} alt={a.shots[1][1]} className="absolute left-1/2 top-10 translate-x-[-4%] rotate-[4deg] opacity-95" />
                <Phone src={a.shots[0][0]} alt={a.shots[0][1]} className="absolute left-1/2 top-0 -translate-x-[96%] -rotate-[3deg]" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
