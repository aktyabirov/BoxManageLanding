import { ChevronDown } from 'lucide-react'
import { COMPANY_NAME, DISPATCH_APP_NAME, DRIVER_APP_NAME } from '../config'
import { SectionHead } from './SectionHead'

const QA = [
  [
    'What is in the live demo?',
    'The real BoxTruckManage web app with a sample company, Redwood Freight LLC: 30 trucks, loads streaming onto the board, broker conversations, drivers in hiring and onboarding, payouts and factoring. Each visitor gets a private copy that lives in their own browser. Nothing you do reaches a real broker or driver.',
  ],
  [
    'Which mailboxes can send bids?',
    'The ones your dispatchers already use: Google Workspace or Gmail, Microsoft 365, Zoho, or any mailbox with IMAP and SMTP. Each bid goes out from the dispatcher’s own address, and the broker’s reply comes back into Conversations, tied to the load.',
  ],
  [
    'Do our drivers have to use an app?',
    `No. ${DRIVER_APP_NAME} is free on the App Store and Google Play. Drivers who use it share their location and can bid on loads near them. For everyone else, Tracking takes one ZIP a day.`,
  ],
  [
    'Is there an app for dispatchers?',
    `${DISPATCH_APP_NAME}, on iPhone and Android: the live board, the load window with the nearest drivers, driver bids, the broker inbox and each dispatcher’s own performance.`,
  ],
  [
    'How do we get started?',
    'Open the live demo first if you like. Then book a demo and we walk you through BoxTruckManage with your own lanes and trucks.',
  ],
  ['Who makes BoxTruckManage?', `${COMPANY_NAME} builds and runs BoxTruckManage and both apps.`],
]

/* Native details/summary: keyboard and screen readers work as is. The answer rises in when opened. */
export function Faq() {
  return (
    <section id="faq" className="relative border-t border-line bg-sheet py-24 lg:py-32">
      <style>{`
        .faq[open] .faq-a { animation: rise 280ms var(--e-out) both; }
        .faq[open] .faq-chev { transform: rotate(180deg); }
        .faq summary::-webkit-details-marker { display: none; }
      `}</style>
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHead eyebrow="FAQ" title="Questions people ask before the demo" />
        <div className="divide-y divide-line border-y border-line" data-reveal style={{ '--i': 2 }}>
          {QA.map(([q, a], i) => (
            <details key={q} className="faq group" open={i === 0}>
              <summary className="flex min-h-[64px] list-none items-center gap-4 py-4 text-left text-[17px] font-bold tracking-tight text-ink transition-colors hover:text-brand-ink">
                <span className="flex-1">{q}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sunk text-ink2">
                  <ChevronDown className="faq-chev h-4 w-4 transition-transform duration-200 ease-out" aria-hidden="true" />
                </span>
              </summary>
              <p className="faq-a max-w-[640px] pb-6 pr-12 text-[15.5px] leading-relaxed text-ink2">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
