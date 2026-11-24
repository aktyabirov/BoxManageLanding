import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatLead, runMetaLeads } from './metaLeads.js'

const form = {
  id: 'F1',
  name: 'BTM_Demo_UZ_2026-11',
  status: 'ACTIVE',
  questions: [
    { key: 'full_name', label: 'Full name', type: 'FULL_NAME' },
    { key: 'phone_number', label: 'Phone number', type: 'PHONE' },
    { key: 'email', label: 'Email', type: 'EMAIL' },
    {
      key: 'siz_kimsiz?',
      label: 'Siz kimsiz?',
      type: 'CUSTOM',
      options: [
        { key: 'box_truck_kompaniyasi_egasiman', value: 'Box truck kompaniyasi egasiman' },
        { key: 'dispetcherman', value: 'Dispetcherman' },
      ],
    },
    {
      key: 'nechta_box_truckingiz_bor?',
      label: 'Nechta box truckingiz bor?',
      type: 'CUSTOM',
      options: [{ key: '4-10', value: '4-10' }],
    },
  ],
}

function lead(id, minute, extra = {}) {
  return {
    id,
    created_time: `2026-12-01T15:${String(minute).padStart(2, '0')}:00+0000`,
    platform: 'ig',
    is_organic: false,
    adset_name: 'US_uz_InstantForm',
    campaign_name: 'META_Leads_UZ-Parrot_DemoForm_2026-12',
    field_data: [
      { name: 'full_name', values: ['Akmal <Karimov>'] },
      { name: 'phone_number', values: ['+15550101234'] },
      { name: 'email', values: ['akmal@example.com'] },
      { name: 'siz_kimsiz?', values: ['box_truck_kompaniyasi_egasiman'] },
      { name: 'nechta_box_truckingiz_bor?', values: ['4-10'] },
    ],
    ...extra,
  }
}

function fakeGraph(leads, { failNames = false } = {}) {
  const calls = []
  const fetchImpl = async (url) => {
    const u = new URL(url)
    calls.push(u.pathname + '?' + u.searchParams.get('fields'))
    const json = (body, status = 200) => ({ ok: status < 400, status, json: async () => body })
    if (u.pathname.endsWith('/P1') && u.searchParams.get('fields') === 'access_token') {
      return json({ access_token: 'PAGE_TOKEN', id: 'P1' })
    }
    if (u.pathname.endsWith('/P1/leadgen_forms')) return json({ data: [form] })
    if (u.pathname.endsWith('/F1/leads')) {
      if (failNames && u.searchParams.get('fields').includes('ad_name')) {
        return json({ error: { message: 'Requires ads_read', code: 200 } }, 400)
      }
      const since = JSON.parse(u.searchParams.get('filtering'))[0].value
      return json({ data: leads.filter((l) => new Date(l.created_time) / 1000 > since) })
    }
    return json({ error: { message: 'unexpected ' + u.pathname } }, 404)
  }
  return { fetchImpl, calls }
}

function memoryStore(initial = null) {
  let state = initial
  return { get: async () => state, set: async (s) => (state = s), peek: () => state }
}

const env = { META_ACCESS_TOKEN: 'SYSTEM_USER_TOKEN', META_PAGE_ID: 'P1', BOT_TOKEN: 'x' }
const now = Date.parse('2026-12-01T15:30:00Z')

test('formats a lead with option words, escaped values and the source', () => {
  const text = formatLead(lead('L1', 5), form)
  assert.match(text, /New lead from Meta form\n/)
  assert.match(text, /<b>Name:<\/b> Akmal &lt;Karimov&gt;/)
  assert.match(text, /<b>Phone:<\/b> \+15550101234/)
  assert.match(text, /<b>Siz kimsiz\?<\/b>\nBox truck kompaniyasi egasiman/)
  assert.match(text, /<b>Nechta box truckingiz bor\?<\/b>\n4-10/)
  assert.match(text, /<b>From:<\/b> Instagram, US_uz_InstantForm/)
  assert.match(text, /<b>Form:<\/b> BTM_Demo_UZ_2026-11/)
  assert.match(text, /<b>Time:<\/b> 1 Dec, 20:05 Tashkent, 1 Dec, 09:05 Central/)
})

test('marks Meta test leads', () => {
  const t = lead('L1', 5, { field_data: [{ name: 'full_name', values: ['<test lead: dummy data for full_name>'] }] })
  assert.match(formatLead(t, form), /\(TEST\)/)
})

test('sends new leads oldest first, once', async () => {
  const leads = [lead('L2', 20), lead('L1', 10)]
  const { fetchImpl } = fakeGraph(leads)
  const sent = []
  const store = memoryStore()
  const send = async (text) => sent.push(text)

  const first = await runMetaLeads({ env, store, now, fetchImpl, send })
  assert.equal(first.delivered, 2)
  assert.ok(sent[0].includes('09:10 Central') && sent[1].includes('09:20 Central'))

  const second = await runMetaLeads({ env, store, now: now + 60_000, fetchImpl, send })
  assert.equal(second.delivered, 0)
  assert.equal(sent.length, 2)
})

test('a failed send is retried next run and later leads wait', async () => {
  const leads = [lead('L1', 10), lead('L2', 20)]
  const { fetchImpl } = fakeGraph(leads)
  const store = memoryStore()
  const sent = []
  let fail = true
  const send = async (text) => {
    if (fail) throw new Error('Telegram down')
    sent.push(text)
  }

  const first = await runMetaLeads({ env, store, now, fetchImpl, send })
  assert.equal(first.delivered, 0)
  assert.equal(first.error, 'Telegram down')

  fail = false
  const second = await runMetaLeads({ env, store, now: now + 60_000, fetchImpl, send })
  assert.equal(second.delivered, 2)
  assert.equal(sent.length, 2)
})

test('falls back to plain lead fields when ad names are not readable', async () => {
  const { fetchImpl } = fakeGraph([lead('L1', 10, { adset_name: undefined, campaign_name: undefined })], { failNames: true })
  const sent = []
  const result = await runMetaLeads({ env, store: memoryStore(), now, fetchImpl, send: async (t) => sent.push(t) })
  assert.equal(result.delivered, 1)
  assert.match(sent[0], /<b>From:<\/b> Instagram\n/)
})

test('does nothing until the Meta settings exist', async () => {
  const result = await runMetaLeads({ env: { BOT_TOKEN: 'x' }, store: memoryStore() })
  assert.ok(result.skipped)
})
