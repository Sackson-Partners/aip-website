import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Play, Clock, Calendar, AlertCircle, Loader2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PodcastEpisodePlayer from '@/components/PodcastEpisodePlayer';
import { Button } from '@/components/ui/button';
import { aipApi } from '@/lib/aipApi';
import { useLanguage } from '@/contexts/LanguageContext';

const GroundTruthPage = () => {
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
          const showData = await aipApi.fetchPrimaryPodcastShow();
          setShow(showData);
          
          const episodesData = await aipApi.fetchPodcastEpisodes(showData?.id);
          setEpisodes(episodesData);
      } catch (error) {
          console.error("Error loading podcast:", error);
      } finally {
          setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t.groundTruth.metaTitle}</title>
        <meta name="description" content={t.groundTruth.metaDesc} />
      </Helmet>

      <div className="min-h-screen bg-[#000000] font-sans text-gray-300">
        <Navigation />

        {/* Hero */}
        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#000000]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" /></div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                 <div className="w-40 h-40 mx-auto mb-8 rounded-2xl shadow-2xl border-2 border-[#D4AF37]/20 overflow-hidden bg-[#111]">
                     {show?.cover_image_url ? (
                         <img src={show.cover_image_url} alt={show.title} className="w-full h-full object-cover" />
                     ) : (
                         <div className="w-full h-full flex items-center justify-center"><Mic className="w-16 h-16 text-gray-600" /></div>
                     )}
                 </div>
                 <h1 className="text-4xl md:text-6xl font-bold font-serif text-white mb-6">
                   {show?.title || t.groundTruth.defaultTitle}
                 </h1>
                 <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                   {show?.description || t.groundTruth.defaultDesc}
                 </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Episodes List */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
           <h2 className="text-2xl font-bold text-white mb-8 font-serif border-b border-white/10 pb-4">{t.groundTruth.latestEpisodes}</h2>
           
           {loading ? (
             <div className="space-y-4">
               {[1,2,3].map(i => <div key={i} className="h-32 bg-[#151a21] rounded-xl animate-pulse" />)}
             </div>
           ) : episodes.length > 0 ? (
             <div className="space-y-4">
               {episodes.map((ep, idx) => (
                 <motion.div 
                   key={ep.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.05 }}
                   className="bg-[#111111] border border-white/10 hover:border-[#D4AF37]/50 rounded-xl p-6 transition-all duration-300 group flex flex-col sm:flex-row gap-6 items-start sm:items-center"
                 >
                    <div className="relative w-full sm:w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-800">
                        {ep.cover_image_url || show?.cover_image_url ? (
                            <img src={ep.cover_image_url || show?.cover_image_url} alt={ep.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center"><Mic className="text-gray-600" /></div>
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-8 h-8 text-white fill-current" />
                        </div>
                    </div>
                    
                    <div className="flex-grow">
                       <div className="flex items-center gap-3 text-xs text-[#D4AF37] font-bold uppercase tracking-wider mb-2">
                          <span>{t.groundTruth.episode} {ep.episode_number || '#'}</span>
                          {ep.guest_name && <><span>•</span><span>{ep.guest_name}</span></>}
                       </div>
                       <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                           {ep.title}
                       </h3>
                       <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                           {ep.description}
                       </p>
                       <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                           <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {ep.duration_seconds ? Math.floor(ep.duration_seconds / 60) : 45} {t.groundTruth.mins}</span>
                           {ep.published_at && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(ep.published_at).toLocaleDateString()}</span>}
                       </div>
                    </div>

                    <div className="shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
                        <Button 
                          onClick={() => setCurrentEpisode(ep)}
                          className="w-full sm:w-auto bg-[#D4AF37] text-[#000000] hover:bg-white hover:text-[#000000] font-bold"
                        >
                            <Play className="w-4 h-4 mr-2 fill-current" /> {t.groundTruth.playEpisode}
                        </Button>
                    </div>
                 </motion.div>
               ))}
             </div>
           ) : (
             <div className="text-center py-12 bg-[#111111] rounded-xl border border-white/5">
                <AlertCircle className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">{t.groundTruth.noEpisodes}</p>
             </div>
           )}
        </section>

        <AnimatePresence>
            {currentEpisode && (
                <PodcastEpisodePlayer 
                   episode={currentEpisode} 
                   onClose={() => setCurrentEpisode(null)} 
                />
            )}
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
};

export default GroundTruthPage;