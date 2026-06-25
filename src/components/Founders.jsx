import { Building2, Instagram } from 'lucide-react'
import { APP_NAME, COMPANY_NAME } from '../config'

const founders = [
  {
    name: 'Rahmatolloh Oktyabirov',
    role: 'Co-founder',
    photo: '/Rahmatolloh.jpg',
    instagram: 'https://www.instagram.com/aktyabirov',
    handle: 'aktyabirov',
  },
  {
    name: 'Sardorbek Sherdullayev',
    role: 'Co-founder',
    photo: '/Sardorbek.jpg',
    instagram: 'https://www.instagram.com/serdarkhann',
    handle: 'serdarkhann',
  },
]

export function Founders() {
  return (
    <section id="founders" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Our team
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built by operators who{' '}
            <span className="text-gradient-brand">know the road</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            {APP_NAME} is developed and owned by {COMPANY_NAME} — focused on modernizing box truck
            operations with practical software and AI, not generic logistics tools.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-lg">
          <div className="flex items-center gap-4 rounded-2xl border border-brand-500/25 bg-gradient-to-r from-brand-950/60 to-[#0a0a14] p-5 shadow-lg shadow-brand-900/20 sm:p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-600/25 text-brand-300 ring-1 ring-brand-500/30">
              <Building2 className="h-7 w-7" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Owned &amp; operated by
              </p>
              <p className="font-display text-xl font-bold text-white sm:text-2xl">
                {COMPANY_NAME}
              </p>
              <p className="mt-0.5 text-sm text-slate-400">Parent company of {APP_NAME}</p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-slate-500">
          Co-founders behind {COMPANY_NAME}
        </p>

        <div className="mx-auto mt-6 grid max-w-3xl gap-6 sm:grid-cols-2">
          {founders.map((founder) => (
            <article
              key={founder.name}
              className="group flex flex-col items-center rounded-2xl glass p-8 text-center transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06]"
            >
              <div className="relative h-28 w-28 overflow-hidden rounded-2xl ring-2 ring-white/10 shadow-lg shadow-brand-900/40 transition-transform duration-300 group-hover:scale-[1.02]">
                <img
                  src={founder.photo}
                  alt={founder.name}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold text-white">
                {founder.name}
              </h3>
              <p className="mt-1 text-sm text-brand-300">{founder.role}</p>
              <p className="mt-0.5 text-xs text-slate-500">{COMPANY_NAME}</p>

              <a
                href={founder.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-brand-500/40 hover:bg-brand-500/10 hover:text-white"
              >
                <Instagram className="h-4 w-4 text-brand-400" />
                @{founder.handle}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
