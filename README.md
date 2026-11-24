# BoxTruckManage Landing

Marketing site for [BoxTruckManage](https://boxtruckmanage.com), the dispatch platform for box truck fleets. It sends visitors to the interactive demo at [demo.boxtruckmanage.com](https://demo.boxtruckmanage.com) and to the BTM Driver and BTM Dispatch apps.

React 19, Vite and Tailwind CSS v4. Hosted on Netlify.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Design

- The look is the web app's Cobalt (light) and Cobalt Night (dark) themes: the colour tokens in `src/index.css` are copied from the app, the font is Plus Jakarta Sans (self-hosted through `@fontsource-variable`). The theme switch in the header stores the choice in `localStorage` (`btm-landing-theme`).
- Design system: `design-system/boxtruckmanage/MASTER.md`, generated with the UI/UX Pro Max skill.
- Every product shot on the page is HTML drawn from the demo's own pages and sample company (Redwood Freight LLC). Names, phones and brokers are invented. The phone screens in `public/apps/` are the App Store screenshots of both apps.
- Motion follows the rules in [NurulloMahmud/skill-library](https://github.com/NurulloMahmud/skill-library) (`animations/`): ease-out entrances, exits 20% shorter, 30 to 40 ms staggers, springs with a little overshoot sampled into CSS `linear()` (see the comment above `--spring` in `src/index.css`), transform and opacity only, and a still final state for `prefers-reduced-motion`.

## Where things are

| Path | What |
|------|------|
| `src/pages/LandingPage.jsx` | Section order |
| `src/components/Hero.jsx`, `mock/LiveBoard.jsx` | Hero with the streaming load board |
| `src/components/HowItWorks.jsx`, `mock/steps.jsx` | Five steps from posted load to paid driver |
| `src/components/DashboardSection.jsx`, `mock/StateMap.jsx` | Dashboard, US map (shapes in `src/data/usStates.json`, loaded on demand), leaderboard |
| `src/components/DriversSection.jsx` | Tracking, hiring, onboarding |
| `src/components/MoneySection.jsx` | Accounting, loads, brokers |
| `src/components/AppsSection.jsx` | BTM Driver and BTM Dispatch |
| `src/lib/motion.js` | Scroll reveal, in-view, count-up, FLIP |
| `src/config.js` | Demo URL (with utm tags per button), store links, contact email |

## Book a demo form

Demo requests are sent to Telegram:

- **Local dev:** `/api/book-demo` (Vite middleware, reads `.env`)
- **Production:** `/.netlify/functions/book-demo` (Netlify serverless)

Create a `.env` file with:

```env
BOT_TOKEN=your_bot_token_from_botfather
USER_ID=your_telegram_user_id
```

**Never** put `BOT_TOKEN` in frontend code or `VITE_*` env vars.

## Deploy

Netlify builds from `main` with the settings in `netlify.toml` (`npm run build`, publish `dist`). Set `BOT_TOKEN` and `USER_ID` under **Site configuration > Environment variables**.

## Preview build

A self-contained copy (relative paths, routes kept in memory, form switched off) for sharing before a release:

```bash
VITE_PREVIEW=1 npx vite build --base ./ --outDir dist-preview
```

## Public URLs used by the store listings

- Privacy Policy: https://boxtruckmanage.com/privacy (also `/privacy-policy`)
- Terms & Conditions: https://boxtruckmanage.com/terms (also `/terms-and-conditions`)
- Delete account: https://boxtruckmanage.com/deleteaccount (also `/delete-account`, `/account-deletion`)
