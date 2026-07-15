import { useState } from 'react'
import { Loader2, Send, Trash2 } from 'lucide-react'
import { LegalLayout } from '../components/LegalLayout'
import {
  APP_NAME,
  COMPANY_NAME,
  CONTACT_EMAIL,
  DELETE_ACCOUNT_API,
  SITE_URL,
} from '../config'
import { cn } from '../lib/cn'

function InfoBlock({ title, children }) {
  return (
    <section className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
      <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
      <div className="mt-3 space-y-3 text-sm text-slate-400 sm:text-base">{children}</div>
    </section>
  )
}

export function DeleteAccount() {
  const [form, setForm] = useState({ phone: '', email: '', reason: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const phone = form.phone.trim()
    const email = form.email.trim()

    if (!phone && !email) {
      setStatus('error')
      setError('Please enter the phone number or email associated with your driver account.')
      return
    }

    try {
      const res = await fetch(DELETE_ACCOUNT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setStatus('success')
      setForm({ phone: '', email: '', reason: '' })
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <LegalLayout title="Delete your account" lastUpdated="July 15, 2026">
      <div className="space-y-6">
        <p className="text-slate-400">
          This page is for drivers who use the <strong className="text-slate-200">{APP_NAME}</strong>{' '}
          mobile app, operated by <strong className="text-slate-200">{COMPANY_NAME}</strong>. Use the
          form below to request deletion of your driver account and associated personal data.
        </p>

        <InfoBlock title="How to request account deletion">
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Enter the <strong className="text-slate-200">phone number</strong> or{' '}
              <strong className="text-slate-200">email address</strong> linked to your {APP_NAME}{' '}
              driver account.
            </li>
            <li>Optionally add a short reason to help us verify your request.</li>
            <li>Submit the form. Our team will process your request within 30 days.</li>
            <li>
              You may also email{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-400 hover:text-brand-300">
                {CONTACT_EMAIL}
              </a>{' '}
              with the subject line &quot;Account deletion request&quot;.
            </li>
          </ol>
        </InfoBlock>

        <InfoBlock title="What data is deleted">
          <p>When your account is deleted, we remove or anonymize:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Driver profile and login credentials</li>
            <li>Phone number and email associated with your account</li>
            <li>Location history shared through the app</li>
            <li>Load bids and in-app activity tied to your account</li>
            <li>Push notification tokens and SMS opt-in preferences</li>
          </ul>
        </InfoBlock>

        <InfoBlock title="What data may be kept">
          <p>
            Some information may be retained where required by law or for legitimate business
            purposes, including:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Billing, payroll, and load records your motor carrier is legally required to keep
            </li>
            <li>Records needed to resolve disputes, enforce terms, or comply with regulations</li>
            <li>Aggregated or de-identified data that cannot identify you</li>
          </ul>
          <p>
            Retention of carrier-held records is governed by your employer&apos;s policies and
            applicable law.
          </p>
        </InfoBlock>

        <InfoBlock title="Processing time">
          <p>
            We aim to complete account deletion requests within <strong className="text-slate-200">30 days</strong>.
            You will receive confirmation once your account has been deleted. During processing, your
            account may be deactivated immediately upon verification.
          </p>
        </InfoBlock>

        <div className="rounded-2xl border border-brand-500/25 bg-gradient-to-b from-brand-950/50 to-[#0a0a14] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400">
              <Trash2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-white">
                Submit deletion request
              </h2>
              <p className="text-sm text-slate-500">
                {APP_NAME} driver app · {COMPANY_NAME}
              </p>
            </div>
          </div>

          {status === 'success' ? (
            <div className="mt-6 rounded-xl bg-emerald-500/10 px-4 py-5 text-center ring-1 ring-emerald-500/25">
              <p className="font-semibold text-emerald-300">Request received</p>
              <p className="mt-2 text-sm text-slate-400">
                We will process your account deletion within 30 days. If we need additional
                information to verify your identity, we will contact you at the phone or email
                you provided.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <p className="text-sm text-slate-500">
                Provide at least one identifier — the phone number or email you use to sign in to
                the driver app.
              </p>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  Phone number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none transition focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/30"
                  placeholder="+1 (555) 000-0000"
                  autoComplete="tel"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/[0.06]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#0a0a14] px-2 text-slate-600">or</span>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  Email address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none transition focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/30"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  Reason (optional)
                </label>
                <textarea
                  value={form.reason}
                  onChange={set('reason')}
                  rows={2}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none transition focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/30"
                  placeholder="Helps us locate your account"
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
                  'flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 py-3 text-sm font-semibold text-white transition-all hover:bg-rose-500 disabled:opacity-60'
                )}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Request account deletion
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <p className="text-sm text-slate-500">
          See also our{' '}
          <a href="/privacy" className="text-brand-400 hover:text-brand-300">
            Privacy Policy
          </a>{' '}
          at{' '}
          <a href={`${SITE_URL}/privacy`} className="text-brand-400 hover:text-brand-300">
            {SITE_URL}/privacy
          </a>
          .
        </p>
      </div>
    </LegalLayout>
  )
}
