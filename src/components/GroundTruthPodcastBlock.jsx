import React from 'react';
import { Link } from 'react-router-dom';
import { Mic2, Play, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GroundTruthPodcastBlock = () => {
  return (
    <div className="h-full bg-[#0f1620] border border-white/5 rounded-xl overflow-hidden flex flex-col relative group shadow-lg hover:shadow-[#d4b04c]/10 hover:border-[#d4b04c]/30 transition-all duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4b04c]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
      
      <div className="p-8 flex-grow flex flex-col justify-center relative z-10">
        <div className="flex items-center gap-3 mb-6 text-[#d4b04c]">
          <div className="p-3 bg-[#d4b04c]/10 rounded-lg">
            <Mic2 className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase">AIP Originals</span>
        </div>

        <h3 className="text-3xl font-bold text-white mb-4 font-serif">
          Ground Truth Podcast
        </h3>
        
        <p className="text-xl text-gray-300 mb-6 font-light">
          Unscripted conversations with Africa's builders.
        </p>

        <p className="text-sm text-gray-500 mb-8 border-l-2 border-[#d4b04c]/30 pl-4 italic">
          "New episodes every month — execution, procurement, and financing realities."
        </p>

        <div className="mt-auto">
          <Link to="/insights/podcast">
            <Button className="w-full bg-[#d4b04c] text-[#0b0f14] hover:bg-white hover:text-[#0b0f14] font-bold py-6 text-base group-hover:scale-[1.02] transition-transform">
              <Play className="w-5 h-5 mr-2 fill-current" /> LISTEN NOW
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Visual footer strip */}
      <div className="h-2 bg-gradient-to-r from-[#d4b04c] to-[#0f1620]" />
    </div>
  );
};

export default GroundTruthPodcastBlock;