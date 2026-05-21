# BoxTruckManage Landing

Marketing landing page for [BoxTruckManage](https://boxtruckmanage.com) — AI-powered box truck fleet management.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Configuration

Copy `.env.example` to `.env` and set your Telegram bot credentials:

```env
BOT_TOKEN=your_bot_token_from_botfather
USER_ID=your_telegram_user_id
```

Demo requests are sent to your Telegram chat:

- **Local dev:** `/api/book-demo` (Vite middleware, reads `.env`)
- **Production:** `/.netlify/functions/book-demo` (Netlify serverless)

**Never** put `BOT_TOKEN` in frontend code or `VITE_*` env vars.

## Deploy to Netlify

### Option A — Git (recommended)

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In [Netlify](https://app.netlify.com): **Add new site** → **Import an existing project**.
3. Build settings are read from `netlify.toml` automatically:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Site configuration → Environment variables**, add:
   - `BOT_TOKEN` — from [@BotFather](https://t.me/BotFather)
   - `USER_ID` — your Telegram numeric user/chat ID
5. Deploy. Connect custom domain `boxtruckmanage.com` under **Domain management**.

### Option B — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify env:set BOT_TOKEN "your_token"
netlify env:set USER_ID "your_user_id"
netlify deploy --prod
```

### Test the form after deploy

1. Submit **Book demo** on the live site.
2. In Netlify: **Functions** — confirm `book-demo` is listed (if missing, `netlify/functions/` was not deployed; redeploy from Git with the full repo).
3. Open `https://YOUR-SITE.netlify.app/.netlify/functions/book-demo` in the browser — you should see `{"error":"Method not allowed"}` (GET), not 404.
4. Check **Functions → book-demo → Logs** if Telegram messages fail (often missing `BOT_TOKEN` / `USER_ID` env vars).

## Build locally

```bash
npm run build
npm run preview
```
