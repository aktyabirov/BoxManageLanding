/* Meta instant form leads -> the team's Telegram group.
 *
 * A Netlify scheduled function calls runMetaLeads() every minute. It lists the Page's lead forms,
 * asks each one for leads created since the last run (with a 10 minute overlap), sends every lead
 * it has not sent before, and remembers the sent ids in a Netlify Blobs store. Polling needs no
 * webhook subscription and no live Meta app review: a token with leads_retrieval for the Page is
 * enough. */

import { chatOf, escapeHtml } from './telegram.js'

const DEFAULT_GRAPH_VERSION = 'v23.0'
const OVERLAP_SECONDS = 600
const FIRST_RUN_LOOKBACK_SECONDS = 3600
const MAX_REMEMBERED_IDS = 500

const PLATFORMS = { ig: 'Instagram', fb: 'Facebook', msg: 'Messenger', wa: 'WhatsApp', an: 'Audience Network' }

/* Contact fields Meta fills from the profile, shown first and in this order. */
const CONTACT_FIELDS = [
  ['full_name', 'Name'],
  ['first_name', 'First name'],
  ['last_name', 'Last name'],
  ['phone_number', 'Phone'],
  ['email', 'Email'],
  ['company_name', 'Company'],
  ['city', 'City'],
  ['state', 'State'],
]

function graphVersion(env) {
  return env.META_GRAPH_VERSION || DEFAULT_GRAPH_VERSION
}

export async function graph(path, params, token, env = process.env, fetchImpl = fetch) {
  const url = new URL(`https://graph.facebook.com/${graphVersion(env)}/${path}`)
  for (const [key, value] of Object.entries(params || {})) {
    if (value !== undefined && value !== null) url.searchParams.set(key, String(value))
  }
  url.searchParams.set('access_token', token)
  const res = await fetchImpl(url)
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.error) {
    const message = data.error?.message || `Graph API ${res.status}`
    const err = new Error(`${path}: ${message}`)
    err.code = data.error?.code
    throw err
  }
  return data
}

/* META_ACCESS_TOKEN may be a Page token already, or a system user / user token that can read the
 * Page. In the second case the Page's own token is fetched once per run. */
export async function pageToken(env, fetchImpl = fetch) {
  const token = env.META_ACCESS_TOKEN
  try {
    const page = await graph(env.META_PAGE_ID, { fields: 'access_token' }, token, env, fetchImpl)
    return page.access_token || token
  } catch {
    return token
  }
}

async function listForms(env, token, fetchImpl) {
  const data = await graph(
    `${env.META_PAGE_ID}/leadgen_forms`,
    { fields: 'id,name,status,questions{key,label,type,options{key,value}}', limit: 50 },
    token,
    env,
    fetchImpl,
  )
  return data.data || []
}

async function listLeads(env, token, formId, sinceSeconds, fetchImpl) {
  const filtering = JSON.stringify([{ field: 'time_created', operator: 'GREATER_THAN', value: sinceSeconds }])
  const params = { filtering, limit: 100 }
  try {
    const data = await graph(
      `${formId}/leads`,
      { ...params, fields: 'id,created_time,field_data,platform,is_organic,ad_name,adset_name,campaign_name' },
      token,
      env,
      fetchImpl,
    )
    return data.data || []
  } catch (err) {
    /* Ad and campaign names need ads permissions on top of leads_retrieval. Without them the lead
     * itself still matters more, so ask again without the names. */
    const data = await graph(
      `${formId}/leads`,
      { ...params, fields: 'id,created_time,field_data,platform,is_organic' },
      token,
      env,
      fetchImpl,
    )
    return data.data || []
  }
}

function valuesOf(field) {
  return (field?.values || []).map((v) => String(v)).filter(Boolean)
}

/* Turns option keys (box_truck_kompaniyasi_egasiman) back into the words the person tapped. */
function answerText(question, values) {
  const options = question?.options || []
  return values
    .map((value) => options.find((o) => o.key === value)?.value || value)
    .join(', ')
}

function formatTime(iso) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const part = (timeZone) =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone,
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date)
  return `${part('Asia/Tashkent')} Tashkent, ${part('America/Chicago')} Central`
}

function looksLikeTest(lead) {
  return (lead.field_data || []).some((f) => valuesOf(f).some((v) => /test lead|dummy data/i.test(v)))
}

export function formatLead(lead, form) {
  const fields = new Map((lead.field_data || []).map((f) => [f.name, f]))
  const questions = new Map((form?.questions || []).map((q) => [q.key, q]))
  const lines = [`<b>BoxTruckManage</b> - New lead from Meta form${looksLikeTest(lead) ? ' (TEST)' : ''}`, '']

  const used = new Set()
  for (const [key, label] of CONTACT_FIELDS) {
    const values = valuesOf(fields.get(key))
    if (!values.length) continue
    used.add(key)
    lines.push(`<b>${label}:</b> ${escapeHtml(values.join(', '))}`)
  }

  const answers = []
  for (const field of lead.field_data || []) {
    if (used.has(field.name)) continue
    const values = valuesOf(field)
    if (!values.length) continue
    const question = questions.get(field.name)
    const label = question?.label || field.name.replace(/_/g, ' ')
    answers.push(`<b>${escapeHtml(label)}</b>`, escapeHtml(answerText(question, values)))
  }
  if (answers.length) lines.push('', ...answers)

  const source = [PLATFORMS[lead.platform] || lead.platform, lead.adset_name].filter(Boolean).join(', ')
  lines.push('')
  if (source) lines.push(`<b>From:</b> ${escapeHtml(source)}${lead.is_organic ? ' (organic)' : ''}`)
  if (lead.campaign_name) lines.push(`<b>Campaign:</b> ${escapeHtml(lead.campaign_name)}`)
  if (form?.name) lines.push(`<b>Form:</b> ${escapeHtml(form.name)}`)
  const time = formatTime(lead.created_time)
  if (time) lines.push(`<b>Time:</b> ${time}`)

  return lines.join('\n')
}

export async function sendTelegramHtml(text, env = process.env, fetchImpl = fetch) {
  if (!env.BOT_TOKEN) throw new Error('Telegram is not configured (BOT_TOKEN)')
  const res = await fetchImpl(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: env.META_LEADS_CHAT_ID || chatOf(env),
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.ok) throw new Error(data.description || 'Failed to send Telegram message')
  return data
}

/* store: { get(): Promise<state|null>, set(state): Promise<void> } */
export async function runMetaLeads({ env = process.env, store, now = Date.now(), fetchImpl = fetch, send = sendTelegramHtml }) {
  if (!env.META_ACCESS_TOKEN || !env.META_PAGE_ID) {
    return { skipped: 'META_ACCESS_TOKEN or META_PAGE_ID is not set' }
  }

  const nowSeconds = Math.floor(now / 1000)
  const state = (await store.get()) || {}
  const since = Number(state.since) || nowSeconds - FIRST_RUN_LOOKBACK_SECONDS
  const sent = new Set(state.sent || [])

  const token = await pageToken(env, fetchImpl)
  const forms = await listForms(env, token, fetchImpl)

  const fresh = []
  for (const form of forms) {
    const leads = await listLeads(env, token, form.id, since - OVERLAP_SECONDS, fetchImpl)
    for (const lead of leads) {
      if (!sent.has(lead.id)) fresh.push({ lead, form })
    }
  }
  fresh.sort((a, b) => new Date(a.lead.created_time) - new Date(b.lead.created_time))

  let delivered = 0
  let error = null
  for (const { lead, form } of fresh) {
    try {
      await send(formatLead(lead, form), env, fetchImpl)
      sent.add(lead.id)
      delivered += 1
    } catch (err) {
      /* Stop here and try the rest next minute, so leads keep their order. */
      error = err.message
      break
    }
  }

  await store.set({
    since: error ? since : Math.max(since, nowSeconds - OVERLAP_SECONDS),
    sent: [...sent].slice(-MAX_REMEMBERED_IDS),
  })

  return { forms: forms.length, found: fresh.length, delivered, error }
}
