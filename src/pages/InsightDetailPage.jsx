import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Clock, Calendar, Share2, Tag, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const InsightDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('insights_posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Article not found or unavailable.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  // Simple renderer for content since we can't use 'marked'
  const renderContent = (content) => {
    if (!content) return null;
    
    // Split by double newline to get paragraphs
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((para, idx) => {
      // Basic Header parsing (###, ##)
      if (para.startsWith('### ')) {
        return <h3 key={idx} className="text-xl font-bold text-white mt-8 mb-4 font-serif">{para.replace('### ', '')}</h3>;
      }
      if (para.startsWith('## ')) {
        return <h2 key={idx} className="text-2xl md:text-3xl font-bold text-[#d4b04c] mt-10 mb-6 font-serif border-b border-white/10 pb-2">{para.replace('## ', '')}</h2>;
      }
      
      // Basic List parsing
      if (para.includes('\n- ')) {
          const listItems = para.split('\n- ');
          // First part is potentially introductory text
          return (
             <div key={idx} className="mb-6">
                {listItems[0] && <p className="text-gray-300 leading-relaxed mb-2">{listItems[0]}</p>}
                <ul className="space-y-2 ml-4">
                   {listItems.slice(1).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300">
                         <span className="w-1.5 h-1.5 rounded-full bg-[#d4b04c] mt-2 shrink-0"></span>
                         {item}
                      </li>
                   ))}
                </ul>
             </div>
          );
      }

      // Default paragraph
      return <p key={idx} className="text-lg text-gray-300 leading-relaxed mb-6 font-light">{para}</p>;
    });
  };

  if (loading) {
    return (
      <div className="bg-[#0b0f14] min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#d4b04c] animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-[#0b0f14] min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-serif mb-4">404</h1>
        <p className="text-gray-400 mb-8">{error || "Article not found"}</p>
        <Button onClick={() => navigate('/insights')} variant="outline" className="border-[#d4b04c] text-[#d4b04c] hover:bg-[#d4b04c] hover:text-[#0b0f14]">
           <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0f14] min-h-screen text-gray-200">
      <Helmet>
        <title>{post.title} | AIP Insights</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      
      <Navigation />

      <article className="pt-24 pb-20">
        {/* Header Image & Title */}
        <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
           <img 
             src={post.cover_image_url} 
             alt={post.title} 
             className="w-full h-full object-cover"
             onError={(e) => { e.target.src = "https://horizons-cdn.hostinger.com/02be81db-dbc5-44e9-9552-e26b6e734eb6/9cd474c237641b769f66d7b88ac4554b.png"; }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14] via-[#0b0f14]/80 to-transparent" />
           
           <div className="absolute inset-0 flex flex-col justify-end pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
              <Link to="/insights" className="inline-flex items-center text-[#d4b04c] hover:text-white transition-colors mb-6 font-medium">
                 <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
              </Link>
              
              <div className="flex flex-wrap gap-4 mb-6">
                 <span className="px-3 py-1 bg-[#d4b04c] text-[#0b0f14] text-xs font-bold rounded uppercase tracking-widest">
                    {post.sector?.replace('_', ' ')}
                 </span>
                 <span className="px-3 py-1 bg-white/10 text-white border border-white/10 text-xs font-bold rounded uppercase tracking-widest">
                    {post.type?.replace('_', ' ')}
                 </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif leading-tight mb-6">
                 {post.title}
              </h1>

              <div className="flex items-center gap-6 text-sm text-gray-400 font-medium border-t border-white/10 pt-6">
                 <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.duration_minutes} min {post.format}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Content Body */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto mt-12">
           <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-white prose-p:text-gray-300 prose-a:text-[#d4b04c] prose-li:text-gray-300">
              <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed mb-10 border-l-4 border-[#d4b04c] pl-6 italic">
                 {post.excerpt}
              </p>
              
              {/* Custom Renderer */}
              {renderContent(post.content)}
           </div>

           {/* Share / Footer of Article */}
           <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
              <div className="text-gray-500 text-sm">
                 Posted in <span className="text-[#d4b04c]">{post.sector}</span>
              </div>
              <Button variant="ghost" className="text-gray-400 hover:text-white gap-2">
                 <Share2 className="w-4 h-4" /> Share Analysis
              </Button>
           </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default InsightDetailPage;