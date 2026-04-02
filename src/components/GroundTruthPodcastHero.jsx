import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GroundTruthPodcastHero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ground-truth-podcast');
  };

  return (
    <div 
      onClick={handleClick}
      className="w-full bg-[#000000] border border-white/10 rounded-xl overflow-hidden cursor-pointer group hover:shadow-lg hover:border-[#C9A23A]/30 transition-all duration-300 my-8"
    >
      <div className="px-6 py-8 md:px-10 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
        
        {/* Left Side: Icon & Text */}
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 flex-1">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-[#C9A23A]/10 flex items-center justify-center text-[#C9A23A] group-hover:bg-[#C9A23A] group-hover:text-black transition-colors duration-300">
              <Mic2 className="w-8 h-8" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
              Ground Truth Podcast
            </h3>
            <p className="text-gray-400 font-sans text-base md:text-lg max-w-md">
              Unscripted conversations with Africa's leaders on the real process of infrastructure delivery.
            </p>
          </div>
        </div>

        {/* Right Side: CTA Button */}
        <div className="flex-shrink-0">
          <Button 
            variant="outline" 
            className="border-[#C9A23A] text-[#C9A23A] bg-transparent hover:bg-[#C9A23A] hover:text-black font-bold uppercase tracking-wider px-6 py-6 rounded-lg transition-all"
          >
            <Play className="w-4 h-4 mr-2 fill-current" />
            Listen to Latest Episode
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroundTruthPodcastHero;