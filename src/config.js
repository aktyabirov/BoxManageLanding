export const APP_NAME = 'BoxTruckManage'
export const COMPANY_NAME = 'Nahl Group'
export const SITE_URL = 'https://boxtruckmanage.com'
export const CONTACT_EMAIL = 'info@smartfleetllc.com'

export const DRIVER_APP_NAME = 'BTM Driver'
/** Replace with the direct store listing URLs; these fall back to a store search. */
export const APP_STORE_URL = 'https://apps.apple.com/us/search?term=BTM%20Driver'
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/search?q=BTM%20Driver&c=apps'

/** Dev: Vite middleware. Production: Netlify serverless function (direct path, no redirect needed). */
export const BOOK_DEMO_API = import.meta.env.DEV
  ? '/api/book-demo'
  : '/.netlify/functions/book-demo'

export const DELETE_ACCOUNT_API = import.meta.env.DEV
  ? '/api/delete-account'
  : '/.netlify/functions/delete-account'
