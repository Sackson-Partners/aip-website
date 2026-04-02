import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { sendConfirmationEmail } from '@/lib/emailService';

const ActionModal = ({ isOpen, onClose, title, description, formType = "default", submitLabel = "Submit", defaultSector = "Energy" }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Form states
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    companyName: '',
    details: '',
    dateTime: '',
    sector: defaultSector
  });

  // Reset form when opening/closing or changing defaultSector
  React.useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, sector: defaultSector }));
    }
  }, [isOpen, defaultSector]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Save to Database (leads table)
      const { error: dbError } = await supabase
        .from('leads')
        .insert([{
          name: formData.fullName,
          email: formData.email,
          company: formData.companyName,
          message: formData.details,
          type: formType,
          details: {
             title,
             dateTime: formData.dateTime,
             sector: formData.sector,
             form_context: formType
          }
        }]);

      if (dbError) throw dbError;

      // 2. Send Confirmation Email
      await sendConfirmationEmail({
        email: formData.email,
        name: formData.fullName,
        formType: formType
      });

      toast({
        title: "Request Received",
        description: `Confirmation email sent to ${formData.email}. We will be in touch shortly.`,
        duration: 5000,
        className: "bg-[#0F1419] border-[#D4AF37] text-white"
      });
      
      onClose();
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        companyName: '',
        details: '',
        dateTime: '',
        sector: 'Energy'
      });

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#151a21] border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0F1419] sticky top-0 z-10">
            <div>
              <h3 className="text-xl font-serif font-bold text-white">{title}</h3>
              {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <input 
                required 
                type="text" 
                className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600"
                placeholder="John Doe" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Work Email</label>
              <input 
                required 
                type="email" 
                className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600"
                placeholder="john@company.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Organization / Company</label>
              <input 
                required 
                type="text" 
                className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600"
                placeholder="Company Name" 
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                disabled={isSubmitting}
              />
            </div>

            {formType === 'call' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Preferred Date & Time</label>
                <input 
                  type="datetime-local" 
                  className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600"
                  value={formData.dateTime}
                  onChange={(e) => setFormData({...formData, dateTime: e.target.value})}
                  disabled={isSubmitting}
                />
              </div>
            )}

            {(formType === 'project' || formType === 'sector_data_request') && (
              <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-300">Sector Interest</label>
                 <select 
                    className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
                    value={formData.sector}
                    onChange={(e) => setFormData({...formData, sector: e.target.value})}
                    disabled={isSubmitting}
                 >
                   <option>Energy</option>
                   <option>Transport, Logistics & Real Assets</option>
                   <option>Water & Sanitation</option>
                   <option>TMT (Digital & Connectivity)</option>
                   <option>Agriculture & Food Systems</option>
                   <option>Healthcare</option>
                 </select>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Message / Details</label>
              <textarea 
                rows="3"
                className="w-full bg-[#0F1419] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-600 resize-none"
                placeholder="How can we help you?" 
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
                disabled={isSubmitting}
              />
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#D4AF37] text-[#0F1419] hover:bg-white hover:text-[#0F1419] font-bold py-3 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                   <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                ) : (
                   submitLabel
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ActionModal;