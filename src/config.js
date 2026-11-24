export const APP_NAME = 'BoxTruckManage'
export const COMPANY_NAME = 'Nahl Group'
export const SITE_URL = 'https://boxtruckmanage.com'
export const CONTACT_EMAIL = 'support@boxtruckmanage.com'

/* A file from public/, under whatever base the build was given (/ on the site, ./ for previews). */
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`

/* Preview builds (VITE_PREVIEW=1) render without a server: no router history, no form endpoint. */
export const IS_PREVIEW = import.meta.env.VITE_PREVIEW === '1'

/* The interactive demo: the real web app with sample data, no sign-up. The demo keeps the utm
 * tags of the first URL it opens with, so each button says where it was pressed. */
export const DEMO_URL = 'https://demo.boxtruckmanage.com'
export function demoHref(place) {
  const q = new URLSearchParams({ utm_source: 'landing', utm_medium: 'web', utm_content: place })
  return `${DEMO_URL}/?${q}`
}

export const DRIVER_APP_NAME = 'BTM Driver'
export const DISPATCH_APP_NAME = 'BTM Dispatch'

export const DRIVER_APP = {
  appStore: 'https://apps.apple.com/us/app/id6830216729',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.boxtruckmanage.driver',
}
export const DISPATCH_APP = {
  appStore: 'https://apps.apple.com/us/app/id6837668206',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.boxtruckmanage.dispatch',
}

/* Kept for the legal pages, which link the driver app by these names. */
export const APP_STORE_URL = DRIVER_APP.appStore
export const GOOGLE_PLAY_URL = DRIVER_APP.googlePlay

/** Dev: Vite middleware. Production: Netlify serverless function (direct path, no redirect needed). */
export const BOOK_DEMO_API = IS_PREVIEW
  ? null
  : import.meta.env.DEV
    ? '/api/book-demo'
    : '/.netlify/functions/book-demo'

export const DELETE_ACCOUNT_API = import.meta.env.DEV
  ? '/api/delete-account'
  : '/.netlify/functions/delete-account'
