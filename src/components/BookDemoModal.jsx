import { useEffect, useState } from 'react'
import { Loader2, Send, X } from 'lucide-react'
import { APP_NAME, BOOK_DEMO_API } from '../config'
import { cn } from '../lib/cn'

const initialForm = { name: '', phone: '', company: '', message: '' }

export function BookDemoModal({ open, onClose }) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setForm(initialForm)
      setStatus('idle')
      setError('')
    }
  }, [open])

  if (!open) return null

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const res = await fetch(BOOK_DEMO_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setStatus('success')
      setTimeout(() => onClose(), 2000)
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong')
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />

      <div className="relative w-full max-w-md rounded-2xl raised p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-white/10 hover:text-ink"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {status === 'success' ? (
          <div className="py-8 text-center">
            <p className="font-display text-xl font-semibold text-ink">Request sent!</p>
            <p className="mt-2 text-sm text-slate-400">
              We&apos;ll get back to you shortly.
            </p>
          </div>
        ) : (
          <>
            <h2 id="demo-modal-title" className="font-display text-xl font-bold text-ink">
              Book a demo
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Tell us about your fleet — we&apos;ll reach out via {APP_NAME}.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  Name <span className="text-rose-400">*</span>
                </label>
                <input
                  required
                  value={form.name}
                  onChange={set('name')}
                  className="w-full field rounded-xl px-4 py-2.5 text-sm outline-none focus:field-focus"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  Phone <span className="text-rose-400">*</span>
                </label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  className="w-full field rounded-xl px-4 py-2.5 text-sm outline-none focus:field-focus"
                  placeholder="+1 (555) 000-0000"
                  autoComplete="tel"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  Company
                </label>
                <input
                  value={form.company}
                  onChange={set('company')}
                  className="w-full field rounded-xl px-4 py-2.5 text-sm outline-none focus:field-focus"
                  placeholder="Carrier or fleet name"
                  autoComplete="organization"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  rows={3}
                  className="w-full resize-none field rounded-xl px-4 py-2.5 text-sm outline-none focus:field-focus"
                  placeholder="Fleet size, what you need help with…"
                />
              </div>

              {error && (
                <p className="text-sm text-rose-400" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className={cn(
                  'flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-brand-hi to-brand-500 py-3 text-sm font-semibold text-brand-fg transition-all hover:brightness-110 disabled:opacity-60'
                )}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send request
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
