import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, MapPin, Lock, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EDGE_FN = 'https://evpbetmgmhwhhhgwvnfb.supabase.co/functions/v1';

const ProjectDetailModal = ({ projectId, initialProject, onClose }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!projectId) return;
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${EDGE_FN}/aip-project?id=${encodeURIComponent(projectId)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error('Error fetching project details:', err);
        setError('Unable to load project details at this time.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [projectId]);

  // Merge API data with initial card data for resilient display
  const title = project?.title || initialProject?.title || '';
  const country = project?.country || initialProject?.country || '';
  const stage = project?.stage || initialProject?.stage || '';
  const sectorRaw = project?.sector_raw || initialProject?.sector_raw || initialProject?.sector || '';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#0d1117] border border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 md:p-8">
            {loading && !initialProject ? (
              /* Full loading state (no initial data) */
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
                <p className="text-white/60 text-sm">Loading project details...</p>
              </div>
            ) : error && !title ? (
              /* Error state */
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <p className="text-red-400 text-center">{error}</p>
                <button onClick={onClose} className="text-white/60 hover:text-white text-sm underline">
                  Close
                </button>
              </div>
            ) : (
              /* Project content */
              <>
                {/* Header */}
                <div className="mb-6 pr-10">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    {stage && (
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full uppercase tracking-wide">
                        {stage}
                      </span>
                    )}
                    {sectorRaw && (
                      <span className="px-3 py-1 bg-white/10 text-white/80 text-xs font-semibold rounded-full uppercase tracking-wide">
                        {sectorRaw}
                      </span>
                    )}
                  </div>
                  {title && (
                    <h2 className="text-2xl font-bold text-white mb-2 leading-snug">{title}</h2>
                  )}
                  {country && (
                    <div className="flex items-center gap-2 text-white/60">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{country}</span>
                    </div>
                  )}
                </div>

                {/* Loading indicator while detail API loads */}
                {loading && (
                  <div className="flex items-center gap-2 mb-4 text-white/40 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Loading full details...</span>
                  </div>
                )}

                {/* Executive Snapshot - always public */}
                <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-4 h-4 text-yellow-400" />
                    <h3 className="text-xs font-bold text-yellow-400/80 uppercase tracking-widest">Executive Snapshot</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {project?.summary || 'No description available for this project.'}
                  </p>
                </div>

                {/* Gated section - blurred preview + lock overlay */}
                <div className="relative rounded-xl overflow-hidden">
                  {/* Blurred preview content */}
                  <div className="blur-sm select-none pointer-events-none p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-widest mb-2">CAPEX</p>
                      <p className="text-white font-bold text-lg">$•••• M</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Key Highlights</p>
                      <ul className="space-y-1">
                        <li className="text-white/60 text-sm flex items-start gap-2"><TrendingUp className="w-3 h-3 mt-1 flex-shrink-0" /> Strategic location with regional reach</li>
                        <li className="text-white/60 text-sm flex items-start gap-2"><TrendingUp className="w-3 h-3 mt-1 flex-shrink-0" /> Strong offtake potential confirmed</li>
                        <li className="text-white/60 text-sm flex items-start gap-2"><TrendingUp className="w-3 h-3 mt-1 flex-shrink-0" /> Government endorsement secured</li>
                        <li className="text-white/60 text-sm flex items-start gap-2"><TrendingUp className="w-3 h-3 mt-1 flex-shrink-0" /> Regulatory compliance verified</li>
                      </ul>
                    </div>
                  </div>

                  {/* Lock overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/90 rounded-xl p-6 mx-4 text-center border border-yellow-500/20 shadow-xl w-full max-w-sm">
                      <Lock className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                      <h4 className="text-white font-bold text-lg mb-2">Full Details Locked</h4>
                      <p className="text-white/60 text-sm mb-5 leading-relaxed">
                        Access financials, key highlights, risk analysis, and the data room with an approved institutional account.
                      </p>
                      <div className="space-y-3">
                        <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3">
                          <Link to="/request-demo">
                            Request a Demo <ArrowRight className="w-4 h-4 ml-2 inline" />
                          </Link>
                        </Button>
                        <Link
                          to="/login"
                          className="block w-full py-3 px-4 text-center border border-white/30 text-white/80 rounded-md font-semibold text-sm hover:border-white/60 hover:text-white transition-colors"
                        >
                          Login / Get Started
                        </Link>
                        <p className="text-white/40 text-xs">
                          Full data room access requires an approved institutional account.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetailModal;