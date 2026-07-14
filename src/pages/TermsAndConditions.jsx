import { LegalLayout } from '../components/LegalLayout'
import { APP_NAME, COMPANY_NAME, CONTACT_EMAIL, SITE_URL } from '../config'

function Section({ title, children }) {
  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-white sm:text-xl">{title}</h2>
      <div className="mt-3 space-y-3 text-slate-400">{children}</div>
    </section>
  )
}

export function TermsAndConditions() {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="July 14, 2026">
      <Section title="Agreement">
        <p>
          These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the {APP_NAME} driver
          mobile application and related services (the &quot;Service&quot;) provided by{' '}
          {COMPANY_NAME}. By downloading, accessing, or using the app, you agree to these Terms. If
          you do not agree, do not use the Service.
        </p>
      </Section>

      <Section title="Eligibility and accounts">
        <p>
          The driver app is intended for authorized drivers and personnel of motor carriers that use{' '}
          {APP_NAME}. You must be at least 18 years old and legally permitted to operate commercial
          vehicles where applicable. Accounts are typically created or invited by your carrier; you
          are responsible for keeping login credentials confidential and for all activity under
          your account.
        </p>
      </Section>

      <Section title="Description of the Service">
        <p>The {APP_NAME} driver app allows you to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Sign in to your driver account associated with your carrier</li>
          <li>View available and nearby loads offered through your fleet</li>
          <li>Place bids on loads made available for bidding</li>
          <li>Share your live location with authorized dispatchers at your carrier</li>
          <li>Receive load, bid, and operational notifications (where enabled)</li>
          <li>Coordinate with dispatch so loads may be sourced or assigned on your behalf</li>
        </ul>
        <p>
          Features available to you may depend on your carrier&apos;s subscription, settings, and
          your role. {COMPANY_NAME} may modify, suspend, or discontinue features at any time.
        </p>
      </Section>

      <Section title="Location sharing">
        <p>
          When you enable location sharing, you authorize {COMPANY_NAME} and your carrier to
          collect and use your GPS location for dispatch, load matching, and operational visibility.
          You understand that dispatchers and other authorized carrier personnel may view your
          location in real time while sharing is active. You are responsible for complying with
          applicable laws regarding device use while driving.
        </p>
      </Section>

      <Section title="Bidding and loads">
        <p>
          Load availability, rates, and bid outcomes are determined by your carrier, brokers, and
          operational rules configured in the platform. Submitting a bid does not guarantee
          assignment. {COMPANY_NAME} is a technology provider and is not a motor carrier, broker, or
          employer unless explicitly stated in a separate written agreement.
        </p>
      </Section>

      <Section title="Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Use the Service for any unlawful purpose or in violation of DOT or local regulations</li>
          <li>Share account credentials or allow unauthorized access to your account</li>
          <li>Interfere with or disrupt the Service, servers, or networks</li>
          <li>Reverse engineer, scrape, or attempt to extract source code except as permitted by law</li>
          <li>Submit false bids, location data, or other misleading information</li>
        </ul>
      </Section>

      <Section title="SMS and notifications">
        <p>
          If you opt in to SMS messages, you consent to receive automated and operational texts
          related to loads, bids, and your account. Message frequency varies. Message and data rates
          may apply. Reply STOP to opt out where supported; reply HELP for help. See our{' '}
          <a href="/privacy" className="text-brand-400 hover:text-brand-300">
            Privacy Policy
          </a>{' '}
          for how we handle contact information.
        </p>
      </Section>

      <Section title="Intellectual property">
        <p>
          The Service, including software, design, logos, and content, is owned by {COMPANY_NAME} or
          its licensors and protected by intellectual property laws. You receive a limited,
          non-exclusive, non-transferable license to use the app for its intended purpose in
          connection with your carrier account.
        </p>
      </Section>

      <Section title="Disclaimer of warranties">
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES
          OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED,
          ERROR-FREE, OR ACCURATE AT ALL TIMES. LOAD, ROUTE, AND LOCATION DATA MAY CONTAIN ERRORS OR
          DELAYS.
        </p>
      </Section>

      <Section title="Limitation of liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, {COMPANY_NAME} AND ITS OFFICERS, DIRECTORS,
          EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING
          FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SERVICE
          SHALL NOT EXCEED THE GREATER OF ONE HUNDRED U.S. DOLLARS ($100) OR THE AMOUNT YOU PAID US
          FOR THE SERVICE IN THE TWELVE (12) MONTHS BEFORE THE CLAIM.
        </p>
      </Section>

      <Section title="Indemnification">
        <p>
          You agree to indemnify and hold harmless {COMPANY_NAME} from claims, damages, and expenses
          (including reasonable attorneys&apos; fees) arising from your misuse of the Service,
          violation of these Terms, or violation of any third-party rights.
        </p>
      </Section>

      <Section title="Termination">
        <p>
          We or your carrier may suspend or terminate your access at any time for violation of these
          Terms, security concerns, or operational reasons. Upon termination, your right to use the
          app ceases immediately. Provisions that by nature should survive will survive termination.
        </p>
      </Section>

      <Section title="Governing law">
        <p>
          These Terms are governed by the laws of the State of Texas, United States, without regard
          to conflict-of-law principles, except where mandatory consumer protection laws in your
          jurisdiction apply. Any dispute shall be resolved in the state or federal courts located in
          Texas, unless otherwise required by applicable law.
        </p>
      </Section>

      <Section title="Changes to these Terms">
        <p>
          We may update these Terms from time to time. The current version will be posted at{' '}
          <a href={`${SITE_URL}/terms`} className="text-brand-400 hover:text-brand-300">
            {SITE_URL}/terms
          </a>
          . Continued use after changes constitutes acceptance of the revised Terms.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          {COMPANY_NAME}
          <br />
          Email:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-400 hover:text-brand-300">
            {CONTACT_EMAIL}
          </a>
          <br />
          Website:{' '}
          <a href={SITE_URL} className="text-brand-400 hover:text-brand-300">
            {SITE_URL}
          </a>
        </p>
      </Section>
    </LegalLayout>
  )
}
