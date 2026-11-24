/* The team's Telegram group for website requests. TELEGRAM_CHAT_ID overrides it. The old USER_ID
 * variable is ignored on purpose, so a value left over on Netlify cannot send requests elsewhere. */
const DEFAULT_CHAT_ID = '-5363956866'

export function chatOf(env) {
  return env.TELEGRAM_CHAT_ID || DEFAULT_CHAT_ID
}

/* Only the page's path and query (utm tags), never more than 300 characters. */
function pageOf(url) {
  try {
    const u = new URL(String(url))
    return `${u.host}${u.pathname}${u.search}`.slice(0, 300)
  } catch {
    return ''
  }
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function sendDemoToTelegram(payload, env = process.env) {
  const token = env.BOT_TOKEN
  const chatId = chatOf(env)

  if (!token) {
    throw new Error('Telegram is not configured (BOT_TOKEN)')
  }

  const { name, phone, company, message, source, page } = payload

  const lines = [
    '<b>BoxTruckManage</b> - New demo request',
    '',
    `<b>Name:</b> ${escapeHtml(name)}`,
    `<b>Phone:</b> ${escapeHtml(phone)}`,
  ]

  if (company?.trim()) lines.push(`<b>Company:</b> ${escapeHtml(company.trim())}`)
  if (message?.trim()) lines.push('', `<b>Message:</b>`, escapeHtml(message.trim()))
  if (source?.trim()) lines.push('', `<b>From:</b> ${escapeHtml(source.trim())}`)
  if (page && pageOf(page)) lines.push(`<b>Page:</b> ${escapeHtml(pageOf(page))}`)

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join('\n'),
      parse_mode: 'HTML',
    }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.ok) {
    throw new Error(data.description || 'Failed to send Telegram message')
  }

  return data
}

export async function sendAccountDeletionToTelegram(payload, env = process.env) {
  const token = env.BOT_TOKEN
  const chatId = chatOf(env)

  if (!token) {
    throw new Error('Telegram is not configured (BOT_TOKEN)')
  }

  const { phone, email, reason } = payload
  const lines = ['<b>BoxTruckManage</b> - Account deletion request', '']

  if (phone?.trim()) lines.push(`<b>Phone:</b> ${escapeHtml(phone.trim())}`)
  if (email?.trim()) lines.push(`<b>Email:</b> ${escapeHtml(email.trim())}`)
  if (reason?.trim()) lines.push('', `<b>Reason (optional):</b>`, escapeHtml(reason.trim()))

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join('\n'),
      parse_mode: 'HTML',
    }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.ok) {
    throw new Error(data.description || 'Failed to send Telegram message')
  }

  return data
}
