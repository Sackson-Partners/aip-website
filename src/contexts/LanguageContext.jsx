import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '@/lib/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('aip_language');
    if (saved && (saved === 'en' || saved === 'fr')) {
      return saved;
    }
    return 'en'; // Default
  });

  useEffect(() => {
    localStorage.setItem('aip_language', language);
    // Optionally update document lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language] || translations['en'];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};