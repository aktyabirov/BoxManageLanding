import { Check } from 'lucide-react'
import { BookDemoButton } from './BookDemoButton'

const GETS = [
  'Custom features for your fleet',
  'Automation for your workflow',
  'Dedicated account manager',
  '24/7 support',
  'BTM Dispatch and BTM Driver apps',
  '$300 to $1,200 a month',
]

/* The closing ask. Fixed dark in both themes, like the brand panel of the app's sign-in page. */
export function BookCta() {
  return (
    <section id="book" className="py-16 lg:py-24">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[32px] bg-[#0A0E1C] px-6 py-14 text-center shadow-[var(--shadow-lg)] sm:px-12 lg:py-24" data-reveal>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(200,220,255,0.09)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,#000_20%,transparent_75%)]" />
          <div className="pointer-events-none absolute left-1/2 top-[-240px] h-[560px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.35),transparent)]" />

          <div className="relative mx-auto max-w-[860px]">
            <p className="inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-[0.08em] text-[#8AB4FF]">
              <span className="h-2 w-2 rounded-full border-2 border-[#8AB4FF]" />
              Book a demo
            </p>
            <h2 className="mt-4 text-[clamp(34px,4.4vw,64px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white [text-wrap:balance]">
              See it with your own lanes and trucks.
            </h2>
            <p className="mx-auto mt-5 max-w-[680px] text-[clamp(17px,1.4vw,20px)] leading-relaxed text-[#B4BFD1]">
              We walk you through BoxTruckManage, look at how your team works today, and show what we would customize and automate for
              you. You get your price on the same call.
            </p>

            <ul className="mx-auto mt-8 flex max-w-[760px] flex-wrap justify-center gap-2.5">
              {GETS.map((p) => (
                <li key={p} className="chip h-8 border border-white/10 bg-white/[0.06] px-3.5 text-[14px] text-[#DCE4F0]">
                  <Check className="h-3.5 w-3.5 text-[#4ADE80]" strokeWidth={3} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>

            <BookDemoButton place="Closing panel" size="lg" arrow className="mt-10 w-full px-8 sm:w-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
