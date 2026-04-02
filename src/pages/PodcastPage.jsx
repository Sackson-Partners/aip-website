import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Clock, Calendar, ChevronLeft, Mic2, Download, Share2, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import PodcastEpisodePlayer from '@/components/PodcastEpisodePlayer';
import { aipApi } from '@/lib/aipApi';
import { useLanguage } from '@/contexts/LanguageContext';

const PodcastPage = () => {
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchPodcastData = async () => {
      try {
        setLoading(true);
        const showData = await aipApi.fetchPrimaryPodcastShow();
        setShow(showData);

        const episodesData = await aipApi.fetchPodcastEpisodes(showData?.id);
        setEpisodes(episodesData);

      } catch (err) {
        console.error('Error loading podcast data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastData();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t.podcast.metaTitle}</title>
        <meta name="description" content={t.podcast.metaDesc} />
      </Helmet>

      <div className="min-h-screen bg-[#0F1419] font-sans text-gray-300 selection:bg-[#D4AF37] selection:text-[#0F1419]">
        <Navigation />

        <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Link to="/insights" className="inline-flex items-center text-gray-400 hover:text-[#D4AF37] mb-8 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-2" /> {t.podcast.backToInsights}
          </Link>

          {/* Hero */}
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16 border-b border-white/10 pb-16">
            <div className="w-full md:w-1/3">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#1a1f2e] to-[#0F1419] border border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.1]"></div>
                 {show?.cover_image_url ? (
                    <img src={show.cover_image_url} alt={show.title} className="w-full h-full object-cover relative z-10" />
                 ) : (
                    <div className="text-center relative z-10">
                      <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#D4AF37]/20">
                        <Mic2 className="w-10 h-10 text-[#0F1419]" />
                      </div>
                      <h1 className="text-3xl font-serif font-bold text-white mb-2">{show?.title || t.podcast.defaultTitle}</h1>
                      <p className="text-[#D4AF37] font-medium uppercase tracking-widest text-sm">{t.podcast.originalSeries}</p>
                    </div>
                 )}
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                {show?.title || t.podcast.defaultTitle}
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                {show?.description || t.podcast.defaultDesc}
              </p>
              <div className="flex gap-4">
                 {episodes.length > 0 && (
                   <Button 
                    onClick={() => setCurrentEpisode(episodes[0])}
                    className="bg-[#D4AF37] text-[#0F1419] hover:bg-white font-bold"
                   >
                      <Play className="w-4 h-4 mr-2" /> {t.podcast.latestEpisode}
                   </Button>
                 )}
                 <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    {t.podcast.subscribeSpotify}
                 </Button>
              </div>
            </div>
          </div>

          {/* Episodes */}
          <div className="space-y-6 mb-20">
            <h3 className="text-2xl font-serif font-bold text-white mb-8">{t.podcast.recentEpisodes}</h3>
            
            {loading ? (
              <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" /></div>
            ) : episodes.length > 0 ? (
              episodes.map((ep) => (
                <motion.div 
                  key={ep.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-[#151a21] border border-white/5 rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:border-[#D4AF37]/30 transition-all group"
                >
                  <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0 relative bg-gray-800">
                    {ep.cover_image_url || show?.cover_image_url ? (
                      <img src={ep.cover_image_url || show?.cover_image_url} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><Mic2 className="text-gray-600" /></div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => setCurrentEpisode(ep)}>
                      <Play className="w-10 h-10 text-white fill-current" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                      {ep.published_at && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(ep.published_at).toLocaleDateString()}</span>}
                      {ep.duration_seconds && <span className="flex items-center gap-1 text-[#D4AF37]"><Clock className="w-3 h-3" /> {Math.floor(ep.duration_seconds / 60)} {t.podcast.min}</span>}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors cursor-pointer" onClick={() => setCurrentEpisode(ep)}>{ep.title}</h4>
                    {ep.guest_name && <p className="text-sm text-[#D4AF37] font-medium mb-3">ft. {ep.guest_name}</p>}
                    <p className="text-gray-400 text-sm line-clamp-2">{ep.description}</p>
                  </div>
                  <div className="flex md:flex-col gap-2 justify-center shrink-0">
                    <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white" onClick={() => setCurrentEpisode(ep)}>
                      <Play className="w-5 h-5" />
                    </Button>
                     <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white">
                      <Download className="w-5 h-5" />
                    </Button>
                     <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 bg-[#151a21] rounded-xl border border-white/5">
                <AlertCircle className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">{t.podcast.noEpisodes}</p>
              </div>
            )}
          </div>
        </div>

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

export default PodcastPage;