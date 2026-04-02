import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

const FeaturedStory = ({ story }) => {
  if (!story) return null;

  return (
    <div className="h-full">
      <Link to={`/insight/${story.slug}`} className="block h-full group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
        <div className="absolute inset-0 bg-gray-900/40 z-10 transition-colors group-hover:bg-gray-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14] via-[#0b0f14]/60 to-transparent z-10" />
        
        <img 
          src={story.cover_image_url} 
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { e.target.src = "https://horizons-cdn.hostinger.com/02be81db-dbc5-44e9-9552-e26b6e734eb6/9cd474c237641b769f66d7b88ac4554b.png"; }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 flex flex-col justify-end h-full">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-[#d4b04c] text-[#0b0f14] text-xs font-bold tracking-widest uppercase rounded">
               {story.sector ? story.sector.replace('_', ' ') : 'FEATURED'}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-serif leading-tight group-hover:text-[#d4b04c] transition-colors">
            {story.title}
          </h2>
          
          <p className="text-gray-300 text-lg mb-6 line-clamp-2 md:line-clamp-3 max-w-2xl font-light">
            {story.excerpt}
          </p>
          
          <div className="flex items-center gap-4 text-sm font-medium text-white/80">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d4b04c]" />
              <span>{story.duration_minutes || 5} min {story.format === 'listen' ? 'listen' : 'read'}</span>
            </div>
            <div className="flex items-center gap-1 text-[#d4b04c] font-bold group-hover:translate-x-1 transition-transform">
              READ STORY <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedStory;