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

export function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="July 14, 2026">
      <Section title="Introduction">
        <p>
          {COMPANY_NAME} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the{' '}
          {APP_NAME} driver mobile application and related services (collectively, the
          &quot;Service&quot;). This Privacy Policy explains how we collect, use, disclose, and
          protect information when you use the {APP_NAME} mobile app as a driver or authorized user
          of a carrier account.
        </p>
        <p>
          By downloading, accessing, or using the app, you agree to this Privacy Policy. If you do
          not agree, please do not use the Service.
        </p>
      </Section>

      <Section title="Who this applies to">
        <p>
          This policy applies to drivers and other users who sign in to the {APP_NAME} mobile app
          through an account created by their motor carrier or fleet operator. Your employer or
          carrier may have additional policies that also apply to your use of the app.
        </p>
      </Section>

      <Section title="Information we collect">
        <p>
          <strong className="text-slate-200">Account and profile information.</strong> When you log
          in, we collect credentials and profile data associated with your driver account, such as
          your name, phone number, email address (if provided), carrier affiliation, and driver
          status as maintained by your fleet.
        </p>
        <p>
          <strong className="text-slate-200">Location information.</strong> With your permission, the
          app collects precise GPS location data while you are using location-sharing features. This
          includes real-time and background location when enabled, so dispatchers can see where you
          are on the map and assign or match loads on your behalf. You can control location
          permissions through your device settings; some features may not work without location
          access.
        </p>
        <p>
          <strong className="text-slate-200">Load and bidding activity.</strong> We collect
          information about loads you view, bid on, accept, or decline; nearby load searches;
          messages or notes related to dispatch; and other operational data needed to connect you
          with freight opportunities through your carrier.
        </p>
        <p>
          <strong className="text-slate-200">Device and usage information.</strong> We may collect
          device type, operating system, app version, IP address, crash logs, and general usage
          analytics to maintain, secure, and improve the app.
        </p>
        <p>
          <strong className="text-slate-200">Communications.</strong> If you opt in to SMS or push
          notifications, we process your phone number and message preferences to send load alerts,
          bid updates, and account-related notices. Message and data rates may apply.
        </p>
      </Section>

      <Section title="How we use your information">
        <ul className="list-disc space-y-2 pl-5">
          <li>Authenticate you and provide access to your driver account</li>
          <li>Display available and nearby loads and process your bids</li>
          <li>Share your live location with authorized dispatchers at your carrier</li>
          <li>Help dispatch find and assign loads on your behalf</li>
          <li>Send operational notifications (push, SMS, or in-app) you have agreed to receive</li>
          <li>Improve app performance, security, and user experience</li>
          <li>Comply with legal obligations and enforce our Terms &amp; Conditions</li>
        </ul>
      </Section>

      <Section title="How we share information">
        <p>
          <strong className="text-slate-200">Your carrier / fleet.</strong> Information you provide
          and activity in the app (including location when sharing is enabled) is visible to
          authorized users at your motor carrier — such as dispatchers, managers, and administrators
          — for operational purposes.
        </p>
        <p>
          <strong className="text-slate-200">Service providers.</strong> We use trusted vendors for
          hosting, analytics, messaging, maps, and infrastructure. They may process data only to
          perform services on our behalf under contractual safeguards.
        </p>
        <p>
          <strong className="text-slate-200">Legal requirements.</strong> We may disclose
          information if required by law, court order, or to protect the rights, safety, and
          security of {COMPANY_NAME}, our users, or others.
        </p>
        <p>We do not sell your personal information.</p>
      </Section>

      <Section title="Location data">
        <p>
          Location sharing is a core feature of the driver app. When enabled, your carrier&apos;s
          dispatch team can view your position to coordinate loads, monitor progress, and identify
          nearby freight. Background location may be collected while the app is active or when
          location sharing is turned on, depending on your device permissions and in-app settings.
        </p>
        <p>
          You may disable location access in your device settings at any time. Disabling location may
          limit or prevent load matching, bidding, and dispatch visibility features.
        </p>
      </Section>

      <Section title="Data retention">
        <p>
          We retain information for as long as your account is active, as needed to provide the
          Service, and as required for legal, accounting, or operational purposes. Retention may
          also be governed by your carrier&apos;s agreement with {COMPANY_NAME}.
        </p>
      </Section>

      <Section title="Security">
        <p>
          We use administrative, technical, and organizational measures designed to protect your
          information, including encryption in transit and access controls. No method of transmission
          or storage is completely secure; we cannot guarantee absolute security.
        </p>
      </Section>

      <Section title="Your choices and rights">
        <p>
          Depending on your location, you may have rights to access, correct, delete, or restrict
          certain processing of your personal information. To make a request, contact us using the
          information below. You may also manage notification and location preferences in the app
          and on your device.
        </p>
      </Section>

      <Section title="Children">
        <p>
          The Service is not intended for individuals under 18. We do not knowingly collect personal
          information from children.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. We will post the revised version at{' '}
          <a href={`${SITE_URL}/privacy`} className="text-brand-400 hover:text-brand-300">
            {SITE_URL}/privacy
          </a>{' '}
          and update the &quot;Last updated&quot; date. Continued use of the app after changes
          constitutes acceptance of the updated policy.
        </p>
      </Section>

      <Section title="Contact us">
        <p>
          Questions about this Privacy Policy or our data practices:
        </p>
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
