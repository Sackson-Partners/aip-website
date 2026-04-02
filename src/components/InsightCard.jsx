import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, BookOpen, Headphones, ImageOff } from 'lucide-react';

const InsightCard = ({ post }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Default fallback image if the URL fails
  const fallbackImage = "https://horizons-cdn.hostinger.com/02be81db-dbc5-44e9-9552-e26b6e734eb6/6c0ff3541e8c583318e7d52206997455.png";
  
  // Determine link target based on post type (for flexibility, though user asked for /blog/:slug mainly)
  // Assuming all text articles go to /blog/:slug and podcasts might go somewhere else or same place
  const linkTarget = `/blog/${post.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group bg-[#151a21] rounded-xl overflow-hidden border border-white/5 shadow-lg hover:shadow-[0_0_30px_rgba(212,176,76,0.1)] hover:border-[#d4b04c]/30 transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
    >
      {/* 16:9 Aspect Ratio Image Container */}
      <Link to={linkTarget} className="block relative aspect-video overflow-hidden bg-gray-900">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a2029]">
             <div className="w-8 h-8 rounded-full border-2 border-[#d4b04c] border-t-transparent animate-spin"></div>
          </div>
        )}
        
        <img 
          src={imgError ? fallbackImage : (post.cover_image_url || fallbackImage)} 
          alt={post.title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${!imgLoaded ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImgError(true);
            setImgLoaded(true);
          }}
        />
        
        {/* Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1620] via-transparent to-transparent opacity-60" />
        
        {imgError && imgLoaded && (
           <div className="absolute inset-0 flex items-center justify-center bg-[#1a2029] text-gray-600">
              <ImageOff className="w-8 h-8" />
           </div>
        )}

        {/* Floating Sector Tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-2 py-1 bg-[#0b0f14]/80 backdrop-blur-md text-[#d4b04c] text-[10px] font-bold uppercase tracking-widest rounded border border-[#d4b04c]/20 shadow-lg">
            {post.sector || 'INSIGHTS'}
          </span>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow relative">
        <div className="mb-3 flex items-center gap-2 text-xs text-gray-500 font-medium">
          <span className="text-[#d4b04c] uppercase tracking-wider">{post.type || 'Article'}</span>
          <span className="w-1 h-1 rounded-full bg-gray-600"></span>
          <span>{post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Recently'}</span>
        </div>

        <Link to={linkTarget} className="block mb-3 group-hover:text-[#d4b04c] transition-colors duration-300">
          <h3 className="text-xl font-bold text-white leading-tight font-serif line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-6 flex-grow">
          {post.excerpt || "Click to read the full analysis on this topic."}
        </p>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            {post.format === 'listen' ? <Headphones className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
            <span>{post.duration_minutes || 5} min read</span>
          </div>
          
          <Link 
            to={linkTarget} 
            className="text-xs font-bold text-white bg-white/5 hover:bg-[#d4b04c] hover:text-[#0b0f14] px-3 py-2 rounded transition-all duration-300 flex items-center gap-2 group-hover:shadow-[0_0_15px_rgba(212,176,76,0.3)]"
          >
            Read Article <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default InsightCard;