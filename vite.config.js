import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { sendDemoToTelegram } from './server/telegram.js'

function bookDemoApiPlugin() {
  return {
    name: 'book-demo-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== '/api/book-demo' || req.method !== 'POST') {
          return next()
        }

        let raw = ''
        req.on('data', (chunk) => {
          raw += chunk
        })
        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json')

          try {
            const body = raw ? JSON.parse(raw) : {}
            const name = String(body.name ?? '').trim()
            const phone = String(body.phone ?? '').trim()
            const company = String(body.company ?? '').trim()
            const message = String(body.message ?? '').trim()

            if (!name || !phone) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Name and phone are required' }))
              return
            }

            const env = loadEnv(server.config.mode, process.cwd(), '')
            await sendDemoToTelegram({ name, phone, company, message }, env)

            res.statusCode = 200
            res.end(JSON.stringify({ ok: true }))
          } catch (err) {
            console.error('book-demo error:', err)
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Could not send request. Try again later.' }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), bookDemoApiPlugin()],
})
