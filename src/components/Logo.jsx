import React from 'react';
import { cn } from '@/lib/utils';

const Logo = ({ size = 'md', className, showContainer = true }) => {
  const sizes = {
    sm: 'h-10', 
    md: 'h-12 lg:h-14',
    lg: 'h-16 lg:h-20',
    xl: 'h-24 lg:h-32'
  };

  const containerClasses = showContainer && size !== 'img' 
    ? "bg-white rounded-lg shadow-lg border-2 border-[#D4AF37]/20 p-1.5"
    : "";

  return (
    <div className={cn("relative inline-flex items-center justify-center overflow-hidden", className)}>
      <img
        src="https://horizons-cdn.hostinger.com/02be81db-dbc5-44e9-9552-e26b6e734eb6/35196b81eac6471d02decb8cfdd45ec9.jpg"
        alt="Africa Infrastructure Partners"
        className={cn(
          "w-auto object-contain",
          sizes[size],
          "transition-transform duration-300",
          "py-1.5 px-2"
        )}
      />
    </div>
  );
};

export default Logo;