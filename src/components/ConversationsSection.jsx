import { Mail, Sparkles, FileCheck2, AlertTriangle, Send, Inbox } from 'lucide-react'

const threads = [
  { broker: 'Swift Logistics', lane: 'DAL → HOU', last: 'Can you do 2,350?', unread: true, active: true },
  { broker: 'Arrow Freight', lane: 'ATL → CLT', last: 'Rate con attached', unread: true },
  { broker: 'Coyote', lane: 'CHI → IND', last: 'Thanks, booked.' },
  { broker: 'TQL', lane: 'PHX → LAX', last: 'Truck still available?' },
]

function InboxMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-sheet">
      <div className="flex min-h-[440px] flex-col md:flex-row">
        <aside className="border-b border-hair md:w-56 md:border-b-0 md:border-r">
          <div className="flex items-center gap-2 border-b border-hair px-4 py-3">
            <Inbox className="h-4 w-4 text-brand-400" />
            <p className="text-sm font-semibold text-ink">Conversations</p>
          </div>
          {threads.map((t) => (
            <div
              key={t.broker}
              className={`border-b border-hair/60 px-4 py-3 ${t.active ? 'bg-brand-500/[0.08]' : ''}`}
            >
              <div className="flex items-center justify-between">
                <p className={`text-sm ${t.unread ? 'font-semibold text-ink' : 'text-slate-300'}`}>{t.broker}</p>
                {t.unread && <span className="h-2 w-2 rounded-full bg-brand-400" />}
              </div>
              <p className="text-[11px] text-slate-500">{t.lane}</p>
              <p className="mt-0.5 truncate text-xs text-slate-400">{t.last}</p>
            </div>
          ))}
        </aside>

        <div className="flex flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-hair bg-sunk px-5 py-3 text-xs">
            <span className="font-semibold text-ink">Dallas, TX → Houston, TX</span>
            <span className="text-slate-500">
              Bid <span className="figure font-medium text-slate-200">$2,400</span>
            </span>
            <span className="text-slate-500">
              Driver <span className="font-medium text-slate-200">R. Mendez #74</span>
            </span>
            <span className="text-slate-500">
              Profit <span className="figure font-medium text-emerald-300">$550</span>
            </span>
          </div>

          <div className="flex-1 space-y-3 p-5">
            <div className="max-w-[85%] rounded-xl rounded-tr-sm bg-brand-500/10 px-4 py-2.5 text-sm text-slate-200 ring-1 ring-brand-500/25 ml-auto">
              <p className="mb-0.5 text-[10px] font-medium text-brand-300">You</p>
              26ft box, 18 miles out. We can cover it for $2,400.
            </div>
            <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-white/[0.05] px-4 py-2.5 text-sm text-slate-300 ring-1 ring-hair">
              <p className="mb-0.5 text-[10px] font-medium text-slate-500">Swift Logistics</p>
              Can you do 2,350? Pickup 8 AM, delivery same day.
            </div>

            <div className="rounded-xl border border-dashed border-brand-500/40 bg-brand-500/[0.05] p-4">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-brand-300">
                <Sparkles className="h-3.5 w-3.5" />
                Suggested reply
              </p>
              <p className="mt-1.5 text-sm text-slate-200">
                $2,350 works. Please send the rate con to this email and we’ll dispatch Ricardo
                for the 8 AM pickup.
              </p>
              <div className="mt-3 flex gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg btn-brand px-3 py-1.5 text-xs font-semibold">
                  <Send className="h-3.5 w-3.5" />
                  Send
                </span>
                <span className="rounded-lg btn-quiet px-3 py-1.5 text-xs font-medium">Edit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RateConCheck() {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3 rounded-xl bg-emerald-500/10 px-4 py-3 ring-1 ring-emerald-500/25">
        <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
        <div>
          <p className="text-sm font-semibold text-emerald-300">Rate con matches</p>
          <p className="text-xs text-slate-400">Swift Logistics · $2,350 · pickup 08:00 CST</p>
        </div>
      </div>
      <div className="flex items-start gap-3 rounded-xl bg-rose-500/10 px-4 py-3 ring-1 ring-rose-500/25">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
        <div>
          <p className="text-sm font-semibold text-rose-300">Rate con doesn’t match</p>
          <p className="text-xs text-slate-400">Arrow Freight · agreed $1,950, rate con says $1,850</p>
        </div>
      </div>
    </div>
  )
}

export function ConversationsSection() {
  return (
    <section id="conversations" className="relative overflow-hidden py-24 lg:py-32 section-tint-b">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-200">
            <Mail className="h-4 w-4" />
            Broker conversations
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Every broker thread,{' '}
            <span className="text-gradient-brand">with the deal on top</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Replies to your bids come back into one inbox, tied to the load. AI drafts the
            answer, and every rate con that arrives is checked against what you agreed.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1fr_320px]">
          <InboxMock />
          <div className="space-y-6">
            <div className="rounded-2xl glass p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Automatic rate con check
              </p>
              <div className="mt-4">
                <RateConCheck />
              </div>
            </div>
            <ul className="space-y-3 text-sm text-slate-400">
              {[
                'Threads grouped by load, not buried in your mail client',
                'Bid, driver and profit pinned above every conversation',
                'Suggested replies you can send as-is or edit',
                'Works with Google, Microsoft 365, Zoho or any IMAP mailbox',
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
