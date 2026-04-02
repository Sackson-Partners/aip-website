import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { sendConfirmationEmail } from '@/lib/emailService';
import { Loader2, Check } from 'lucide-react';

const AccessProjectsDataForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    interests: []
  });

  const interestsOptions = [
    "Smart search",
    "Verification / Risk Assessments",
    "Investor–project matching",
    "Stakeholder interviews / podcasts",
    "Tender & pipeline alerts",
    "Bankability score",
    "Local insights",
    "Not applicable"
  ];

  const handleInterestChange = (interest) => {
    setFormData(prev => {
      const currentInterests = prev.interests;
      if (currentInterests.includes(interest)) {
        return { ...prev, interests: currentInterests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...currentInterests, interest] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formData.interests.length === 0) {
        toast({
          title: "Selection Required",
          description: "Please select at least one area of interest.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.full_name || 'Anonymous User',
          email: formData.email,
          subject: 'Access Project Data Request',
          message: `Data Access Request. Interests: ${formData.interests.join(', ')}`,
          status: 'new',
          data_access_interests: formData.interests
        }]);

      if (error) throw error;

      await sendConfirmationEmail({
        email: formData.email,
        name: formData.full_name,
        formType: 'data_access'
      });

      toast({
        title: "Request Received",
        description: "We've received your data access request and will be in touch shortly.",
        className: "bg-[#0F1419] border-[#D4AF37] text-white"
      });

      setFormData({ full_name: '', email: '', interests: [] });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#151a21] border border-white/10 rounded-2xl p-8 shadow-xl">
      <div className="mb-8">
        <h3 className="text-2xl font-serif font-bold text-white mb-2">Access project data</h3>
        <p className="text-gray-400">Complete the form to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600"
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              disabled={isSubmitting}
            />
            <input
              type="email"
              placeholder="Work Email"
              required
              className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-sm font-bold text-gray-300 block">I'm interested in:</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {interestsOptions.map((option) => (
                <div 
                  key={option}
                  onClick={() => !isSubmitting && handleInterestChange(option)}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200
                    ${formData.interests.includes(option) 
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white' 
                      : 'bg-[#0F1419] border-white/10 text-gray-400 hover:border-gray-600'}
                  `}
                >
                  <div className={`
                    w-5 h-5 rounded border flex items-center justify-center transition-colors
                    ${formData.interests.includes(option) ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-gray-600'}
                  `}>
                    {formData.interests.includes(option) && <Check className="w-3 h-3 text-[#0F1419]" />}
                  </div>
                  <span className="text-sm">{option}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#D4AF37] text-[#0F1419] hover:bg-white hover:text-[#0F1419] font-bold py-6 text-lg rounded-lg shadow-lg shadow-[#D4AF37]/10 transition-all duration-300 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Processing...
            </>
          ) : (
            "Get Access Now"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AccessProjectsDataForm;