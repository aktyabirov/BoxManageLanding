# BoxTruckManage Landing

Marketing site for [BoxTruckManage](https://boxtruckmanage.com), the dispatch platform for box truck fleets, customized for each company. The main call to action is **Book a demo**: the form sends each request to the team's Telegram group.

React 19, Vite and Tailwind CSS v4. Hosted on Netlify.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Design

- Layout: content up to 1440 px wide; on screens 1680 px and wider the whole page scales up (`zoom` in `src/index.css`).
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
| `src/config.js` | Store links, contact email, preview flag |
| `src/components/PricingSection.jsx` | Price range ($300 to $1,200 a month) and what is included |
| `src/components/BookDemoModal.jsx` | The Book a demo form |

## Book a demo form

Every request goes to Telegram with the name, phone, company, message, the button it came from and the page address (so utm tags show which ad or post brought the visitor).

- **Link for ads and posts:** https://boxtruckmanage.com/book-demo opens the page with the form already open (`/book` and `/demo` work too). Add utm tags as needed, for example `https://boxtruckmanage.com/book-demo?utm_source=instagram&utm_campaign=reel_nov`.
- **Chat:** the team group `-5363956866` is the default (`DEFAULT_CHAT_ID` in `server/telegram.js`). Set `TELEGRAM_CHAT_ID` to send somewhere else. The old `USER_ID` variable is ignored. The bot must be a member of the group.
- **Bot token:** `BOT_TOKEN`, set on Netlify (never in frontend code or `VITE_*` variables):

```bash
npx netlify-cli login
npx netlify-cli link
npx netlify-cli env:set BOT_TOKEN "PASTE_BOT_TOKEN_HERE"
```

Environment changes apply from the next deploy. Locally, put `BOT_TOKEN=...` in `.env` and requests go through the Vite middleware at `/api/book-demo`; production uses `/.netlify/functions/book-demo`. Account deletion requests (`/deleteaccount`) use the same bot and chat.

## Meta form leads

Leads from Meta instant forms (Facebook and Instagram lead ads) go to the same Telegram group. `netlify/functions/meta-leads.js` is a scheduled function that runs every minute: it lists the Page's lead forms, fetches leads created since the last run, and posts each new one with the contact details, the answers (as the words people tapped), the platform and ad set, and the time in Tashkent and Central. Sent lead ids are kept in the Netlify Blobs store `meta-leads`, so nothing is posted twice; if Telegram fails, the lead is retried the next minute.

| Variable | What |
|----------|------|
| `META_ACCESS_TOKEN` | System user token (or Page token) with `leads_retrieval`, `pages_show_list`, `pages_read_engagement`, `pages_manage_ads`; `ads_read` adds the ad set and campaign names |
| `META_PAGE_ID` | The Facebook Page the forms belong to |
| `META_GRAPH_VERSION` | Optional, default `v23.0` |
| `META_LEADS_CHAT_ID` | Optional, another chat for leads only |

Until both Meta variables are set the function does nothing. To check it on demand, open `/.netlify/functions/meta-leads-check`: it runs the same check right away and returns which settings are present, how many forms and new leads it found, how many it posted, and any error (no lead details or tokens). Add `?peek=1` to only read the saved state, including when the last run happened and whether the schedule or the check made it. Logic and tests: `server/metaLeads.js`, `npm test`. To try it end to end, create a lead with Meta's Lead Ads Testing Tool; it arrives marked `(TEST)`.

## Deploy

Netlify builds from `main` with the settings in `netlify.toml` (`npm run build`, publish `dist`). `BOT_TOKEN` lives under **Site configuration > Environment variables**.

## Preview build

A self-contained copy (relative paths, routes kept in memory, form switched off) for sharing before a release:

```bash
VITE_PREVIEW=1 npx vite build --base ./ --outDir dist-preview
```

## Public URLs used by the store listings

- Privacy Policy: https://boxtruckmanage.com/privacy (also `/privacy-policy`)
- Terms & Conditions: https://boxtruckmanage.com/terms (also `/terms-and-conditions`)
- Delete account: https://boxtruckmanage.com/deleteaccount (also `/delete-account`, `/account-deletion`)
