import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { sendDemoToTelegram, sendAccountDeletionToTelegram } from './server/telegram.js'

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

function apiPlugin() {
  const routes = {
    '/api/book-demo': async (body, env) => {
      const name = String(body.name ?? '').trim()
      const phone = String(body.phone ?? '').trim()
      const company = String(body.company ?? '').trim()
      const message = String(body.message ?? '').trim()
      if (!name || !phone) throw Object.assign(new Error('Name and phone are required'), { status: 400 })
      await sendDemoToTelegram({ name, phone, company, message }, env)
    },
    '/api/delete-account': async (body, env) => {
      const phone = String(body.phone ?? '').trim()
      const email = String(body.email ?? '').trim()
      const reason = String(body.reason ?? '').trim()
      if (!phone && !email) {
        throw Object.assign(new Error('Phone or email is required'), { status: 400 })
      }
      await sendAccountDeletionToTelegram({ phone, email, reason }, env)
    },
  }

  return {
    name: 'api-routes',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const handler = routes[req.url]
        if (!handler || req.method !== 'POST') return next()

        res.setHeader('Content-Type', 'application/json')

        try {
          const body = await readJsonBody(req)
          const env = loadEnv(server.config.mode, process.cwd(), '')
          await handler(body, env)
          res.statusCode = 200
          res.end(JSON.stringify({ ok: true }))
        } catch (err) {
          console.error(`${req.url} error:`, err)
          res.statusCode = err.status || 500
          res.end(
            JSON.stringify({
              error: err.status === 400 ? err.message : 'Could not send request. Try again later.',
            })
          )
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiPlugin()],
})
