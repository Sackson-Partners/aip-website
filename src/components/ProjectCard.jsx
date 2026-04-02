import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, BarChart, ArrowRight, DollarSign, Activity } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
  const [imgError, setImgError] = useState(false);

  // Fallback image if none provided or error
  const fallbackImage = "https://horizons-cdn.hostinger.com/02be81db-dbc5-44e9-9552-e26b6e734eb6/9cd474c237641b769f66d7b88ac4554b.png";

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-[#151a21] rounded-xl overflow-hidden border border-white/5 shadow-lg hover:shadow-[0_10px_30px_rgba(212,176,76,0.1)] hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col h-full cursor-pointer relative"
      onClick={() => onClick && onClick(project)}
    >
      {/* Image Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-gray-900">
        <img
          src={imgError ? fallbackImage : (project.imageUrl || fallbackImage)}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151a21] to-transparent opacity-60" />
        
        {/* Stage Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-3 py-1 bg-[#0b0f14]/90 backdrop-blur-md text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest rounded border border-[#D4AF37]/20 shadow-sm">
            {project.stage}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 font-serif group-hover:text-[#D4AF37] transition-colors line-clamp-2">
          {project.title}
        </h3>
        
        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-400 mb-5">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="truncate">{project.country}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BarChart className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="truncate">{project.sector}</span>
          </div>
          {project.capex && (
             <div className="flex items-center gap-1.5 col-span-2">
               <DollarSign className="w-3.5 h-3.5 text-[#D4AF37]" />
               <span className="truncate font-medium text-gray-300">{project.capex}</span>
             </div>
          )}
        </div>

        {/* Summary */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3 flex-grow">
          {project.summary || "No description available for this project. Contact us for more details."}
        </p>

        {/* Footer Action */}
        <div className="pt-4 border-t border-white/5 mt-auto flex items-center justify-between">
          <span className="text-xs font-bold text-white group-hover:text-[#D4AF37] flex items-center gap-2 transition-colors uppercase tracking-wider">
            View Opportunity <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;