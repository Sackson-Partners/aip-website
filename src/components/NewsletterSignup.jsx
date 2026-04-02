import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNewsletterSignup } from '@/hooks/useNewsletterSignup';
import { Loader2 } from 'lucide-react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const { loading, submitNewsletterSignup } = useNewsletterSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitNewsletterSignup(email);
    if (result.success) {
      setEmail('');
    }
  };

  return (
    <section 
      id="newsletter" 
      className="w-full bg-[#0F1419] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
          Monthly, no noise—<br />
          just investable signal
        </h2>
        
        <p className="text-gray-400 text-lg md:text-xl font-sans mb-10 max-w-2xl mx-auto">
          Join 1500+ investors and partners receiving our monthly synthesis of African infrastructure opportunities.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6">
          <input
            type="email"
            placeholder="email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white border border-gray-200 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A23A] focus:border-transparent placeholder:text-gray-500"
            required
            disabled={loading}
          />
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#C9A23A] hover:bg-[#b08d32] text-[#0F1419] font-bold px-8 py-3 rounded-full transition-colors whitespace-nowrap"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe"}
          </Button>
        </form>

        <p className="text-[#6B7280] text-sm font-medium">
          Trusted by professionals across the world
        </p>
      </div>
    </section>
  );
};

export default NewsletterSignup;