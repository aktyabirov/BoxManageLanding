import {
  LayoutDashboard,
  Package,
  BarChart3,
  Wallet,
  CreditCard,
  Receipt,
} from 'lucide-react'
import { LogoMark } from './Logo'

const modules = [
  { icon: LayoutDashboard, name: 'Dashboard', active: true },
  { icon: Package, name: 'Loads' },
  { icon: CreditCard, name: 'Billing' },
  { icon: BarChart3, name: 'Analytics' },
  { icon: Wallet, name: 'Payroll' },
  { icon: Receipt, name: 'Expenses' },
]

const tableRows = [
  { id: 'BM-2841', lane: 'ATL → CLT', driver: 'J. Martinez', rate: '$1,920', status: 'In transit', statusColor: 'bg-cyan-500/20 text-cyan-300' },
  { id: 'BM-2840', lane: 'DAL → HOU', driver: 'R. Chen', rate: '$2,840', status: 'Delivered', statusColor: 'bg-emerald-500/20 text-emerald-300' },
  { id: 'BM-2839', lane: 'CHI → IND', driver: 'M. Brooks', rate: '$1,450', status: 'Dispatched', statusColor: 'bg-brand-500/20 text-brand-300' },
  { id: 'BM-2838', lane: 'PHX → LAX', driver: 'T. Wilson', rate: '$3,100', status: 'Booked', statusColor: 'bg-amber-500/20 text-amber-300' },
]

export function PlatformPreview() {
  return (
    <section id="platform" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Platform preview
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Your operations,{' '}
            <span className="text-gradient-brand">one clear view</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Clean, modern UI with the depth operators need — KPIs up front, loads and finances
            one click away.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-sheet lifted">
          <div className="flex min-h-[420px] flex-col lg:flex-row">
            <aside className="flex flex-row gap-1 overflow-x-auto border-b border-hair bg-sheet p-3 lg:w-52 lg:flex-col lg:border-b-0 lg:border-r">
              <div className="mb-2 hidden items-center gap-2 px-2 lg:flex">
                <LogoMark className="-ml-1 h-8 w-8" />
                <div>
                  <p className="font-display text-sm font-bold text-ink">BoxTruckManage</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-600">Operations</p>
                </div>
              </div>
              {modules.map((m) => {
                const Icon = m.icon
                return (
                  <div
                    key={m.name}
                    className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-sm ${
                      m.active
                        ? 'bg-gradient-to-b from-brand-hi to-brand-500 text-brand-fg'
                        : 'text-slate-500'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="whitespace-nowrap">{m.name}</span>
                  </div>
                )
              })}
            </aside>

            <div className="flex-1 p-4 sm:p-6">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">Loads</h3>
                  <p className="text-xs text-slate-500">47 active · Updated live</p>
                </div>
                <button
                  type="button"
                  className="rounded-xl bg-gradient-to-b from-brand-hi to-brand-500 px-4 py-2 text-xs font-semibold text-brand-fg"
                >
                  + New load
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-hair">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-hair bg-white/[0.02] text-xs text-slate-500">
                      <th className="px-4 py-3 font-medium">Load</th>
                      <th className="px-4 py-3 font-medium">Lane</th>
                      <th className="px-4 py-3 font-medium">Driver</th>
                      <th className="px-4 py-3 font-medium">Rate</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row) => (
                      <tr key={row.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                        <td className="px-4 py-3 font-medium text-brand-300">{row.id}</td>
                        <td className="px-4 py-3 text-slate-300">{row.lane}</td>
                        <td className="px-4 py-3 text-slate-400">{row.driver}</td>
                        <td className="px-4 py-3 font-medium text-ink">{row.rate}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${row.statusColor}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
