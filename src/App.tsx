import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import FeaturesPage from './components/FeaturesPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import HelpSupport from './components/HelpSupport';
import ProfileDashboard from './components/ProfileDashboard';
import Navigation from './components/Navigation';
import FloatingChatbot from './components/FloatingChatbot';
import { LanguageProvider } from './contexts/LanguageContext';
import { ProfileProvider } from './contexts/ProfileContext';

function App() {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <LanguageProvider>
      <ProfileProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            {showLanding ? (
              <LandingPage onContinue={() => setShowLanding(false)} />
            ) : (
              <>
                <Navigation />
                <main className="pt-16">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/features" element={<FeaturesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/help" element={<HelpSupport />} />
                    <Route path="/profile/:id" element={<ProfileDashboard />} />
                  </Routes>
                </main>
                <FloatingChatbot />
              </>
            )}
          </div>
        </Router>
      </ProfileProvider>
    </LanguageProvider>
  );
}

export default App;