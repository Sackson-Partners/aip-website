import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Check local storage for existing consent
    const consent = localStorage.getItem('cookieConsent');
    
    // Only show if no choice has been made yet
    if (!consent) {
      // Small delay to ensure smooth entrance after page load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
        // If consent exists, we start in minimized state (hidden basically, until user clicks manage)
        setIsMinimized(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    setIsMinimized(true);
  };

  const handleDeny = () => {
    localStorage.setItem('cookieConsent', 'denied');
    setIsVisible(false);
    setIsMinimized(true);
  };

  const handlePreferences = () => {
    // For now, treat as denied or a specific preference state
    // In a full implementation, this would open a settings panel
    localStorage.setItem('cookieConsent', 'preferences');
    setIsVisible(false);
    setIsMinimized(true);
  };

  const handleManageConsent = () => {
    setIsVisible(true);
    setIsMinimized(false);
  };

  const handleClose = () => {
      setIsVisible(false);
      setIsMinimized(true);
  }

  return (
    <>
      {/* Trigger Button - Unobtrusive, centered at bottom when banner is hidden */}
      {isMinimized && (
        <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleManageConsent}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#1a1a1a]/90 hover:bg-[#1a1a1a] text-gray-400 hover:text-white border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs md:text-sm transition-all shadow-lg flex items-center gap-2 group"
        >
            <Settings className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:rotate-90 transition-transform duration-500" />
            Manage Consent
        </motion.button>
      )}

      <AnimatePresence>
        {isVisible && !isMinimized && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 z-[9998] backdrop-blur-[2px]"
              onClick={handleClose}
            />

            {/* Modal Container - Centered horizontally, positioned towards bottom */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 50 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
              className="fixed inset-x-0 bottom-4 md:bottom-8 z-[9999] flex justify-center p-4 pointer-events-none"
              role="dialog"
              aria-modal="true"
              aria-labelledby="consent-title"
            >
              <div className="bg-white rounded-xl shadow-2xl max-w-[650px] w-full p-6 md:p-8 pointer-events-auto relative overflow-hidden border border-gray-100">
                
                {/* Close Button */}
                <button 
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="flex flex-col items-center text-center">
                  <h2 
                    id="consent-title" 
                    className="text-2xl md:text-3xl font-serif font-bold text-[#1F2937] mb-4"
                  >
                    Manage Consent
                  </h2>
                  
                  <p className="text-gray-600 mb-8 text-base leading-relaxed max-w-lg">
                    To provide the best experiences, we use technologies like cookies to store and/or access device information. Consenting to these technologies will allow us to process data such as browsing behavior or unique IDs on this site. Not consenting or withdrawing consent, may adversely affect certain features and functions.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col md:flex-row gap-3 w-full justify-center mb-6">
                    <button
                      onClick={handlePreferences}
                      className="px-6 py-3.5 bg-[#F3F4F6] hover:bg-gray-200 text-[#1F2937] font-semibold rounded-lg transition-colors duration-200 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-gray-300 w-full md:w-auto"
                    >
                      View preferences
                    </button>
                    <button
                      onClick={handleDeny}
                      className="px-6 py-3.5 bg-[#F3F4F6] hover:bg-gray-200 text-[#1F2937] font-semibold rounded-lg transition-colors duration-200 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-gray-300 w-full md:w-auto"
                    >
                      Deny
                    </button>
                    <button
                      onClick={handleAccept}
                      className="px-8 py-3.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg shadow-blue-500/20 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 w-full md:w-auto"
                    >
                      Accept
                    </button>
                  </div>

                  {/* Privacy Link */}
                  <div className="text-sm">
                    <Link 
                      to="/privacy-policy" 
                      className="text-[#3B82F6] hover:text-blue-700 underline font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200 rounded px-1"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConsentBanner;