import React from 'react';
import { Helmet } from 'react-helmet';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const HowItWorksPage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <Helmet>
        <title>How It Works - AIP</title>
        <meta name="description" content="Learn about the infrastructure lifecycle and strategic approach of Africa Infrastructure Partners (AIP)." />
      </Helmet>

      <div className="min-h-screen bg-[#0a1628] font-sans selection:bg-[#c9a84c] selection:text-[#0a1628] relative">
        <Navigation />

        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#c9a84c] origin-left z-50"
          style={{ scaleX }}
        />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#c9a84c]/5 rounded-full blur-[120px] pointer-events-none" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-serif tracking-tight">
              Our <span className="text-[#c9a84c] italic">Process</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Explore our comprehensive infrastructure lifecycle, designed to originate, de-risk, and execute high-impact projects across Africa through strategic partnerships and meticulous assessment.
            </p>
          </motion.div>
        </section>

        {/* Diagrams Section */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10 space-y-24">
          
          {/* Diagram 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                The Africa Infrastructure Partners Ecosystem
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                A visual overview of our 7-stage infrastructure lifecycle, highlighting key focal points across the African continent and demonstrating our pan-African reach.
              </p>
            </div>
            <div className="w-full bg-[#112036]/50 p-4 md:p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm hover:border-[#c9a84c]/30 transition-colors duration-500">
              <img 
                src="https://horizons-cdn.hostinger.com/02be81db-dbc5-44e9-9552-e26b6e734eb6/030e0a8f2ccc8899bbf3a69079a46363.png" 
                alt="7-stage infrastructure lifecycle with Africa map" 
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </motion.div>

          {/* Diagram 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Our Strategic Approach
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Our circular process diagram illustrates the continuous, integrated workflow that drives successful project delivery and fosters strong partnerships.
              </p>
            </div>
            <div className="w-full bg-[#112036]/50 p-4 md:p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm hover:border-[#c9a84c]/30 transition-colors duration-500">
              <img 
                src="https://horizons-cdn.hostinger.com/02be81db-dbc5-44e9-9552-e26b6e734eb6/70865ee17ca65c62daad1a67bc83bd84.png" 
                alt="Circular process diagram with handshake icon" 
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </motion.div>

          {/* Diagram 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                The Complete Infrastructure Lifecycle
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                A detailed breakdown of our 7-stage process, featuring supporting imagery that captures the essence of each critical phase from origination to operation.
              </p>
            </div>
            <div className="w-full bg-[#112036]/50 p-4 md:p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm hover:border-[#c9a84c]/30 transition-colors duration-500">
              <img 
                src="https://horizons-cdn.hostinger.com/02be81db-dbc5-44e9-9552-e26b6e734eb6/f70f52bacd3ab72cf6cf0d416de59324.png" 
                alt="7-stage process with supporting process images below" 
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </motion.div>

        </section>

        <Footer />
      </div>
    </>
  );
};

export default HowItWorksPage;