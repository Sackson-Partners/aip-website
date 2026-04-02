import React, { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const RequestCustomBriefForm = ({ onSuccess }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    topic: '',
    timeline: '1 week'
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('custom_brief_requests')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          organization: formData.organization,
          topic: formData.topic,
          timeline: formData.timeline
        }]);

      if (error) throw error;
      
      setStatus('success');
      toast({
        title: "Request Received",
        description: "We will review your brief requirements shortly.",
      });
      
      setFormData({ fullName: '', email: '', organization: '', topic: '', timeline: '1 week' });

      if (onSuccess) {
        setTimeout(onSuccess, 1500);
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      toast({
        title: "Request Failed",
        description: "Could not submit your request. Please try again.",
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
        <h3 className="text-2xl font-bold text-white mb-2 font-serif">Request Received</h3>
        <p className="text-gray-400 mb-6">
          Your brief request has been received. Our analysts will review your requirements.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Full Name *</label>
          <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b04c] focus:outline-none transition-all" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Email *</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b04c] focus:outline-none transition-all" placeholder="john@company.com" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Organization</label>
        <input type="text" name="organization" value={formData.organization} onChange={handleChange} className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b04c] focus:outline-none transition-all" placeholder="Company Name" />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Brief Topic / Description *</label>
        <textarea name="topic" required rows="4" value={formData.topic} onChange={handleChange} className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b04c] focus:outline-none transition-all resize-none" placeholder="Describe the specific market, sector, or trend you need analyzed..." />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Desired Timeline</label>
        <select name="timeline" value={formData.timeline} onChange={handleChange} className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b04c] focus:outline-none transition-all appearance-none cursor-pointer">
          <option value="1 week">Within 1 week</option>
          <option value="2 weeks">Within 2 weeks</option>
          <option value="1 month">Within 1 month</option>
          <option value="custom">Custom (Specify in description)</option>
        </select>
      </div>

      <Button type="submit" disabled={loading} className="w-full bg-[#d4b04c] text-[#0b0f14] hover:bg-white hover:text-[#0b0f14] font-bold py-6 text-lg rounded-lg shadow-lg shadow-[#d4b04c]/10">
        {loading ? <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Submitting...</> : "Submit Request"}
      </Button>
    </form>
  );
};

export default RequestCustomBriefForm;