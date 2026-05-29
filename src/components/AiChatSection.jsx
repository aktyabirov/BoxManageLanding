import { useCallback, useEffect, useState } from 'react'
import {
  Bot,
  MessageSquare,
  Sparkles,
  Send,
  Trophy,
  TrendingUp,
  Truck,
  User,
  BarChart3,
} from 'lucide-react'
import { cn } from '../lib/cn'
import { APP_NAME } from '../config'

const demos = [
  {
    id: 'dispatcher',
    prompt: 'Who was our best dispatcher last month?',
    reply: 'Here are your top dispatchers by loads booked and on-time performance for March:',
    visual: 'leaderboard',
    icon: Trophy,
  },
  {
    id: 'loads',
    prompt: 'Show me the highest paying loads this week',
    reply: 'Top 5 loads by rate — sorted by gross revenue:',
    visual: 'loads',
    icon: TrendingUp,
  },
  {
    id: 'utilization',
    prompt: "What's our fleet utilization this month?",
    reply: 'Fleet utilization is trending up. Here’s the daily breakdown:',
    visual: 'chart',
    icon: BarChart3,
  },
  {
    id: 'drivers',
    prompt: 'Which drivers delivered the most loads?',
    reply: 'Driver delivery leaderboard for the current pay period:',
    visual: 'drivers',
    icon: Truck,
  },
]

const dispatchers = [
  { rank: 1, name: 'Sarah K.', loads: 142, otp: '98%', badge: 'gold' },
  { rank: 2, name: 'Mike T.', loads: 128, otp: '96%', badge: 'silver' },
  { rank: 3, name: 'Jen L.', loads: 119, otp: '94%', badge: 'bronze' },
]

const topLoads = [
  { id: 'BM-3102', lane: 'DAL → MIA', rate: '$4,280', driver: 'R. Chen' },
  { id: 'BM-3098', lane: 'CHI → ATL', rate: '$3,950', driver: 'J. Martinez' },
  { id: 'BM-3091', lane: 'PHX → LAX', rate: '$3,720', driver: 'M. Brooks' },
  { id: 'BM-3087', lane: 'HOU → DEN', rate: '$3,540', driver: 'T. Wilson' },
]

const drivers = [
  { name: 'R. Chen', loads: 34, miles: '12.4k' },
  { name: 'J. Martinez', loads: 31, miles: '11.8k' },
  { name: 'M. Brooks', loads: 28, miles: '10.2k' },
]

const chartBars = [62, 71, 68, 84, 79, 91, 88, 94, 90, 96]

function LeaderboardVisual() {
  const badgeClass = {
    gold: 'bg-amber-500/20 text-amber-300 ring-amber-500/30',
    silver: 'bg-slate-400/20 text-slate-300 ring-slate-400/30',
    bronze: 'bg-orange-500/20 text-orange-300 ring-orange-500/30',
  }
  return (
    <div className="space-y-2">
      {dispatchers.map((d) => (
        <div
          key={d.name}
          className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2.5 ring-1 ring-white/[0.06]"
        >
          <span
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ring-1',
              badgeClass[d.badge]
            )}
          >
            #{d.rank}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">{d.name}</p>
            <p className="text-xs text-slate-500">{d.loads} loads · {d.otp} on-time</p>
          </div>
          {d.rank === 1 && (
            <Trophy className="h-4 w-4 shrink-0 text-amber-400" />
          )}
        </div>
      ))}
    </div>
  )
}

function LoadsVisual() {
  return (
    <div className="space-y-2">
      {topLoads.map((load, i) => (
        <div
          key={load.id}
          className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2.5 ring-1 ring-white/[0.06]"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/20 text-xs font-bold text-brand-300">
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-medium text-white">{load.lane}</p>
              <p className="text-xs text-slate-500">{load.id} · {load.driver}</p>
            </div>
          </div>
          <span className="font-display text-sm font-bold text-emerald-400">{load.rate}</span>
        </div>
      ))}
    </div>
  )
}

function ChartVisual() {
  return (
    <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/[0.06]">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-white">94%</p>
          <p className="text-xs text-emerald-400">+8% vs last month</p>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-300">
          Trending up
        </span>
      </div>
      <div className="flex h-24 items-end gap-1">
        {chartBars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-brand-600 to-brand-400 opacity-90"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-600">Daily utilization · last 10 days</p>
    </div>
  )
}

function DriversVisual() {
  return (
    <div className="space-y-2">
      {drivers.map((d, i) => (
        <div
          key={d.name}
          className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2.5 ring-1 ring-white/[0.06]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/15">
            <User className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{d.name}</p>
            <p className="text-xs text-slate-500">{d.miles} miles</p>
          </div>
          <span className="font-display text-lg font-bold text-brand-300">{d.loads}</span>
          <span className="text-xs text-slate-500">loads</span>
        </div>
      ))}
    </div>
  )
}

function ResultVisual({ type }) {
  switch (type) {
    case 'leaderboard':
      return <LeaderboardVisual />
    case 'loads':
      return <LoadsVisual />
    case 'chart':
      return <ChartVisual />
    case 'drivers':
      return <DriversVisual />
    default:
      return null
  }
}

export function AiChatSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [phase, setPhase] = useState('typing') // typing | answer
  const [typedLen, setTypedLen] = useState(0)

  const demo = demos[activeIndex]
  const prompt = demo.prompt

  const goTo = useCallback((index) => {
    setActiveIndex(index)
    setPhase('typing')
    setTypedLen(0)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % demos.length)
      setPhase('typing')
      setTypedLen(0)
    }, 9000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (phase !== 'typing') return
    if (typedLen >= prompt.length) {
      const t = setTimeout(() => setPhase('answer'), 400)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setTypedLen((n) => n + 1), 28)
    return () => clearTimeout(t)
  }, [phase, typedLen, prompt])

  const displayedPrompt = prompt.slice(0, typedLen)

  return (
    <section id="ai-chat" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.45_0.26_285/0.25),transparent)]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-cyan-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-brand-600/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-200">
            <MessageSquare className="h-4 w-4" />
            AI fleet insights
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ask your data anything.{' '}
            <span className="text-gradient-brand">Get answers instantly.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            {APP_NAME} AI connects to your live database — loads, drivers, dispatchers, and
            revenue. Ask in plain English and get charts, rankings, and tables — no SQL, no
            exports.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-6">
            <ul className="space-y-4">
              {[
                {
                  title: 'Natural language queries',
                  desc: '“Best dispatcher”, “highest paying loads”, “utilization trend” — just ask.',
                },
                {
                  title: 'Real database analysis',
                  desc: 'AI queries your actual fleet data and returns accurate, actionable results.',
                },
                {
                  title: 'Rich visual answers',
                  desc: 'Leaderboards, load tables, charts, and KPI cards — not plain text walls.',
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600/20 text-brand-400 ring-1 ring-brand-500/25">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {demos.map((d, i) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => goTo(i)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-left text-xs font-medium transition-all sm:text-sm',
                    i === activeIndex
                      ? 'border-brand-500/50 bg-brand-500/15 text-brand-200'
                      : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200'
                  )}
                >
                  {d.prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-brand-600/30 via-cyan-500/20 to-brand-800/30 blur-xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a14] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-cyan-600">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Fleet AI</p>
                    <p className="text-[10px] text-slate-500">Analyzing your database…</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live
                </span>
              </div>

              <div className="min-h-[420px] space-y-4 p-4 sm:p-5">
                <div className="flex justify-end">
                  <div className="max-w-[90%] rounded-2xl rounded-br-md bg-brand-600 px-4 py-2.5 text-sm text-white shadow-lg shadow-brand-900/30">
                    {displayedPrompt}
                    {phase === 'typing' && (
                      <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-white/80" />
                    )}
                  </div>
                </div>

                {phase === 'answer' && (
                  <div className="animate-fade-in space-y-3">
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06]">
                        {(() => {
                          const Icon = demo.icon
                          return <Icon className="h-4 w-4 text-brand-400" />
                        })()}
                      </div>
                      <div className="min-w-0 flex-1 space-y-3">
                        <p className="text-sm text-slate-300">{demo.reply}</p>
                        <ResultVisual type={demo.visual} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/[0.06] p-3">
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
                  <input
                    readOnly
                    value={phase === 'typing' ? '' : 'Ask about loads, drivers, revenue…'}
                    className="flex-1 bg-transparent text-sm text-slate-500 outline-none"
                    placeholder="Ask about loads, drivers, revenue…"
                  />
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white"
                    aria-label="Send"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
