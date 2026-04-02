import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, Loader2, AlertCircle } from 'lucide-react';
import { marked } from 'marked';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { ScrollToTop } from '@/components/ScrollToTop';

const BlogArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Mock data for fallback or development testing
  const mockArticles = [
    {
      id: 'mock-1',
      title: 'Côte d\'Ivoire: New Energy Framework Unlocks Solar Potential',
      slug: 'cote-divoire-energy-framework',
      content: `
The Ivorian government has recently unveiled a comprehensive new regulatory framework aimed at accelerating the deployment of renewable energy projects across the country. This strategic move is expected to attract significant Foreign Direct Investment (FDI) into the solar sector, targeting a 42% renewable mix by 2030.

### Key Highlights of the Framework
The new legislation introduces tax incentives for solar equipment imports, streamlined licensing procedures for independent power producers (IPPs), and guaranteed offtake agreements for projects exceeding 25MW. These measures address long-standing concerns regarding regulatory uncertainty and bankability.

Industry experts predict this could catalyze over $500 million in new investments over the next 24 months, with several major international developers already expressing interest in utility-scale projects in the northern regions of the country.

### Impact on Regional Energy Security
Beyond domestic needs, Côte d'Ivoire is positioning itself as a key exporter of electricity within the West African Power Pool (WAPP). Increased solar capacity will free up natural gas resources for other industrial uses and stabilize the regional grid.
      `,
      excerpt: 'How recent regulatory changes are accelerating renewable energy projects and attracting foreign direct investment in the Ivorian power sector.',
      category: 'Analytics',
      country: 'Côte d\'Ivoire',
      created_at: new Date().toISOString(),
      cover_image_url: 'https://images.unsplash.com/photo-1542367787-4baf35f3037d?auto=format&fit=crop&q=80&w=2000',
      author: 'AIP Research Team',
      read_time_min: 6
    },
    {
      id: 'mock-4',
      title: 'Senegal\'s Gas-to-Power transition',
      slug: 'senegal-gas-to-power',
      content: `
Senegal is on the verge of a transformative energy shift as it prepares to integrate its significant offshore gas reserves into the domestic power grid. This gas-to-power transition represents a cornerstone of the country's strategy to achieve universal electricity access and reduce energy costs for industrial consumers.

### The Role of GTA and Sangomar
With the Grand Tortue Ahmeyim (GTA) and Sangomar fields coming online, Senegal is set to become a major gas producer. The government's gas-to-power strategy focuses on converting existing heavy fuel oil plants to gas and building new combined-cycle gas turbine (CCGT) plants.

This shift is expected to lower the cost of electricity generation by approximately 30-40%, making Senegalese industries more competitive regionally and globally. It also aligns with the country's decarbonization goals by displacing more carbon-intensive liquid fuels.

### Infrastructure Challenges and Opportunities
Developing the necessary pipeline infrastructure to transport gas from offshore fields to onshore power plants remains a critical challenge. However, this also presents significant opportunities for EPC contractors and investors in the midstream sector.
      `,
      excerpt: 'Strategic analysis of Senegal\'s energy sovereignty roadmap leveraging offshore gas reserves for domestic power generation.',
      category: 'Analytics',
      country: 'Senegal',
      created_at: new Date(Date.now() - 259200000).toISOString(),
      cover_image_url: 'https://horizons-cdn.hostinger.com/02be81db-dbc5-44e9-9552-e26b6e734eb6/3e981e14ef0fbbf98a18edc09bf93889.png',
      author: 'AIP Energy Desk',
      read_time_min: 8
    }
  ];

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(false);

        // Try to fetch from DB
        const { data, error: dbError } = await supabase
          .from('insights_posts')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (dbError && dbError.code !== 'PGRST116') {
          throw dbError;
        }

        if (data) {
          setArticle(data);
        } else {
          // Fallback to mock data if DB empty or not found (for dev purposes)
          const mockArticle = mockArticles.find(a => a.slug === slug);
          if (mockArticle) {
            setArticle(mockArticle);
          } else {
            setError(true);
          }
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-[#C9A23A] animate-spin" />
            <p className="text-gray-400">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center bg-[#242936] p-8 rounded-xl border border-white/5 shadow-2xl">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-serif font-bold text-white mb-4">Article Not Found</h1>
            <p className="text-gray-400 mb-8">
              We couldn't find the article you're looking for. It may have been removed or the link might be incorrect.
            </p>
            <Button 
              onClick={() => navigate('/insights')}
              className="bg-[#C9A23A] text-[#111111] hover:bg-[#b08d32] font-bold px-8 py-3 rounded-full"
            >
              Back to Insights
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const rawContent = article.content || article.content_md || `<p>${article.excerpt}</p>`;
  const isMarkdown = rawContent.includes('## ') || rawContent.includes('### ') || rawContent.includes('**');
  const htmlContent = isMarkdown ? marked.parse(rawContent) : rawContent;

  return (
    <div className="min-h-screen bg-[#1a1a1a] font-sans text-gray-300 selection:bg-[#C9A23A] selection:text-[#1a1a1a]">
      <Helmet>
        <title>{article.title} | AIP Insights</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>
      
      <ScrollToTop />
      <Navigation />

      <main className="pt-20 pb-24">
        {/* Back Link */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8 pt-8">
          <Link 
            to="/insights" 
            className="inline-flex items-center text-gray-400 hover:text-[#C9A23A] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </Link>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-6 flex flex-wrap gap-3">
             {article.country && (
               <span className="bg-[#242936] text-gray-300 border border-white/10 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                 {article.country}
               </span>
             )}
             <span className="bg-[#C9A23A] text-[#111111] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
               {article.category || 'Analysis'}
             </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-gray-400 leading-relaxed mb-8 font-light border-l-4 border-[#C9A23A] pl-6">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-t border-white/10 mb-10">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-8 h-8 rounded-full bg-[#C9A23A] flex items-center justify-center text-[#111111]">
                  <User className="w-4 h-4" />
                </div>
                <span className="font-medium text-white">{article.author || 'AIP Editorial'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{article.read_time_min || 5} min read</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
               <span className="text-sm text-gray-500 mr-2">Share:</span>
               <button className="p-2 bg-[#242936] rounded-full hover:bg-[#C9A23A] hover:text-[#111111] transition-colors text-gray-400">
                  <Linkedin className="w-4 h-4" />
               </button>
               <button className="p-2 bg-[#242936] rounded-full hover:bg-[#C9A23A] hover:text-[#111111] transition-colors text-gray-400">
                  <Twitter className="w-4 h-4" />
               </button>
               <button className="p-2 bg-[#242936] rounded-full hover:bg-[#C9A23A] hover:text-[#111111] transition-colors text-gray-400">
                  <Facebook className="w-4 h-4" />
               </button>
               <button className="p-2 bg-[#242936] rounded-full hover:bg-[#C9A23A] hover:text-[#111111] transition-colors text-gray-400">
                  <Share2 className="w-4 h-4" />
               </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl relative aspect-video bg-gray-900">
            <img 
              src={article.cover_image_url || "https://horizons-cdn.hostinger.com/02be81db-dbc5-44e9-9552-e26b6e734eb6/6c0ff3541e8c583318e7d52206997455.png"} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-20"></div>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg prose-invert max-w-none 
              prose-headings:font-serif prose-headings:text-white prose-headings:font-bold
              prose-p:text-gray-300 prose-p:leading-8
              prose-a:text-[#C9A23A] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-blockquote:border-l-[#C9A23A] prose-blockquote:bg-[#242936]/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
              prose-img:rounded-xl prose-img:shadow-lg
              prose-li:text-gray-300"
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
          
          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, idx) => (
                  <span key={idx} className="bg-[#242936] hover:bg-[#323846] text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors cursor-default">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogArticlePage;