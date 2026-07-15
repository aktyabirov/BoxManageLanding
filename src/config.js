export const APP_NAME = 'BoxTruckManage'
export const COMPANY_NAME = 'Smart Fleet LLC'
export const SITE_URL = 'https://boxtruckmanage.com'
export const CONTACT_EMAIL = 'info@smartfleetllc.com'

/** Dev: Vite middleware. Production: Netlify serverless function (direct path, no redirect needed). */
export const BOOK_DEMO_API = import.meta.env.DEV
  ? '/api/book-demo'
  : '/.netlify/functions/book-demo'

export const DELETE_ACCOUNT_API = import.meta.env.DEV
  ? '/api/delete-account'
  : '/.netlify/functions/delete-account'
