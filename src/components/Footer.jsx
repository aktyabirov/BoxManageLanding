import { Link } from 'react-router-dom'
import { COMPANY_NAME, CONTACT_EMAIL, DISPATCH_APP, DRIVER_APP, demoHref } from '../config'
import { useDemoModal } from '../context/DemoModalContext'
import { Logo } from './Logo'

export function Footer() {
  const { openDemo } = useDemoModal()
  const link = 'inline-flex min-h-9 items-center text-[14.5px] text-ink2 transition-colors hover:text-ink'
  const cols = [
    [
      'Product',
      [
        ['How it works', '#how'],
        ['Built for you', '#custom'],
        ['Dashboard', '#dashboard'],
        ['Drivers', '#drivers'],
        ['Money', '#money'],
        ['Pricing', '#pricing'],
        ['FAQ', '#faq'],
      ],
    ],
    [
      'Apps',
      [
        ['BTM Driver for iPhone', DRIVER_APP.appStore, true],
        ['BTM Driver for Android', DRIVER_APP.googlePlay, true],
        ['BTM Dispatch for iPhone', DISPATCH_APP.appStore, true],
        ['BTM Dispatch for Android', DISPATCH_APP.googlePlay, true],
      ],
    ],
  ]

  return (
    <footer className="border-t border-line bg-ground pt-16 pb-10">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo size={36} />
            <p className="mt-4 max-w-[300px] text-[14.5px] leading-relaxed text-ink2">
              The dispatch platform for box truck fleets, customized for each company, from hiring to P&amp;L. Made by {COMPANY_NAME}.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-flex min-h-9 items-center text-[14.5px] font-semibold text-brand-ink hover:underline">
              {CONTACT_EMAIL}
            </a>
          </div>
          {cols.map(([title, items]) => (
            <nav key={title} aria-label={title}>
              <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-ink3">{title}</p>
              <ul className="mt-3 space-y-0.5">
                {items.map(([label, href, ext]) => (
                  <li key={label}>
                    <a href={href} className={link} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav aria-label="Company">
            <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-ink3">Company</p>
            <ul className="mt-3 space-y-0.5">
              <li>
                <a href={demoHref('footer')} target="_blank" rel="noopener" className={link}>
                  Live demo
                </a>
              </li>
              <li>
                <button type="button" onClick={openDemo} className={link}>
                  Book a demo
                </button>
              </li>
              <li>
                <Link to="/privacy" className={link}>
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className={link}>
                  Terms and conditions
                </Link>
              </li>
              <li>
                <Link to="/deleteaccount" className={link}>
                  Delete account
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-12 border-t border-line pt-6 text-[13px] text-ink3">
          © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
