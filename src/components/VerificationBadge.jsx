import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const VerificationBadge = ({ status = 'Verified', className, showText = true }) => {
  if (status !== 'Verified') return null;

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full",
      className
    )}>
      <div className="bg-accent rounded-full p-0.5">
        <Check className="w-3 h-3 text-primary font-bold" />
      </div>
      {showText && (
        <span className="text-xs font-semibold text-accent uppercase tracking-wider">
          Verified
        </span>
      )}
    </div>
  );
};

export default VerificationBadge;