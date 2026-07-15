import { Routes, Route } from 'react-router-dom'
import { DemoModalProvider } from './context/DemoModalContext'
import { LandingPage } from './pages/LandingPage'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsAndConditions } from './pages/TermsAndConditions'
import { DeleteAccount } from './pages/DeleteAccount'

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
      <Route path="/delete-account" element={<DeleteAccount />} />
      <Route path="/account-deletion" element={<DeleteAccount />} />
    </Routes>
  )
}
