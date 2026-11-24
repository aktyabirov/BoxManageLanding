import { useEffect, useRef, useState } from 'react'
import { Check, Loader2, Send, X } from 'lucide-react'
import { BOOK_DEMO_API } from '../config'
import { prefersReducedMotion } from '../lib/motion'

const initialForm = { name: '', phone: '', company: '', message: '' }
const ENTER = 240
const EXIT = Math.round(ENTER * 0.8) /* exits are 20% shorter than entrances */

/* Book a demo. The card scales up from 0.95 out of the button that opened it, and goes back
 * into that button when closed. */
export function BookDemoModal({ open, origin, onClose }) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(open)
  const card = useRef(null)
  const scrim = useRef(null)
  const firstField = useRef(null)
  const lastFocus = useRef(null)

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement
      setMounted(true)
    }
  }, [open])

  /* Position the transform origin on the trigger and play the entrance / exit. */
  useEffect(() => {
    const el = card.current
    if (!mounted || !el) return
    const r = el.getBoundingClientRect()
    const ox = origin ? origin.x - r.left : r.width / 2
    const oy = origin ? origin.y - r.top : r.height / 2
    el.style.transformOrigin = `${ox}px ${oy}px`
    const reduce = prefersReducedMotion()
    if (open) {
      if (!reduce) {
        el.animate(
          [
            { opacity: 0, transform: 'scale(0.95)', filter: 'blur(4px)' },
            { opacity: 1, transform: 'none', filter: 'none' },
          ],
          { duration: ENTER, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
        )
        scrim.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ENTER, easing: 'ease-out' })
      }
      firstField.current?.focus({ preventScroll: true })
    } else {
      const done = () => {
        setMounted(false)
        setForm(initialForm)
        setStatus('idle')
        setError('')
        lastFocus.current?.focus?.({ preventScroll: true })
      }
      if (reduce) return done()
      el.animate(
        [
          { opacity: 1, transform: 'none' },
          { opacity: 0, transform: 'scale(0.95)' },
        ],
        { duration: EXIT, easing: 'cubic-bezier(0.55, 0, 0.75, 0.2)', fill: 'forwards' }
      ).onfinish = done
      scrim.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: EXIT, fill: 'forwards' })
    }
  }, [open, mounted, origin])

  useEffect(() => {
    if (!mounted) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [mounted, onClose])

  if (!mounted) return null

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    if (!BOOK_DEMO_API) {
      setStatus('error')
      setError('This is a preview. The form sends from boxtruckmanage.com once it is live.')
      return
    }
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
      setTimeout(() => onClose(), 2200)
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Try again.')
    }
  }

  const label = 'mb-1.5 block text-[13px] font-semibold text-ink2'
  const input = 'field w-full rounded-xl px-4 py-3 text-[15px] outline-none focus:field-focus'

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="demo-modal-title">
      <button ref={scrim} type="button" tabIndex={-1} className="absolute inset-0 bg-[var(--scrim)] backdrop-blur-[3px]" onClick={onClose} aria-label="Close" />

      <div ref={card} className="card-lg relative w-full max-w-md p-6 sm:p-7">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-xl text-ink3 transition-colors duration-200 hover:bg-sunk hover:text-ink"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {status === 'success' ? (
          <div className="py-8 text-center" role="status">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-bg text-green [animation:pulse-ok_900ms_var(--e-out)_2]">
              <Check className="h-7 w-7" strokeWidth={2.5} />
            </span>
            <p className="mt-5 text-xl font-bold text-ink">Request sent</p>
            <p className="mt-2 text-[15px] text-ink2">We will call you back shortly.</p>
          </div>
        ) : (
          <>
            <h2 id="demo-modal-title" className="text-xl font-extrabold tracking-tight text-ink">
              Book a demo
            </h2>
            <p className="mt-1.5 text-[15px] text-ink2">
              Leave a number and we walk you through it with your own lanes and trucks.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="bd-name" className={label}>
                  Name <span className="text-red">*</span>
                </label>
                <input ref={firstField} id="bd-name" required value={form.name} onChange={set('name')} className={input} placeholder="Your name" autoComplete="name" />
              </div>
              <div>
                <label htmlFor="bd-phone" className={label}>
                  Phone <span className="text-red">*</span>
                </label>
                <input id="bd-phone" required type="tel" inputMode="tel" value={form.phone} onChange={set('phone')} className={input} placeholder="+1 (555) 000-0000" autoComplete="tel" />
              </div>
              <div>
                <label htmlFor="bd-company" className={label}>
                  Company
                </label>
                <input id="bd-company" value={form.company} onChange={set('company')} className={input} placeholder="Carrier or fleet name" autoComplete="organization" />
              </div>
              <div>
                <label htmlFor="bd-msg" className={label}>
                  Message
                </label>
                <textarea id="bd-msg" value={form.message} onChange={set('message')} rows={3} className={`${input} resize-none`} placeholder="Fleet size, what you need help with" />
              </div>

              {error && (
                <p className="rounded-xl bg-red-bg px-3 py-2.5 text-sm font-medium text-red" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" disabled={status === 'loading'} className="btn btn-primary btn-lg w-full">
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending
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
