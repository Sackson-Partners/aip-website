import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="flex items-center bg-[#1a1f2e] rounded-full p-1 border border-white/10 shadow-inner">
      <Globe className="w-4 h-4 text-gray-400 ml-2 mr-1 hidden sm:block" />
      <div className="flex relative">
        <button
          onClick={() => toggleLanguage('en')}
          className={`relative z-10 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full transition-colors duration-300 ${
            language === 'en' ? 'text-[#0F1419]' : 'text-gray-400 hover:text-white'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => toggleLanguage('fr')}
          className={`relative z-10 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full transition-colors duration-300 ${
            language === 'fr' ? 'text-[#0F1419]' : 'text-gray-400 hover:text-white'
          }`}
        >
          FR
        </button>
        
        {/* Animated Background Highlight */}
        <motion.div
          className="absolute top-0 bottom-0 w-1/2 bg-[#D4AF37] rounded-full z-0"
          initial={false}
          animate={{
            x: language === 'en' ? '0%' : '100%'
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
};

export default LanguageSwitcher;