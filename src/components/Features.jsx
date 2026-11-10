import {
  Radio,
  Crosshair,
  Gavel,
  Mail,
  Sparkles,
  MapPin,
  Smartphone,
  Trophy,
  Wallet,
  Landmark,
  UserPlus,
  ShieldBan,
  ShieldCheck,
} from 'lucide-react'
import { APP_NAME, DRIVER_APP_NAME } from '../config'

const features = [
  {
    icon: Radio,
    title: 'Live load board',
    description:
      'New loads stream onto the board the moment they post, with a bell when something worth your time comes in.',
    accent: 'brand',
  },
  {
    icon: Crosshair,
    title: 'Nearest-truck matching',
    description:
      'Every load shows your closest available truck and whether the vehicle fits, is tight, or is too small.',
    accent: 'emerald',
  },
  {
    icon: Gavel,
    title: 'Bids with profit in view',
    description:
      'Bid the broker with driver pay and your margin on screen. The email goes out from your own mailbox.',
    accent: 'amber',
  },
  {
    icon: Mail,
    title: 'Broker conversations',
    description:
      'Every broker thread in one inbox, with the deal pinned on top and an AI-suggested reply ready to send.',
    accent: 'cyan',
  },
  {
    icon: Sparkles,
    title: 'Rate con to load in seconds',
    description:
      'Drop a rate confirmation and AI fills the load: broker, stops, times in the facility’s time zone, and rate.',
    accent: 'brand',
  },
  {
    icon: ShieldCheck,
    title: 'Automatic rate con check',
    description:
      'Incoming rate cons are compared with what you agreed in the thread, so a wrong rate gets caught before pickup.',
    accent: 'emerald',
  },
  {
    icon: Smartphone,
    title: `${DRIVER_APP_NAME} mobile app`,
    description:
      'Drivers connect to your company, share their profile, truck and documents, and bid on loads from their phone.',
    accent: 'brand',
  },
  {
    icon: MapPin,
    title: 'Tracking & availability',
    description:
      'A daily location queue, availability and out-of-service in one list, plus each driver’s app connection status.',
    accent: 'cyan',
  },
  {
    icon: Trophy,
    title: 'Dispatch leaderboard',
    description:
      'Rank dispatchers by gross and profit, see the market on a US map, and track daily bonuses on a calendar.',
    accent: 'amber',
  },
  {
    icon: Wallet,
    title: 'Driver payouts',
    description:
      'Pending, confirmed and paid in one pipeline, with Quick Pay fees, holds and expenses handled for you.',
    accent: 'emerald',
  },
  {
    icon: Landmark,
    title: 'Factoring',
    description:
      'Move loads from good-to-invoice to invoiced to paid, and flag short pays as soon as they land.',
    accent: 'cyan',
  },
  {
    icon: UserPlus,
    title: 'Driver onboarding',
    description:
      'Send one invite link. Drivers fill the form, e-sign the W-9 and contractor agreement, and AI reads their documents.',
    accent: 'brand',
  },
  {
    icon: ShieldBan,
    title: 'Broker ratings & blacklist',
    description:
      'Rate brokers and keep MC numbers on file. Blacklisted brokers disappear from your load board.',
    accent: 'amber',
  },
]

const accentMap = {
  brand: 'bg-brand-500/15 text-brand-400 ring-brand-500/25',
  cyan: 'bg-cyan-500/15 text-cyan-400 ring-cyan-500/25',
  emerald: 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/25',
  amber: 'bg-amber-500/15 text-amber-400 ring-amber-500/25',
}

export function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Everything in one platform
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            From load board to payout —{' '}
            <span className="text-gradient-brand">no more tool sprawl</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            {APP_NAME} replaces the load board tab, the inbox, the spreadsheets and the payroll
            workarounds with one system built for box truck dispatch.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <article
                key={f.title}
                className="group rounded-2xl glass p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] hover:-translate-y-0.5"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${accentMap[f.accent]} ring-1`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.description}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-12 flex items-center justify-center gap-3 rounded-2xl border border-dashed border-line bg-white/[0.02] px-6 py-8">
          <Mail className="h-5 w-5 shrink-0 text-brand-400" />
          <p className="text-center text-sm text-slate-400 sm:text-base">
            <span className="font-medium text-slate-200">Plus:</span> connect your own mailbox
            (Google, Microsoft 365, Zoho or IMAP), roles and permissions, salaries and bonus
            rules, custom statuses and tags.
          </p>
        </div>
      </div>
    </section>
  )
}
