import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PartnershipSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#C9A23A] rounded-2xl p-8 md:p-16 relative overflow-hidden shadow-2xl"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Side: Content */}
          <div className="max-w-2xl text-center md:text-left flex-1 space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0F1419] leading-tight">
              Partner with AIP Insights
            </h2>
            <p className="text-lg md:text-xl text-[#0F1419] font-medium leading-relaxed">
              Gain access to exclusive market briefs, leverage our analyst network for custom research, or contribute your expertise to our platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Button 
                onClick={() => navigate('/insights')}
                className="bg-white text-[#0F1419] hover:bg-gray-50 hover:text-black font-bold text-lg px-8 py-7 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-transparent"
              >
                Access Insights
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Right Side: Circular Statistic */}
          <div className="relative flex-shrink-0 mt-8 md:mt-0">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-[220px] h-[220px] md:w-[250px] md:h-[250px] rounded-full border-[3px] border-[#0F1419]/10 flex flex-col items-center justify-center text-center bg-[#C9A23A] shadow-xl relative z-10"
            >
              <span className="text-5xl md:text-6xl font-serif font-bold text-[#0F1419] mb-2">15k+</span>
              <span className="text-sm font-bold tracking-widest uppercase text-[#0F1419]/80">Subscribers</span>
            </motion.div>
            
            {/* Decorative concentric circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-[#0F1419]/5 z-0 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-[#0F1419]/5 z-0 pointer-events-none" />
          </div>
          
        </div>
      </motion.div>
    </section>
  );
};

export default PartnershipSection;