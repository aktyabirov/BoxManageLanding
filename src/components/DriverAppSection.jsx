import {
  Smartphone,
  MapPin,
  Gavel,
  UserPlus,
  FileText,
  Bell,
  CheckCircle2,
  Navigation,
  Building2,
} from 'lucide-react'
import { APP_NAME, DRIVER_APP_NAME } from '../config'
import { StoreButtons } from './StoreButtons'

function PhoneFrame({ children }) {
  return (
    <div className="relative mx-auto w-[270px] shrink-0">
      <div className="relative overflow-hidden rounded-[2.2rem] border-[3px] border-slate-700 bg-sheet">
        <div className="flex items-center justify-center border-b border-hair bg-sunk py-2">
          <span className="h-1 w-10 rounded-full bg-slate-700" />
        </div>
        <div className="min-h-[460px]">{children}</div>
        <div className="flex justify-center border-t border-hair py-2">
          <span className="h-1 w-20 rounded-full bg-slate-700" />
        </div>
      </div>
    </div>
  )
}

function DriverAppMock() {
  return (
    <PhoneFrame>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-slate-500">{DRIVER_APP_NAME}</p>
            <p className="font-display text-sm font-bold text-ink">Hi, Ricardo</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Sharing location
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl panel-hi px-3 py-2">
          <Building2 className="h-4 w-4 text-brand-400" />
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-ink">Lone Star Box Freight</p>
            <p className="text-[10px] text-emerald-300">Connected carrier</p>
          </div>
        </div>

        <div className="relative mt-3 h-28 overflow-hidden rounded-xl bg-sunk ring-1 ring-hair">
          <svg viewBox="0 0 200 110" className="absolute inset-0 h-full w-full opacity-50">
            <path d="M0,70 L50,55 L90,72 L130,40 L170,52 L200,30" fill="none" stroke="oklch(0.6954 0.1547 58.38)" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute -inset-2.5 animate-ping rounded-full bg-brand-500/30" />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full btn-brand">
              <Navigation className="h-4 w-4" />
            </div>
          </div>
          <div className="absolute bottom-2 left-2 rounded-lg bg-black/60 px-2 py-1 text-[10px] text-slate-300">
            <MapPin className="mb-0.5 inline h-3 w-3 text-brand-400" /> Irving, TX
          </div>
        </div>

        <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Loads near you
        </p>
        <div className="mt-2 rounded-xl border border-hair bg-white/[0.03] p-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">Dallas → Houston</p>
              <p className="text-[11px] text-slate-500">239 mi · 18 mi to pickup</p>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300">Fits</span>
          </div>
          <div className="mt-2.5 rounded-lg field px-2.5 py-1.5">
            <p className="text-[10px] text-slate-500">Your bid</p>
            <p className="figure text-sm font-semibold text-ink">$1,850</p>
          </div>
          <div className="mt-1.5 rounded-lg field px-2.5 py-1.5 text-[11px] text-slate-400">
            Can be there by 7:30
          </div>
          <div className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg btn-brand py-2 text-xs font-semibold">
            <Gavel className="h-3.5 w-3.5" />
            Send bid to dispatch
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}

const appStatus = {
  Connected: 'bg-emerald-500/15 text-emerald-300',
  Invited: 'bg-amber-500/15 text-amber-300',
  'Not invited': 'bg-white/[0.06] text-slate-400',
}

function DispatchTrackingMock() {
  const rows = [
    { name: 'R. Mendez', truck: '#74', zip: '75038', status: 'Available', app: 'Connected' },
    { name: 'J. Carter', truck: '#12', zip: '30318', status: 'On load', app: 'Connected' },
    { name: 'M. Brooks', truck: '#31', zip: '46204', status: 'Available', app: 'Invited' },
    { name: 'T. Wilson', truck: '#08', zip: '85009', status: 'Out of service', app: 'Not invited' },
  ]

  return (
    <div className="overflow-hidden rounded-2xl panel">
      <div className="flex items-center justify-between border-b border-hair px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-ink">Tracking</p>
          <p className="text-[11px] text-slate-500">Dispatcher view · today’s locations</p>
        </div>
        <span className="flex items-center gap-1 rounded-full chip-brand px-2 py-0.5 text-[10px] font-medium">
          <Bell className="h-3 w-3" />2 new driver bids
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[380px] text-left text-xs">
          <thead>
            <tr className="border-b border-hair text-slate-500">
              <th className="px-3 py-2 font-medium">Driver</th>
              <th className="px-3 py-2 font-medium">Location</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Driver app</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-b border-hair/60">
                <td className="px-3 py-2.5">
                  <p className="font-medium text-ink">{r.name}</p>
                  <p className="text-[10px] text-slate-500">Truck {r.truck}</p>
                </td>
                <td className="figure px-3 py-2.5 text-slate-300">{r.zip}</td>
                <td className="px-3 py-2.5 text-slate-400">{r.status}</td>
                <td className="px-3 py-2.5">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${appStatus[r.app]}`}>
                    {r.app}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-hair bg-brand-500/[0.06] px-4 py-2.5">
        <p className="text-[11px] text-slate-400">
          <span className="font-medium text-brand-300">R. Mendez</span> bid $1,850 on Dallas → Houston.
          It shows on the load board, ready for you to bid the broker.
        </p>
      </div>
    </div>
  )
}

const steps = [
  {
    icon: Smartphone,
    title: 'Driver installs the app',
    desc: `${DRIVER_APP_NAME} is on the App Store and Google Play. The driver registers with their email.`,
  },
  {
    icon: UserPlus,
    title: 'You invite them',
    desc: 'Invite the driver from Tracking. They accept your company as a carrier right in the app.',
  },
  {
    icon: FileText,
    title: 'Profile, truck and documents',
    desc: 'The driver shares their profile, vehicle and documents with you, so nothing gets retyped.',
  },
  {
    icon: Gavel,
    title: 'Bids land on your board',
    desc: 'Drivers bid on loads with a note. You see the bid on the load and send the broker your offer.',
  },
]

export function DriverAppSection() {
  return (
    <section id="driver-app" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-hair" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              Now live on iOS &amp; Android
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Meet {DRIVER_APP_NAME}.{' '}
              <span className="text-gradient-brand">Your drivers, on your board.</span>
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              The driver app for {APP_NAME} fleets. Drivers share where they are, see loads near
              them and bid from the road, and every bid shows up where your dispatchers already work.
            </p>
          </div>
          <StoreButtons />
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <li key={title} className="rounded-2xl glass p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-display text-3xl font-bold text-slate-800">{i + 1}</span>
              </div>
              <h3 className="mt-3 font-display font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm text-slate-500">{desc}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[270px_1fr] lg:gap-14">
          <div>
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-slate-500 lg:text-left">
              In the driver’s pocket
            </p>
            <DriverAppMock />
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
              On the dispatcher’s screen
            </p>
            <DispatchTrackingMock />
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { icon: MapPin, label: 'Location from the driver, not a phone call' },
                { icon: Bell, label: 'Notified the moment a driver bids' },
                { icon: CheckCircle2, label: 'See who is connected to the app' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-hair bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400"
                >
                  <Icon className="h-3.5 w-3.5 text-brand-400" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
