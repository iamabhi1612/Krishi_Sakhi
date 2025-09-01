import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'app.name': 'Krishi Sakhi',
    'app.tagline': 'Your AI-powered farming companion',
    'landing.demo.question': 'Would you like to watch a quick demo?',
    'landing.demo.yes': 'Yes, Show Demo',
    'landing.demo.skip': 'Skip to App',
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.about': 'About',
    'nav.contact': 'Contact Us',
    'nav.help': 'Help & Support',
    'home.hero.title': 'Your AI-powered Krishi Sakhi – a digital friend for every farmer',
    'home.get.started': 'Get Started',
    'features.advisory': 'Advisory Section',
    'features.profile': 'Profile Section',
    'features.queries': 'Queries Section',
    'features.knowledge': 'Knowledge Engine',
    'profile.create': 'Create New Profile',
    'profile.farmer.details': 'Farmer Details',
    'profile.farm.details': 'Farm Details',
    'chatbot.placeholder': 'Ask me anything about farming...',
  },
  ml: {
    'app.name': 'കൃഷി സഖി',
    'app.tagline': 'നിങ്ങളുടെ AI-പവേർഡ് കാർഷിക സഹായി',
    'landing.demo.question': 'ഒരു ചെറിയ ഡെമോ കാണാൻ താൽപ്പര്യമുണ്ടോ?',
    'landing.demo.yes': 'ഹ്, ഡെമോ കാണിക്കൂ',
    'landing.demo.skip': 'ആപ്പിലേക്ക് പോകൂ',
    'nav.home': 'ഹോം',
    'nav.features': 'ഫീച്ചറുകൾ',
    'nav.about': 'കുറിച്ച്',
    'nav.contact': 'ബന്ധപ്പെടുക',
    'nav.help': 'സഹായം',
    'home.hero.title': 'നിങ്ങളുടെ AI-പവേർഡ് കൃഷി സഖി – എല്ലാ കർഷകർക്കും ഒരു ഡിജിറ്റൽ സുഹൃത്ത്',
    'home.get.started': 'ആരംഭിക്കുക',
    'features.advisory': 'ഉപദേശ വിഭാഗം',
    'features.profile': 'പ്രൊഫൈൽ വിഭാഗം',
    'features.queries': 'ചോദ്യങ്ങൾ',
    'features.knowledge': 'വിജ്ഞാന കേന്ദ്രം',
    'profile.create': 'പുതിയ പ്രൊഫൈൽ സൃഷ്ടിക്കുക',
    'profile.farmer.details': 'കർഷക വിവരങ്ങൾ',
    'profile.farm.details': 'കൃഷിയിടം വിവരങ്ങൾ',
    'chatbot.placeholder': 'കൃഷിയെ കുറിച്ച് എന്തും ചോദിക്കൂ...',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};