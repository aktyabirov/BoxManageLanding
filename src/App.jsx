import { Routes, Route } from 'react-router-dom'
import { DemoModalProvider } from './context/DemoModalContext'
import { LandingPage } from './pages/LandingPage'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsAndConditions } from './pages/TermsAndConditions'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DemoModalProvider>
            <LandingPage />
          </DemoModalProvider>
        }
      />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
    </Routes>
  )
}
