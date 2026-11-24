import { Clock, Keyboard, Mail, MoonStar, ShieldCheck, History } from 'lucide-react'
import { SectionHead } from './SectionHead'

const ITEMS = [
  [Mail, 'Your own mailboxes', 'Google Workspace, Microsoft 365, Zoho or any IMAP and SMTP mailbox. Every bid goes out from the dispatcher’s address.'],
  [ShieldCheck, 'Users and page access', 'Pick the pages each person can open. Dispatchers, accounting and hiring each see their part.'],
  [Clock, 'Four time zones on every page', 'Pacific, Mountain, Central and Eastern clocks up top; pick-up and delivery in each stop’s local time.'],
  [History, 'Bid history', 'Every bid the team sent, who sent it and for how much, in its own tab beside the board.'],
  [Keyboard, 'Made for the keyboard', 'J and K to move, Enter for details, slash to search. Long shifts go faster without the mouse.'],
  [MoonStar, 'Light and dark', 'Cobalt and Cobalt Night, the same layout in both, for day shifts and night shifts.'],
]

export function Toolkit() {
  return (
    <section className="relative border-t border-line bg-sheet py-24 lg:py-32">
      <div className="wrap">
        <SectionHead eyebrow="Also included" title="The details a dispatch team lives in" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(([Icon, title, text], i) => (
            <article
              key={title}
              className="group card p-6 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[var(--shadow-2)]"
              data-reveal
              style={{ '--i': i % 3 }}
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand-ink">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[17px] font-bold tracking-tight text-ink">{title}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink2">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
