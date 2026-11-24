import { asset } from '../../config'
import { useEffect, useRef, useState } from 'react'
import {
  Building2,
  ChevronDown,
  Clock,
  ExternalLink,
  Inbox,
  LayoutGrid,
  List,
  Package,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Truck,
  Users,
  Columns3,
  Wallet,
  Mail,
  ListChecks,
} from 'lucide-react'
import { cn } from '../../lib/cn'
import { useFlip, useInView, useInterval, useReducedMotion } from '../../lib/motion'
import { LiveBadge, Stars } from './ui'

/* Sample loads in the demo's own words (Redwood Freight LLC's board). All names are invented. */
const START = [
  { id: 'a1', age: 2, pu: 'PORTLAND, OR 97204', puT: 'Tomorrow 00:13 PST', del: 'HOUSTON, TX 77002', delT: 'Thu 08:13 CST', mi: 2164, rate: '$4,570', veh: 'Cargo van', truck: ['Mateo Price', 127, 3, '1 cargo van within 150 mi'], broker: 'Riverbend Shipping Group', stars: 5, bid: 'Dmitri Young #106 bid $5,150 · 1m ago' },
  { id: 'a2', age: 4, pu: 'LOUISVILLE, KY 40202', puT: 'Tomorrow 15:09 EST', del: 'EL PASO, TX 79901', delT: 'Direct', mi: 1478, rate: '$3,970', veh: 'Large straight', truck: ['Nikolai Green', 193, 94, '1 large straight within 150 mi'], broker: 'Granite Peak Transport', stars: 4, note: 'Good lanes out of Texas. Ask for Megan.' },
  { id: 'a3', age: 5, pu: 'BOSTON, MA 02110', puT: 'ASAP', del: 'SPRINGFIELD, MO 65806', delT: 'Tomorrow 04:15 CST', mi: 1450, veh: 'Straight truck', truck: null, miss: 'No large straight within 150 mi', broker: 'Meridian Run Logistics', stars: 4, note: 'Pays on time, quick pay 2%.', seen: true },
  { id: 'a4', age: 7, pu: 'LOUISVILLE, KY 40202', puT: 'Tomorrow 03:05 EST', del: 'NASHVILLE, TN 37203', delT: 'Tomorrow 13:05 CST', mi: 184, rate: '$415', veh: 'Cargo van', truck: ['Eric Ivanov', 109, 86, '2 cargo vans within 150 mi'], broker: 'Harborview Freight Co', stars: 4, note: 'Strict on check calls every 2 hours.' },
  { id: 'a5', age: 9, pu: 'LEXINGTON, KY 40507', puT: 'ASAP', del: 'PHOENIX, AZ 85004', delT: 'Tomorrow 12:05 MST', mi: 1855, rate: '$5,645', veh: 'Large straight', truck: ['Nikolai Green', 193, 78, '1 large straight within 150 mi'], broker: 'Horizon Line Logistics', stars: 4, mine: true },
  { id: 'a6', age: 11, pu: 'BIRMINGHAM, AL 35203', puT: 'Tomorrow 12:06 CST', del: 'ORLANDO, FL 32801', delT: 'Direct', mi: 555, rate: '$1,315', veh: 'Small straight', truck: ['Calvin Perez', 130, 41, '1 small straight within 150 mi'], broker: 'Copper Canyon Brokerage', stars: 4, note: 'Good lanes out of Texas. Ask for Megan.', seen: true },
  { id: 'a7', age: 14, pu: 'DALLAS, TX 75201', puT: 'Tomorrow 02:02 CST', del: 'BUFFALO, NY 14202', delT: 'Thu 17:02 EST', mi: 1413, veh: 'Small straight', truck: null, miss: 'No straight truck within 150 mi', broker: 'Brightpath Freight', stars: 3, seen: true },
]

const INCOMING = [
  { pu: 'LAREDO, TX 78040', puT: 'Tomorrow 11:16 CST', del: 'MEMPHIS, TN 38103', delT: 'Thu 15:16 CST', mi: 905, rate: '$2,500', veh: 'Small straight', truck: ['Terrence Roberts', 133, 12, '2 small straights within 150 mi'], broker: 'Bold Eagle Freight', stars: 5 },
  { pu: 'ATLANTA, GA 30303', puT: 'ASAP', del: 'SHREVEPORT, LA 71101', delT: 'Tomorrow 09:40 CST', mi: 647, rate: '$1,560', veh: 'Cargo van', truck: ['Calvin Perez', 130, 18, '3 cargo vans within 150 mi'], broker: 'Midstate Freight Exchange', stars: 4, note: 'Strict on check calls every 2 hours.' },
  { pu: 'PITTSBURGH, PA 15222', puT: 'Today 21:30 EST', del: 'COLUMBUS, OH 43215', delT: 'Direct', mi: 185, rate: '$520', veh: 'Sprinter van', truck: ['Terrence Stewart', 145, 7, '1 cargo van within 150 mi'], broker: 'Northstar Cargo Partners', stars: 3 },
  { pu: 'MEMPHIS, TN 38103', puT: 'Tomorrow 07:00 CST', del: 'CHICAGO, IL 60607', delT: 'Tomorrow 19:00 CST', mi: 532, veh: 'Large straight', truck: ['Eric Ivanov', 109, 26, '1 large straight within 150 mi'], broker: 'Wildflower Logistics', stars: 5, note: 'Pays on time, quick pay 2%.' },
  { pu: 'TUCSON, AZ 85701', puT: 'Tomorrow 07:05 MST', del: 'LOUISVILLE, KY 40202', delT: 'Thu 01:05 EST', mi: 1743, veh: 'Sprinter van', truck: null, miss: 'No cargo van within 150 mi', broker: 'Parkside Logistics', stars: 4 },
  { pu: 'SAVANNAH, GA 31401', puT: 'Today 20:17 EST', del: 'CHICAGO, IL 60607', delT: 'Tomorrow 20:17 CST', mi: 905, rate: '$2,350', veh: 'Cargo van', truck: ['Calvin Perez', 130, 24, '4 cargo vans within 500 mi'], broker: 'Frontier Expedite Partners', stars: 4 },
]

const ZONES = [
  ['PST', 'America/Los_Angeles'],
  ['MST', 'America/Denver'],
  ['CST', 'America/Chicago'],
  ['EST', 'America/New_York'],
]

function useClock(active) {
  const [now, setNow] = useState(() => new Date())
  useInterval(() => setNow(new Date()), 20000, active)
  return now
}

const fmt = (tz, d) => new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: tz }).format(d)

const SIDE = [
  ['Dispatch', [[LayoutGrid, 'Dashboard'], [List, 'Load board', true], [Package, 'Loads'], [Inbox, 'Conversations', false, '2']]],
  ['Drivers', [[Truck, 'Tracking'], [Users, 'Onboarding'], [Columns3, 'Hiring', false, '4', true]]],
  ['Money', [[Wallet, 'Accounting'], [Building2, 'Brokers']]],
  ['Admin', [[SlidersHorizontal, 'Admin']]],
]

function Sidebar() {
  return (
    <aside className="hidden w-[196px] shrink-0 flex-col border-r border-line bg-sheet px-3 py-4 xl:flex" aria-hidden="true">
      <div className="flex items-center gap-2 px-1">
        <img src={asset('logo/logo-mark.svg')} alt="" className="h-7 w-7" />
        <span className="flex flex-col gap-[2px]">
          <span className="text-[13px] font-extrabold leading-none tracking-[-0.03em] text-ink">
            <span className="text-brand-ink">BOX</span>TRUCK
          </span>
          <span className="text-[7.5px] font-semibold uppercase leading-none tracking-[0.38em] text-ink3">Manage</span>
        </span>
      </div>
      <p className="mt-2 flex items-center gap-1 whitespace-nowrap pl-9 text-[10.5px] text-ink3">
        Redwood Freight LLC <span className="font-semibold text-brand-ink">Demo</span>
      </p>
      {SIDE.map(([group, items]) => (
        <div key={group} className="mt-4">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink3">{group}</p>
          <div className="mt-1 space-y-0.5">
            {items.map(([Icon, label, on, count, blue]) => (
              <div
                key={label}
                className={cn(
                  'flex h-8 items-center gap-2.5 rounded-lg px-2 text-[12.5px] font-medium',
                  on ? 'border border-brand/25 bg-brand-soft text-brand-ink' : 'text-ink2'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
                {count && (
                  <span className={cn('ml-auto text-[11px]', blue ? 'grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white' : 'text-ink3')}>
                    {count}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </aside>
  )
}

function Age({ m }) {
  if (m === 0) return <span className="font-bold text-accent-ink">now</span>
  return <span className="text-ink3">{m}m</span>
}

function Row({ r }) {
  const bold = !r.seen
  return (
    <div
      data-key={r.id}
      className={cn(
        'grid items-center gap-x-3 border-b border-hair px-3 py-2.5 sm:px-4',
        'grid-cols-[38px_1fr] md:grid-cols-[44px_1.15fr_1.15fr_56px_1.45fr] lg:grid-cols-[44px_1.1fr_1.1fr_56px_0.85fr_1.35fr_1.45fr]',
        r.bid ? 'bg-rose-row' : r.mine ? 'bg-mint-row' : r.seen ? 'bg-sunk/60' : '',
        r.fresh && 'row-new'
      )}
    >
      <div className="text-[12.5px]">
        <Age m={r.age} />
      </div>

      {/* Phones: pick-up to delivery on one line, the nearest truck under it. */}
      <div className="min-w-0 md:hidden">
        <p className={cn('truncate text-[12.5px] text-ink', bold && 'font-bold')}>
          {r.pu.replace(/ \d{5}$/, '')} <span className="text-ink4">to</span> {r.del.replace(/ \d{5}$/, '')}
        </p>
        <p className="mt-0.5 truncate text-[11.5px] text-ink3">
          {r.truck ? (
            <>
              <span className="font-semibold text-ink">{r.truck[0]} #{r.truck[1]}</span> · <span className="font-semibold text-green">{r.truck[2]} mi</span>
            </>
          ) : (
            r.miss
          )}
          {r.rate && <span className="ml-1.5 font-semibold text-green">{r.rate}</span>}
        </p>
      </div>

      <div className="hidden min-w-0 md:block">
        <p className={cn('truncate text-[12.5px] text-ink', bold && 'font-bold')}>{r.pu}</p>
        <p className="truncate text-[11.5px] text-ink3">{r.puT}</p>
      </div>
      <div className="hidden min-w-0 md:block">
        <p className={cn('truncate text-[12.5px] text-ink', bold && 'font-bold')}>{r.del}</p>
        <p className="truncate text-[11.5px] text-ink3">{r.delT}</p>
      </div>
      <div className="tnum hidden text-right md:block">
        <p className="text-[12.5px] font-bold text-ink">{r.mi}</p>
        {r.rate && <p className="text-[11.5px] font-bold text-green">{r.rate}</p>}
      </div>
      <div className="hidden truncate text-[12.5px] text-ink lg:block">{r.veh}</div>
      <div className="hidden min-w-0 md:block">
        {r.truck ? (
          <>
            <p className="truncate text-[12.5px] text-ink">
              <span className="font-semibold">{r.truck[0]}</span> #{r.truck[1]} · <span className="font-semibold text-green">{r.truck[2]} mi</span>
            </p>
            <p className="truncate text-[11.5px] text-ink3">{r.truck[3]}</p>
          </>
        ) : (
          <>
            <p className="truncate text-[12.5px] text-ink3">{r.miss}</p>
            <p className="truncate text-[11.5px] text-ink3">Try a bigger radius</p>
          </>
        )}
      </div>
      <div className="hidden min-w-0 lg:block">
        <p className="flex items-center gap-1.5 truncate text-[12.5px] text-ink">
          <span className="truncate">{r.broker}</span>
          <Stars n={r.stars} size={10} className="shrink-0" />
        </p>
        {r.bid ? (
          <p className="truncate text-[11.5px] font-semibold text-red">{r.bid}</p>
        ) : r.note ? (
          <p className="truncate text-[11.5px] text-ink3">&ldquo;{r.note}&rdquo;</p>
        ) : null}
      </div>
    </div>
  )
}

/**
 * The load board as the demo shows it, with new loads streaming in at the top. Rows that move
 * glide (FLIP, transform only); the new row drops in and flashes the app's new-load orange.
 * It runs only while on screen, pauses under the pointer so a row can be read, and stands
 * still for reduced motion.
 */
export function LiveBoard() {
  const box = useRef(null)
  const list = useRef(null)
  const inView = useInView(box, { threshold: 0.2 })
  const reduce = useReducedMotion()
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(true)
  const [rows, setRows] = useState(START)
  const next = useRef(0)
  const now = useClock(inView)

  useEffect(() => {
    const on = () => setVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', on)
    return () => document.removeEventListener('visibilitychange', on)
  }, [])

  useInterval(
    () => {
      const src = INCOMING[next.current % INCOMING.length]
      next.current += 1
      setRows((cur) => [
        { ...src, id: `n${next.current}`, age: 0, fresh: true },
        ...cur.slice(0, 6).map((r) => ({ ...r, age: r.age + 1, fresh: false })),
      ])
    },
    3600,
    inView && visible && !hover && !reduce
  )

  useFlip(list, rows)

  return (
    <div
      ref={box}
      className="card-lg flex overflow-hidden text-left"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      role="img"
      aria-label="The BoxTruckManage load board: new loads arrive at the top, each with the nearest available truck, its distance to the pick-up, and the broker's rating."
    >
      <Sidebar />
      <div className="min-w-0 flex-1" aria-hidden="true">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-5">
          <p className="text-[17px] font-bold tracking-tight text-ink">Load board</p>
          <LiveBadge />
          <div className="mx-auto hidden items-center gap-3 rounded-full border border-line px-3 py-1 text-[11px] text-ink lg:flex">
            {ZONES.map(([z, tz]) => (
              <span key={z} className="tnum">
                <span className="text-ink3">{z}</span> {fmt(tz, now)}
              </span>
            ))}
          </div>
          <div className="ml-auto hidden h-8 w-48 items-center gap-2 rounded-lg border border-line px-2.5 text-[11.5px] text-ink4 md:flex lg:ml-0">
            <Search className="h-3.5 w-3.5" />
            Search city, broker or ref #
          </div>
        </div>

        <div className="flex items-center gap-5 border-b border-line px-4 text-[12.5px] sm:px-5">
          <span className="flex items-center gap-1.5 border-b-2 border-brand py-2.5 font-semibold text-brand-ink">
            <ListChecks className="h-3.5 w-3.5" />
            All loads
          </span>
          <span className="flex items-center gap-1.5 py-2.5 text-ink2">
            <Mail className="h-3.5 w-3.5" />
            Bid history <span className="chip h-[18px] bg-sunk px-1.5 text-[10.5px] text-ink2">33</span>
          </span>
          <span className="hidden items-center gap-1.5 py-2.5 text-ink2 sm:flex">
            <Truck className="h-3.5 w-3.5" />
            Recovery
          </span>
          <span className="ml-auto hidden items-center gap-1.5 text-ink2 md:flex">
            <Clock className="h-3.5 w-3.5" />
            Local times <ChevronDown className="h-3 w-3" />
          </span>
          <span className="hidden items-center gap-1.5 text-brand-ink lg:flex">
            <ExternalLink className="h-3.5 w-3.5" />
            Open in new tab
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 sm:px-5">
          <span className="grid h-7 w-7 place-items-center rounded-lg border border-line text-ink2">
            <RefreshCw className="h-3 w-3" />
          </span>
          {['Search for', 'Pick-up', 'Delivery', 'Vehicle', 'Miles', 'Brokers'].map((f, i) => (
            <span key={f} className={cn('h-7 items-center gap-1 rounded-lg border border-line px-2.5 text-[11.5px] text-ink2', i > 2 ? 'hidden sm:flex' : 'flex')}>
              {f} <ChevronDown className="h-3 w-3" />
            </span>
          ))}
          <span className="ml-auto hidden items-center gap-3 text-[11px] text-ink3 xl:flex">
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm bg-mint-row ring-1 ring-green-track" /> Your team already bid
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm bg-rose-row ring-1 ring-red/20" /> A driver bid
            </span>
            <span>
              <b className="text-ink">Bold</b> = not opened yet
            </span>
          </span>
        </div>

        <div className="mx-3 mb-3 overflow-hidden rounded-xl border border-line sm:mx-4">
          <div className="th hidden gap-x-3 border-b border-line bg-sheet px-4 py-2 md:grid md:grid-cols-[44px_1.15fr_1.15fr_56px_1.45fr] lg:grid-cols-[44px_1.1fr_1.1fr_56px_0.85fr_1.35fr_1.45fr]">
            <span>Age</span>
            <span>Pick-up · local</span>
            <span>Delivery · local</span>
            <span className="text-right">Miles</span>
            <span className="hidden lg:block">Vehicle</span>
            <span>Nearest truck</span>
            <span className="hidden lg:block">Broker</span>
          </div>
          <div ref={list} className="relative h-[364px] overflow-hidden sm:h-[392px]">
            {rows.map((r) => (
              <Row key={r.id} r={r} />
            ))}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-sheet to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}
