import { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const submitContactForm = async ({ name, email, subject, message }) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{ name, email, subject, message }]);

      if (error) throw error;

      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
        className: "bg-[#0F1419] border-[#D4AF37] text-white"
      });
      return { success: true };
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    submitContactForm
  };
};