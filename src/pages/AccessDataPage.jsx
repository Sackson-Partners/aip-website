import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Check, Loader2, Database, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const AccessDataPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    interests: []
  });

  const sectorOptions = [
    "Energy & Power",
    "Transport & Logistics",
    "Water & Sanitation",
    "Agriculture",
    "TMT & Digital",
    "Healthcare",
    "Mining",
    "Real Estate"
  ];

  const handleInterestChange = (interest) => {
    setFormData(prev => {
      const current = prev.interests;
      if (current.includes(interest)) {
        return { ...prev, interests: current.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...current, interest] };
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
          description: "Please select at least one sector of interest.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Data Access Request',
          message: formData.message,
          data_access_interests: formData.interests,
          status: 'new'
        }]);

      if (error) throw error;

      toast({
        title: "Request Submitted",
        description: "We've received your request and will contact you shortly.",
        className: "bg-[#0F1419] border-[#D4AF37] text-white"
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        interests: []
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Access Project Data - AIP</title>
        <meta name="description" content="Request access to detailed African infrastructure project data." />
      </Helmet>

      <div className="min-h-screen bg-[#0F1419] font-sans text-white">
        <Navigation />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-[#D4AF37] mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#151a21] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
              
              <div className="relative z-10 mb-10">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6 border border-[#D4AF37]/20">
                  <Database className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                  Access project data
                </h1>
                <p className="text-xl text-gray-400">
                  Complete the form to get started with AIP's comprehensive project database.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">Work Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-300">Sectors of Interest</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {sectorOptions.map((sector) => (
                      <div
                        key={sector}
                        onClick={() => handleInterestChange(sector)}
                        className={`
                          cursor-pointer flex items-center gap-3 p-3 rounded-lg border transition-all duration-200
                          ${formData.interests.includes(sector)
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white'
                            : 'bg-[#0F1419] border-white/10 text-gray-400 hover:border-gray-600'}
                        `}
                      >
                        <div className={`
                          w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0
                          ${formData.interests.includes(sector) ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-gray-600'}
                        `}>
                          {formData.interests.includes(sector) && <Check className="w-3 h-3 text-[#0F1419]" />}
                        </div>
                        <span className="text-sm">{sector}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600"
                    placeholder="e.g., Specific project inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Message</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600 resize-none"
                    placeholder="Tell us about your data needs..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#D4AF37] text-[#0F1419] hover:bg-white hover:text-[#0F1419] font-bold py-6 text-lg rounded-lg shadow-lg shadow-[#D4AF37]/10 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" /> Processing Request...
                    </>
                  ) : (
                    "Submit Access Request"
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AccessDataPage;