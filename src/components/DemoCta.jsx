import { Check } from 'lucide-react'
import { BookDemoButton } from './BookDemoButton'
import { TryDemoButton } from './TryDemoButton'

const PAGES = ['Dashboard', 'Load board', 'Loads', 'Conversations', 'Tracking', 'Onboarding', 'Hiring', 'Accounting', 'Brokers', 'Admin']

/* Fixed dark, like the brand panel on the demo's sign-in page, in both themes. */
export function DemoCta() {
  return (
    <section id="demo" className="py-16 lg:py-24">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[32px] bg-[#0A0E1C] px-6 py-14 text-center shadow-[var(--shadow-lg)] sm:px-12 lg:py-20" data-reveal>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(200,220,255,0.09)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,#000_20%,transparent_75%)]" />
          <div className="pointer-events-none absolute left-1/2 top-[-240px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.35),transparent)]" />

          <div className="relative mx-auto max-w-[720px]">
            <p className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-[#8AB4FF]">
              <span className="h-2 w-2 rounded-full border-2 border-[#8AB4FF]" />
              Live demo
            </p>
            <h2 className="mt-4 text-[clamp(32px,4.6vw,52px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-white [text-wrap:balance]">
              Open the demo. Click anything.
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] text-[17px] leading-relaxed text-[#B4BFD1]">
              Use Demo opens a private copy of Redwood Freight LLC, a sample fleet with 30 trucks, loads streaming in, brokers, drivers and
              payouts. Bid, book, hire and pay. Nothing you do reaches a real broker or driver.
            </p>

            <ul className="mx-auto mt-7 flex max-w-[620px] flex-wrap justify-center gap-2">
              {PAGES.map((p) => (
                <li key={p} className="chip h-7 border border-white/10 bg-white/[0.06] px-3 text-[12.5px] text-[#DCE4F0]">
                  <Check className="h-3 w-3 text-[#4ADE80]" strokeWidth={3} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <TryDemoButton place="demo-panel" size="lg" className="w-full sm:w-auto" />
              <BookDemoButton className="btn-lg w-full border-white/15 bg-white/[0.06] text-white shadow-none hover:bg-white/[0.12] sm:w-auto" />
            </div>
            <p className="mt-4 text-[13px] text-[#8C9AB0]">No sign-up, nothing to install.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
