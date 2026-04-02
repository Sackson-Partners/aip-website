import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo'; // Assuming Logo component can handle sizing
import { Button } from '@/components/ui/button';

const EmailLoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Email Login - AFRICA Infrastructure Partners</title>
        <meta name="description" content="Access your secure company mailbox for Africa Infrastructure Partners." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white p-6 sm:p-8 md:p-12 rounded-xl shadow-lg w-full max-w-lg lg:max-w-xl text-center border border-gray-100"
        >
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              {/* Assuming Logo component can be styled for this use case.
                  If a specific image file (aip-logo.png) is required, 
                  it would need to be imported and rendered as an <img> tag.
                  For now, using the existing Logo component.
              */}
              <Logo size="lg" /> 
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#0F1419] mb-3">
              Email <span className="text-[#D4AF37]">Login</span>
            </h1>
            <p className="text-gray-600 text-md sm:text-lg max-w-md mx-auto">
              Access your secure company mailbox using your domain email address.
            </p>
          </div>

          {/* Main CTA Section */}
          <div className="mb-8">
            <a href="https://mail.hostinger.com/v2/auth/login" target="_blank" rel="noopener noreferrer">
              <Button 
                className="w-full bg-[#D4AF37] text-white hover:bg-opacity-90 hover:scale-[1.02] transition-all duration-300 font-bold py-6 text-lg rounded-lg shadow-md shadow-[#D4AF37]/30"
              >
                Login to Email
              </Button>
            </a>
            <p className="text-gray-500 text-xs mt-4">
              Tip: If you have issues, try opening the link in an Incognito/Private window.
            </p>
          </div>

          {/* Footer Section */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <p className="text-gray-500 text-xs">
              © Africa Infrastructure Partners — <a href="https://www.africa-infra.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#0F1419]">www.africa-infra.com</a> — Abidjan, Côte d'Ivoire
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default EmailLoginPage;