import { Mail } from 'lucide-react'
import { APP_NAME } from '../config'
import { BookDemoButton } from './BookDemoButton'

export function Cta() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl panel-brand px-8 py-16 text-center sm:px-16">

          <div className="relative">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Ready to modernize your box truck operations?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
              See why fleets are switching to {APP_NAME} for dispatch, finance, and AI-powered
              load creation — built specifically for the box truck market.
            </p>

            <BookDemoButton variant="cta" className="mt-10">
              <Mail className="h-4 w-4" />
              Book demo
            </BookDemoButton>
          </div>
        </div>
      </div>
    </section>
  )
}
