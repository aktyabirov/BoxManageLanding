import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { IS_PREVIEW } from './config'

/* A preview is served from a path the routes do not know, so it keeps its route in memory. */
const Router = IS_PREVIEW ? MemoryRouter : BrowserRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
)
