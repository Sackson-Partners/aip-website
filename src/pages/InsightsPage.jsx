import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, ChevronRight, Play, Mic2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { aipApi } from '@/lib/aipApi';
import { useFormModal } from '@/contexts/FormModalContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';
import GroundTruthPodcastHero from '@/components/GroundTruthPodcastHero';
import NewsletterSignup from '@/components/NewsletterSignup';

const InsightsPage = () => {
  const { openModal } = useFormModal();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [podcastEpisodes, setPodcastEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockArticles = [
    {
      id: 'mock-1',
      title: 'Côte d\'Ivoire: New Energy Framework Unlocks Solar Potential',
      slug: 'cote-divoire-energy-framework',
      excerpt: 'How recent regulatory changes are accelerating renewable energy projects and attracting foreign direct investment in the Ivorian power sector.',
      category: 'Analytics',
      country: 'Côte d\'Ivoire',
      created_at: new Date().toISOString(),
      cover_image_url: 'https://images.unsplash.com/photo-1542367787-4baf35f3037d?auto=format&fit=crop&q=80&w=2000',
      is_featured: true
    },
    {
      id: 'mock-2',
      title: 'Guinea: Simandou Infrastructure Corridor Update',
      slug: 'guinea-simandou-update',
      excerpt: 'Strategic analysis of the rail and port developments supporting the world\'s largest untapped iron ore deposit.',
      category: 'Report',
      country: 'Guinea',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      cover_image_url: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'mock-3',
      title: 'Ghana: Digital Infrastructure Expansion Plans',
      slug: 'ghana-digital-infrastructure',
      excerpt: 'Accra\'s ambitious roadmap to become West Africa\'s digital hub through new data center zones and fiber connectivity.',
      category: 'Podcast',
      country: 'Ghana',
      created_at: new Date(Date.now() - 172800000).toISOString(),
      cover_image_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'mock-4',
      title: 'Senegal\'s Gas-to-Power transition',
      slug: 'senegal-gas-to-power',
      excerpt: 'Strategic analysis of Senegal\'s energy sovereignty roadmap leveraging offshore gas reserves for domestic power generation.',
      category: 'Analytics',
      country: 'Senegal',
      created_at: new Date(Date.now() - 259200000).toISOString(),
      cover_image_url: 'https://horizons-cdn.hostinger.com/02be81db-dbc5-44e9-9552-e26b6e734eb6/5cf22ef4851677fcf92c2435bc113dac.png'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const articlesData = await aipApi.fetchInsights(4);

        if (articlesData && articlesData.length >= 4) {
          setArticles(articlesData);
        } else {
          setArticles(mockArticles);
        }

        const podcastsData = await aipApi.fetchPodcastEpisodes(null, 3);
        setPodcastEpisodes(podcastsData);
      } catch (err) {
        console.error("Error fetching content:", err);
        setArticles(mockArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const featuredArticle = articles[0];
  const topStories = articles.slice(1, 4);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-[#C9A23A] selection:text-white">
      <Helmet>
        <title>{t.insights.metaTitle}</title>
        <meta name="description" content={t.insights.metaDesc} />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 font-serif tracking-tight">
            <span className="text-[#111111]">{t.insights.title1}</span> <span className="text-[#C9A23A]">{t.insights.title2}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#111111]/80 mb-10 font-light max-w-3xl leading-relaxed">
            {t.insights.subtitle}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-10">
            <Button 
              onClick={() => openModal('subscribeForAccess')}
              className="bg-[#111111] text-white hover:bg-[#333] hover:text-white font-bold text-lg px-8 py-6 rounded-full transition-all"
            >
              {t.insights.subscribe}
            </Button>
            <Button 
              onClick={() => openModal('requestCustomBrief')}
              className="bg-[#111111] text-white hover:bg-[#333] hover:text-white font-bold text-lg px-8 py-6 rounded-full transition-all"
            >
              {t.insights.requestCustomBrief}
            </Button>
          </div>
        </motion.div>
        
        {/* Ground Truth Podcast Hero */}
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1, duration: 0.5 }}
        >
           <GroundTruthPodcastHero />
        </motion.div>

        <div className="w-full h-[1px] bg-[#E5E7EB] mt-8" />
      </section>

      {/* Main Content Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Featured Article (Left - 2/3) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 group cursor-pointer relative"
          >
            {loading ? (
               <div className="w-full h-[600px] bg-gray-100 animate-pulse rounded-xl" />
            ) : featuredArticle && (
              <div className="relative h-[600px] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                <Link to={`/blog/${featuredArticle.slug}`} className="block h-full w-full">
                  <img 
                    src={featuredArticle.cover_image_url || "https://horizons-cdn.hostinger.com/02be81db-dbc5-44e9-9552-e26b6e734eb6/6c0ff3541e8c583318e7d52206997455.png"} 
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                    <div className="flex items-center gap-3 mb-4">
                       <span className="bg-[#C9A23A] text-[#111111] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                         {featuredArticle.category || t.insights.featuredCategory}
                       </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight group-hover:text-[#C9A23A] transition-colors">
                      {featuredArticle.title}
                    </h2>
                    
                    <p className="text-lg text-gray-300 line-clamp-2 max-w-2xl mb-6 font-light">
                      {featuredArticle.excerpt}
                    </p>
                    
                    <div className="flex items-center text-white/70 text-sm font-medium group-hover:text-white transition-colors">
                      <span>{t.insights.readFullAnalysis}</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </motion.div>

          {/* Top Stories List (Right - 1/3) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8 border-b-2 border-[#C9A23A] pb-2">
              <h3 className="text-2xl font-serif font-bold text-[#111111]">{t.insights.topStories}</h3>
            </div>

            <div className="space-y-8">
              {loading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-gray-50 animate-pulse rounded-lg" />
                ))
              ) : topStories.map((story, idx) => (
                <Link to={`/blog/${story.slug}`} key={story.id || idx} className="block group">
                  <div className="flex flex-col gap-3 pb-8 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors p-2 rounded-lg -mx-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#C9A23A] text-[#111111] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                        {story.category || story.country || 'Update'}
                      </span>
                      <div className="flex items-center text-gray-400 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{new Date(story.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <h4 className="text-xl font-serif font-bold text-[#111111] leading-snug group-hover:text-[#C9A23A] transition-colors">
                      {story.title}
                    </h4>

                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                      {story.excerpt}
                    </p>
                    
                    <div className="flex items-center text-[#C9A23A] text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300 mt-1">
                       {t.insights.readMore} <ChevronRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ground Truth Podcast Episodes Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 rounded-3xl mb-24">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-[#C9A23A] font-bold tracking-widest uppercase text-sm mb-4">
            <Mic2 className="w-4 h-4" />
            <span>{t.insights.podcastEpisodes}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#111111] mb-6">
            {t.insights.latestConversations}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t.insights.podcastDesc}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : podcastEpisodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {podcastEpisodes.map((episode) => (
              <div key={episode.id} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={episode.cover_image_url || "https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?auto=format&fit=crop&q=80&w=800"} 
                    alt={episode.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4">
                     <div className="bg-[#C9A23A] text-[#111111] text-xs font-bold px-3 py-1 rounded-full w-fit mb-2 flex items-center gap-1">
                        <Play className="w-3 h-3 fill-current" />
                        {t.insights.listenNow}
                     </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#111111] group-hover:text-[#C9A23A] transition-colors line-clamp-2">
                      {episode.title}
                    </h3>
                  </div>
                  {episode.guest_line && (
                    <p className="text-[#C9A23A] font-medium text-sm mb-3">
                       w/ {episode.guest_line}
                    </p>
                  )}
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {episode.description || episode.excerpt}
                  </p>
                  <div className="flex items-center text-gray-400 text-xs font-medium pt-4 border-t border-gray-100">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{episode.duration_minutes || 45} {t.insights.mins}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(episode.published_at || episode.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
           <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
             <p className="text-gray-500">{t.insights.noEpisodes}</p>
           </div>
        )}

        <div className="flex justify-center mt-12">
          <Button 
            onClick={() => navigate('/podcast')}
            className="bg-[#111111] text-white hover:bg-[#C9A23A] hover:text-[#111111] font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 shadow-lg"
          >
            {t.insights.viewAllEpisodes}
          </Button>
        </div>
      </section>

      <NewsletterSignup />

      <Footer />
    </div>
  );
};

export default InsightsPage;