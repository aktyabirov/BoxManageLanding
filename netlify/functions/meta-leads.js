import { getStore } from '@netlify/blobs'
import { runMetaLeads } from '../../server/metaLeads.js'

/* Every minute: new Meta instant form leads go to the team's Telegram group (see server/metaLeads.js). */
export default async () => {
  const blobs = getStore('meta-leads')
  const store = {
    get: () => blobs.get('state', { type: 'json' }),
    set: (state) => blobs.setJSON('state', state),
  }

  try {
    const result = await runMetaLeads({ store })
    if (result.error || result.delivered) console.log('meta-leads', JSON.stringify(result))
    return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('meta-leads error:', err.message)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

export const config = {
  schedule: '* * * * *',
}
