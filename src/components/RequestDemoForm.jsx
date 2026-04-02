import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { sendConfirmationEmail } from '@/lib/emailService';
import { Loader2, Send, User, Mail, MessageSquare, PenLine } from 'lucide-react';

const RequestDemoForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Demo Request',
          message: formData.message,
          status: 'new'
        }]);

      if (dbError) throw dbError;

      await sendConfirmationEmail({
        email: formData.email,
        name: formData.name,
        formType: 'demo'
      });

      toast({
        title: "Request Sent",
        description: "Thanks for your interest! We'll schedule your demo shortly.",
        className: "bg-[#0F1419] border-[#D4AF37] text-white"
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      console.error('Error submitting demo request:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#151a21] border border-white/10 rounded-2xl p-8 shadow-xl h-full">
      <div className="mb-8 text-center md:text-left">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4AF37]/10 mb-4 md:hidden">
            <Send className="w-6 h-6 text-[#D4AF37]" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-white mb-2">Request a Demo</h3>
        <p className="text-gray-400">See how AIP can transform your infrastructure investment process.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
              <User className="w-4 h-4 text-[#D4AF37]" /> Full Name
          </label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600"
            placeholder="John Doe"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37]" /> Email Address
            </label>
            <input 
            type="email" 
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600"
            placeholder="john@company.com"
            disabled={isSubmitting}
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <PenLine className="w-4 h-4 text-[#D4AF37]" /> Subject
            </label>
            <input 
            type="text" 
            required
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600"
            placeholder="Platform Demo Request"
            disabled={isSubmitting}
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#D4AF37]" /> Message (Optional)
            </label>
            <textarea 
            rows="3"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600 resize-none"
            placeholder="Tell us about your needs..."
            disabled={isSubmitting}
            />
        </div>

        <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-white text-[#0F1419] hover:bg-gray-200 font-bold py-6 text-lg rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
            {isSubmitting ? (
            <>
                <Loader2 className="w-5 h-5 animate-spin" /> Sending...
            </>
            ) : (
            "Submit Request"
            )}
        </Button>
      </form>
    </div>
  );
};

export default RequestDemoForm;