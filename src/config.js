export const APP_NAME = 'BoxTruckManage'
export const SITE_URL = 'https://boxtruckmanage.com'

/** Dev: Vite middleware. Production: Netlify serverless function (direct path, no redirect needed). */
export const BOOK_DEMO_API = import.meta.env.DEV
  ? '/api/book-demo'
  : '/.netlify/functions/book-demo'
