import { useState } from 'react'
import { Loader2, Send, Trash2 } from 'lucide-react'
import { LegalLayout } from '../components/LegalLayout'
import {
  APP_NAME,
  COMPANY_NAME,
  CONTACT_EMAIL,
  DELETE_ACCOUNT_API,
  DRIVER_APP_NAME,
  SITE_URL,
} from '../config'
import { cn } from '../lib/cn'

function InfoBlock({ title, children }) {
  return (
    <section className="rounded-2xl border border-line bg-sheet p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-sm text-ink2 sm:text-base">{children}</div>
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
        <p className="text-ink2">
          This page is for drivers who use the{' '}
          <strong className="text-ink">{DRIVER_APP_NAME}</strong> mobile app for {APP_NAME},
          operated by <strong className="text-ink">{COMPANY_NAME}</strong>. Use the
          form below to request deletion of your driver account and associated personal data.
        </p>

        <InfoBlock title="How to request account deletion">
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Enter the <strong className="text-ink">phone number</strong> or{' '}
              <strong className="text-ink">email address</strong> linked to your {APP_NAME}{' '}
              driver account.
            </li>
            <li>Optionally add a short reason to help us verify your request.</li>
            <li>Submit the form. Our team will process your request within 30 days.</li>
            <li>
              You may also email{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand-ink hover:underline">
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
            We aim to complete account deletion requests within <strong className="text-ink">30 days</strong>.
            You will receive confirmation once your account has been deleted. During processing, your
            account may be deactivated immediately upon verification.
          </p>
        </InfoBlock>

        <div className="rounded-2xl panel-brand p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-bg text-red">
              <Trash2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ink">
                Submit deletion request
              </h2>
              <p className="text-sm text-ink3">
                {DRIVER_APP_NAME} app · {COMPANY_NAME}
              </p>
            </div>
          </div>

          {status === 'success' ? (
            <div className="mt-6 rounded-xl bg-green-bg px-4 py-5 text-center">
              <p className="font-semibold text-green">Request received</p>
              <p className="mt-2 text-sm text-ink2">
                We will process your account deletion within 30 days. If we need additional
                information to verify your identity, we will contact you at the phone or email
                you provided.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <p className="text-sm text-ink3">
                Provide at least one identifier: the phone number or email you use to sign in to
                the driver app.
              </p>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink2">
                  Phone number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  className="w-full field rounded-xl px-4 py-2.5 text-sm outline-none focus:field-focus"
                  placeholder="+1 (555) 000-0000"
                  autoComplete="tel"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-line" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-sheet px-2 text-ink3">or</span>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink2">
                  Email address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  className="w-full field rounded-xl px-4 py-2.5 text-sm outline-none focus:field-focus"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink2">
                  Reason (optional)
                </label>
                <textarea
                  value={form.reason}
                  onChange={set('reason')}
                  rows={2}
                  className="w-full resize-none field rounded-xl px-4 py-2.5 text-sm outline-none focus:field-focus"
                  placeholder="Helps us locate your account"
                />
              </div>

              {error && (
                <p className="text-sm text-red" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className={cn(
                  'flex w-full items-center justify-center gap-2 rounded-xl btn-danger py-3 text-sm font-semibold hover:brightness-110 disabled:opacity-60'
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

        <p className="text-sm text-ink3">
          See also our{' '}
          <a href="/privacy" className="font-semibold text-brand-ink hover:underline">
            Privacy Policy
          </a>{' '}
          at{' '}
          <a href={`${SITE_URL}/privacy`} className="font-semibold text-brand-ink hover:underline">
            {SITE_URL}/privacy
          </a>
          .
        </p>
      </div>
    </LegalLayout>
  )
}
