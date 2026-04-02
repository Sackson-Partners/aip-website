import { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

export const useNewsletterSignup = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const submitNewsletterSignup = async (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return { success: false };
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('newsletter_signups')
        .insert([{ email, is_active: true }]);

      if (error) {
        // Handle unique violation gracefully
        if (error.code === '23505') {
            toast({
                title: "Already Subscribed",
                description: "This email is already on our list.",
                className: "bg-[#0F1419] border-[#D4AF37] text-white"
            });
            return { success: true }; 
        }
        throw error;
      }

      toast({
        title: "Subscribed!",
        description: "You've been added to our newsletter.",
        className: "bg-[#0F1419] border-[#D4AF37] text-white"
      });
      return { success: true };
    } catch (error) {
      console.error('Newsletter error:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive"
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    submitNewsletterSignup
  };
};