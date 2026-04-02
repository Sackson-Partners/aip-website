import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, AlertTriangle, Building2, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VerificationBadge from '@/components/VerificationBadge';
import ProjectBankabilityCard from '@/components/ProjectBankabilityCard';

const PremiumProjectCard = ({ project, onClick }) => {
  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  // Mock score if not present
  const bankabilityScore = project.bankabilityScore || Math.floor(Math.random() * 40) + 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="group relative bg-secondary rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden shrink-0">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-80" />
        
        {/* Verification Badge Overlay */}
        <div className="absolute top-4 right-4">
          <VerificationBadge status={project.verificationStatus} className="bg-primary/80 backdrop-blur-md border-accent/50 shadow-lg" />
        </div>

        {/* Sector Tag */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-primary/80 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/10">
            {project.sector}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 font-serif group-hover:text-accent transition-colors line-clamp-1">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <MapPin className="w-4 h-4" />
              {project.location}
            </div>
          </div>
        </div>

        {/* Bankability Compact Card */}
        <div className="mb-4">
            <ProjectBankabilityCard score={bankabilityScore} compact={true} />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-white/5">
          <div>
            <div className="text-xs text-gray-400 mb-1">Investment Needed</div>
            <div className="text-lg font-bold text-accent">
              ${(project.investmentNeeded / 1000000).toFixed(1)}M
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Expected ROI</div>
            <div className="text-lg font-bold text-white flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              {project.expectedROI}%
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(project.riskLevel || 'Medium')}`}>
                Risk: {project.riskLevel || 'Medium'}
            </div>
            
            <Button 
                onClick={() => onClick(project)}
                className="bg-accent text-primary hover:bg-white hover:text-primary transition-colors font-medium"
            >
                View Details
            </Button>
        </div>
        
        {/* Owner Info - subtle */}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
            <Building2 className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-500 truncate">{project.ownerInfo?.name || 'Verified Owner'}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumProjectCard;