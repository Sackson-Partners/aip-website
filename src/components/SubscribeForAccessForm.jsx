import React, { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const SubscribeForAccessForm = ({ onSuccess }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('subscriptions')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          organization: formData.organization
        }]);

      if (error) throw error;

      setStatus('success');
      toast({
        title: "Subscribed Successfully",
        description: "You have been added to our access list.",
      });

      setFormData({ fullName: '', email: '', organization: '' });
      
      if (onSuccess) {
        setTimeout(onSuccess, 1500); // Delay close slightly to show success state in form
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8 animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-[#d4b04c]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-[#d4b04c]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2 font-serif">Thank You!</h3>
        <p className="text-gray-400 mb-6">
          You've successfully subscribed. You'll receive access details via email soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
          Full Name <span className="text-[#d4b04c]">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          required
          value={formData.fullName}
          onChange={handleChange}
          className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4b04c] focus:ring-1 focus:ring-[#d4b04c] transition-all"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
          Email Address <span className="text-[#d4b04c]">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4b04c] focus:ring-1 focus:ring-[#d4b04c] transition-all"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
          Organization
        </label>
        <input
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4b04c] focus:ring-1 focus:ring-[#d4b04c] transition-all"
          placeholder="Company Name"
        />
      </div>

      <Button 
        type="submit" 
        disabled={loading}
        className="w-full bg-[#d4b04c] text-[#0b0f14] hover:bg-white hover:text-[#0b0f14] font-bold py-6 text-lg rounded-lg shadow-lg shadow-[#d4b04c]/10 mt-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          "Subscribe Now"
        )}
      </Button>
    </form>
  );
};

export default SubscribeForAccessForm;