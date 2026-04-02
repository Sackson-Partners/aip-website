import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, ArrowLeft, Send, Building2, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const RequestDemoPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('demo_requests')
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          message: formData.message
        }]);

      if (error) throw error;

      toast({
        title: "Demo Request Received",
        description: "Thank you! Our team will contact you shortly to schedule your demo.",
        className: "bg-[#151a21] border-[#D4AF37] text-white"
      });
      
      // Reset form
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
      
      // Optional: Navigate back after delay
      setTimeout(() => navigate('/'), 2000);

    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Request a Demo | AIP</title>
      </Helmet>
      
      <Navigation />

      <div className="min-h-screen bg-[#0F1419] font-sans pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32"
          >
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-[#D4AF37] transition-colors mb-8">
               <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Experience the Future of <br />
              <span className="text-[#D4AF37]">Infrastructure Finance</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              See firsthand how AIP helps you discover, verify, and finance commercially viable projects across Africa.
            </p>

            <div className="space-y-6">
              {[
                { title: "Project Discovery", desc: "Access curated pipelines of verified opportunities." },
                { title: "Due Diligence Tools", desc: "AI-powered risk assessment and document analysis." },
                { title: "Direct Connection", desc: "Connect directly with project sponsors and government units." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-[#151a21] border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                    <Send className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#151a21] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Schedule Your Personalized Demo</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#D4AF37]" /> Name
                  </label>
                  <input
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#D4AF37]" /> Company
                  </label>
                  <input
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Inc."
                    className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#D4AF37]" /> Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#D4AF37]" /> Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#D4AF37]" /> Specific Interests (Optional)
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you are looking for..."
                  className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600 resize-none"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#D4AF37] text-[#0F1419] hover:bg-white hover:text-[#0F1419] font-bold py-6 text-lg rounded-lg shadow-lg shadow-[#D4AF37]/10 transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...
                  </>
                ) : (
                  "Request Demo"
                )}
              </Button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                By submitting this form, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default RequestDemoPage;