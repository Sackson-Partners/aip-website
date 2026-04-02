import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { X, MapPin, DollarSign, TrendingUp, Clock, Building2, ShieldCheck, FileText, AlertTriangle } from 'lucide-react';
import VerificationBadge from '@/components/VerificationBadge';

const ProjectDetailsModal = ({ project, onClose }) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const handleExpressInterest = () => {
    toast({
      title: "Interest Expressed",
      description: "The project owner will be notified of your interest",
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-secondary rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl custom-scrollbar"
        >
          {/* Header Image */}
          <div className="relative h-72">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent"></div>
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-black/40 backdrop-blur-md rounded-full hover:bg-white/10 transition-colors border border-white/10"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <div className="absolute bottom-6 left-8 right-8">
                <div className="flex items-center gap-3 mb-2">
                     <span className="px-3 py-1 bg-accent text-primary text-xs font-bold uppercase tracking-wider rounded-sm">
                        {project.sector}
                     </span>
                     <VerificationBadge status={project.verificationStatus} className="bg-black/40 border-white/20 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white font-serif">{project.name}</h2>
                <div className="flex items-center gap-2 text-gray-300 mt-2">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 p-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Description */}
                <section>
                    <h3 className="text-xl font-bold text-white mb-4 font-serif border-l-4 border-accent pl-4">Executive Summary</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">{project.description}</p>
                </section>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                     <div className="bg-primary/50 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide mb-2">
                            <DollarSign className="w-4 h-4 text-accent" /> Investment
                        </div>
                        <div className="text-2xl font-bold text-white">${(project.investmentNeeded / 1000000).toFixed(1)}M</div>
                     </div>
                     <div className="bg-primary/50 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide mb-2">
                            <TrendingUp className="w-4 h-4 text-emerald-400" /> Exp. ROI
                        </div>
                        <div className="text-2xl font-bold text-emerald-400">{project.expectedROI}%</div>
                     </div>
                      <div className="bg-primary/50 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide mb-2">
                            <Clock className="w-4 h-4 text-blue-400" /> Timeline
                        </div>
                        <div className="text-2xl font-bold text-white">{project.timeline} Months</div>
                     </div>
                </div>

                {/* Risk Analysis */}
                <section className="bg-primary/30 rounded-xl p-6 border border-white/5">
                     <h3 className="text-xl font-bold text-white mb-4 font-serif flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        Risk Analysis
                     </h3>
                     <div className="flex items-center gap-4 mb-4">
                        <span className="text-gray-400 text-sm">Overall Risk Level:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                            project.riskLevel === 'Low' ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' :
                            project.riskLevel === 'Medium' ? 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10' :
                            'text-red-400 border-red-400/30 bg-red-400/10'
                        }`}>
                            {project.riskLevel || 'Medium'}
                        </span>
                     </div>
                     <p className="text-sm text-gray-400 mb-4">
                        Based on our preliminary assessment, this project carries a {project.riskLevel?.toLowerCase() || 'medium'} risk profile. 
                        Primary risk factors include regulatory changes and currency fluctuation. 
                        Mitigation strategies are in place via insurance and government guarantees.
                     </p>
                </section>

                {/* Verification Details */}
                <section>
                    <h3 className="text-xl font-bold text-white mb-4 font-serif border-l-4 border-accent pl-4">Verification Details</h3>
                    <div className="bg-secondary p-6 rounded-xl border border-white/5">
                        <div className="flex items-start gap-4">
                            <ShieldCheck className="w-8 h-8 text-accent shrink-0" />
                            <div>
                                <h4 className="font-bold text-white">Verified by AIP Due Diligence Team</h4>
                                <p className="text-sm text-gray-400 mt-1">
                                    Full legal and financial audit completed on Oct 12, 2023. Land rights confirmed.
                                </p>
                                <Button variant="link" className="text-accent p-0 h-auto mt-2 flex items-center gap-1">
                                    <FileText className="w-3 h-3" /> View Full Verification Report
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                <div className="bg-primary p-6 rounded-xl border border-white/5 sticky top-6">
                    <h3 className="font-serif font-bold text-white mb-6">Owner Profile</h3>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {project.ownerInfo?.name.charAt(0)}
                        </div>
                        <div>
                            <div className="font-bold text-white">{project.ownerInfo?.name}</div>
                            <div className="text-xs text-gray-500">Member since 2021</div>
                        </div>
                    </div>

                    <div className="space-y-3 mb-8">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Projects Listed</span>
                            <span className="text-white font-medium">12</span>
                        </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Successful Exits</span>
                            <span className="text-white font-medium">4</span>
                        </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Verification Score</span>
                            <span className="text-emerald-400 font-medium">98/100</span>
                        </div>
                    </div>

                    <Button 
                        onClick={handleExpressInterest}
                        className="w-full bg-accent text-primary hover:bg-white hover:text-primary font-bold py-6 rounded-xl shadow-lg shadow-accent/20 mb-3"
                    >
                        Express Interest
                    </Button>
                    <Button 
                        variant="outline"
                        className="w-full border-white/10 text-white hover:bg-white/5 py-6 rounded-xl"
                    >
                        Contact Owner
                    </Button>
                </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;