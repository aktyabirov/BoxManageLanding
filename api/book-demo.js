import { sendDemoToTelegram } from '../server/telegram.js'

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', (chunk) => {
      raw += chunk
    })
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {})
      } catch {
        reject(new Error('Invalid JSON'))
      }
    })
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = await readJsonBody(req)
    const name = String(body.name ?? '').trim()
    const phone = String(body.phone ?? '').trim()
    const company = String(body.company ?? '').trim()
    const message = String(body.message ?? '').trim()

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' })
    }

    await sendDemoToTelegram({ name, phone, company, message })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('book-demo error:', err)
    return res.status(500).json({ error: 'Could not send request. Try again later.' })
  }
}
