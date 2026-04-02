import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SectorCard = ({ sector }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      className="group relative bg-[#1a1f2e] rounded-xl overflow-hidden border border-[#D4AF37]/20 shadow-lg hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden shrink-0">
        <img
          src={sector.image}
          alt={sector.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] via-[#1a1f2e]/40 to-transparent" />
        
        {/* Sector Icon */}
        <div className="absolute top-4 right-4 bg-[#1a1f2e]/80 backdrop-blur-md p-2 rounded-lg border border-[#D4AF37]/30">
          <sector.icon className="w-6 h-6 text-[#D4AF37]" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white mb-2 font-serif group-hover:text-[#D4AF37] transition-colors">
          {sector.name}
        </h3>
        
        <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
          {sector.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-white/5">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Market Size</div>
            <div className="text-lg font-bold text-[#D4AF37]">{sector.marketSize}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Projects</div>
            <div className="text-lg font-bold text-white flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              {sector.projectCount}
            </div>
          </div>
        </div>

        {/* Growth Drivers */}
        <div className="mb-6">
          <div className="text-xs font-bold text-white uppercase tracking-wide mb-2">Key Drivers</div>
          <ul className="space-y-1">
            {sector.drivers.map((driver, i) => (
              <li key={i} className="text-xs text-gray-400 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                {driver}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-auto">
          <Button className="bg-[#D4AF37] text-[#1a1f2e] hover:bg-white hover:text-[#1a1f2e] font-bold text-xs sm:text-sm">
            Explore
          </Button>
          <Button variant="outline" className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs sm:text-sm">
            View Deals
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SectorCard;