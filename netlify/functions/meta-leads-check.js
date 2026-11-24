import { getStore } from '@netlify/blobs'
import { runMetaLeads } from '../../server/metaLeads.js'

/* GET /.netlify/functions/meta-leads-check runs the same check as the scheduled function right now
 * and reports what happened: which settings are present, how many forms and new leads it found,
 * how many it posted, and the error if any. No lead details or tokens are returned. Posting is
 * idempotent (sent ids are remembered), so calling it repeatedly never posts a lead twice.
 * With ?peek=1 it only reports the saved state, including when the last run happened and whether
 * the schedule or this endpoint made it. */
export default async (req) => {
  if (req.method !== 'GET') return new Response('Method not allowed', { status: 405 })

  const env = {
    META_ACCESS_TOKEN: Boolean(process.env.META_ACCESS_TOKEN),
    META_PAGE_ID: Boolean(process.env.META_PAGE_ID),
    BOT_TOKEN: Boolean(process.env.BOT_TOKEN),
  }

  let stage = 'blobs'
  try {
    const blobs = getStore('meta-leads')
    const store = {
      get: () => blobs.get('state', { type: 'json' }),
      set: (state) => blobs.setJSON('state', state),
    }
    const before = await store.get()
    const saved = { remembered: before?.sent?.length ?? 0, lastRun: before?.lastRun ?? null }
    if (new URL(req.url).searchParams.get('peek')) return Response.json({ env, ...saved })

    stage = 'run'
    const result = await runMetaLeads({ store, by: 'check' })
    return Response.json({ env, ...saved, result })
  } catch (err) {
    return Response.json({ env, stage, error: err.message }, { status: 500 })
  }
}
