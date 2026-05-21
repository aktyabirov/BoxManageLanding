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

Demo requests are sent to your Telegram chat via `/api/book-demo` (Vite dev middleware locally, Vercel serverless in production). **Never** put `BOT_TOKEN` in frontend code or `VITE_*` env vars.

## Build

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to Vercel, Netlify, Cloudflare Pages, or any static host.
