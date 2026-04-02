import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader2, Music } from 'lucide-react';
import { motion } from 'framer-motion';

const PodcastEpisodePlayer = ({ episode, onClose }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    const handleError = () => {
        setIsLoading(false);
        setError(true);
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Auto-play on mount
    audio.play().then(() => setIsPlaying(true)).catch(e => console.log("Auto-play prevented", e));

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [episode]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
    } else {
      audioRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-[#151a21] border-t border-[#D4AF37]/30 p-4 shadow-2xl z-50 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-4 md:gap-8">
        {/* Cover & Info */}
        <div className="flex items-center gap-4 flex-1 md:flex-none w-full md:w-auto">
           <div className="w-12 h-12 md:w-16 md:h-16 rounded bg-gray-800 shrink-0 overflow-hidden">
             {episode.cover_image_url ? (
               <img src={episode.cover_image_url} alt={episode.title} className="w-full h-full object-cover" />
             ) : (
               <div className="flex items-center justify-center h-full w-full"><Music className="text-gray-500" /></div>
             )}
           </div>
           <div className="min-w-0">
             <h4 className="text-white font-bold text-sm md:text-base truncate">{episode.title}</h4>
             <p className="text-gray-400 text-xs truncate">Ep. {episode.episode_number} {episode.guest_name && `• ${episode.guest_name}`}</p>
           </div>
        </div>

        {/* Player Controls (Center) */}
        <div className="flex-1 flex flex-col items-center max-w-2xl">
           <div className="flex items-center gap-6 mb-2">
             <button onClick={togglePlay} disabled={isLoading || error} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#D4AF37] text-[#0F1419] flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50">
               {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                 isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />
               )}
             </button>
           </div>
           
           <div className="w-full flex items-center gap-3 text-xs text-gray-400 font-mono">
              <span>{formatTime(progress)}</span>
              <input 
                type="range" 
                min="0" 
                max={duration || 0} 
                value={progress} 
                onChange={handleProgressChange}
                disabled={isLoading || error}
                className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D4AF37]"
              />
              <span>{formatTime(duration)}</span>
           </div>
           {error && <span className="text-xs text-red-400 mt-1">Error loading audio</span>}
        </div>

        {/* Volume & Close (Right) */}
        <div className="hidden md:flex items-center gap-4">
           <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-gray-400 hover:text-white">
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                value={isMuted ? 0 : volume} 
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-400"
              />
           </div>
           {onClose && (
               <button onClick={onClose} className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wider border border-white/20 px-3 py-1 rounded">
                   Close
               </button>
           )}
        </div>
      </div>
      <audio ref={audioRef} src={episode.audio_url} preload="metadata" />
    </motion.div>
  );
};

export default PodcastEpisodePlayer;