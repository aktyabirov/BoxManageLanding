function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function sendDemoToTelegram(payload, env = process.env) {
  const token = env.BOT_TOKEN
  const chatId = env.USER_ID

  if (!token || !chatId) {
    throw new Error('Telegram is not configured (BOT_TOKEN, USER_ID)')
  }

  const { name, phone, company, message } = payload

  const lines = [
    '🚛 <b>BoxTruckManage</b> — Demo request',
    '',
    `<b>Name:</b> ${escapeHtml(name)}`,
    `<b>Phone:</b> ${escapeHtml(phone)}`,
  ]

  if (company?.trim()) lines.push(`<b>Company:</b> ${escapeHtml(company.trim())}`)
  if (message?.trim()) lines.push('', `<b>Message:</b>`, escapeHtml(message.trim()))

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
  const chatId = env.USER_ID

  if (!token || !chatId) {
    throw new Error('Telegram is not configured (BOT_TOKEN, USER_ID)')
  }

  const { phone, email, reason } = payload
  const lines = [
    '🗑️ <b>BoxTruckManage</b> — Account deletion request',
    '',
  ]

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
