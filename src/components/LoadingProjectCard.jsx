import React from 'react';

const LoadingProjectCard = () => {
  return (
    <div className="bg-[#151a21] rounded-xl overflow-hidden border border-white/5 shadow-lg h-full flex flex-col">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gray-800 animate-pulse">
        <div className="absolute top-3 right-3 w-20 h-6 bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Content Skeleton */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        {/* Title */}
        <div className="h-7 bg-gray-800 rounded w-3/4 animate-pulse" />
        
        {/* Metadata Row */}
        <div className="flex items-center gap-4">
          <div className="h-4 bg-gray-800 rounded w-20 animate-pulse" />
          <div className="h-4 bg-gray-800 rounded w-24 animate-pulse" />
        </div>

        {/* Description */}
        <div className="space-y-2 pt-2">
          <div className="h-4 bg-gray-800 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-800 rounded w-5/6 animate-pulse" />
        </div>

        {/* Footer */}
        <div className="pt-4 mt-auto border-t border-white/5">
          <div className="h-4 bg-gray-800 rounded w-24 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default LoadingProjectCard;